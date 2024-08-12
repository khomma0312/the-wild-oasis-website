import { Database } from "./supabase_schema";

export type Cabin = Database["public"]["Tables"]["cabins"]["Row"];
export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export type Guest = Database["public"]["Tables"]["guests"]["Row"];
export type Settings = Database["public"]["Tables"]["settings"]["Row"];

export type GuestInsert = Database["public"]["Tables"]["guests"]["Insert"];
