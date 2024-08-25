"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings, updateBooking as updateBookingApi } from "./data-service";
import { redirect } from "next/navigation";
import { BookingInsert } from "../_types/models";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData: FormData) {
  // 1. Check if the user is authenticated
  const session = await auth();

  // 2. If the user is not authenticated, throw an error
  // 一番近くのError Boundaryでエラーがキャッチされるので、ここでハンドリングする必要はない(Next.jsで一般的)
  if (!session?.user) {
    throw new Error("You must be logged in to update your profile");
  }

  const nationalID = formData.get("nationalID") as string;
  const nationalityAndFlag = formData.get("nationality") as string;
  const [nationality, countryFlag] = nationalityAndFlag.split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please provide a valid national ID");
  }

  // 3. Update the guest
  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    throw new Error("Guest could not be updated");
  }

  // 4. Revalidate the cache
  revalidatePath("/account/profile");
}

export async function createBooking(
  bookingData: BookingInsert,
  formData: FormData
) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("You must be logged in to update your profile");
  }

  const newBooking: BookingInsert = {
    ...bookingData,
    guestId: Number(session.user.guestId),
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations") as string,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId: number) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("You must be logged in to update your profile");
  }

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are not authorized to delete this booking");
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData: FormData) {
  // 自分の予約以外は更新できないようにする(authentication and authorization)
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to update your profile");
  }

  const bookings = await getBookings(session.user.guestId);
  const bookingIds = bookings.map((booking) => booking.id);

  const id = Number(formData.get("id"));
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations") as string;

  if (!bookingIds.includes(id)) {
    throw new Error("You are not authorized to update this booking");
  }

  const { error } = await updateBookingApi(id, { numGuests, observations });

  if (error) {
    throw new Error("Booking could not be updated");
  }

  // キャッシュ再検証
  revalidatePath(`/account/reservations/edit/${id}`);
  revalidatePath("/account/reservations");
  // 更新後、/account/reservationsにリダイレクトする
  redirect("/account/reservations");
}
