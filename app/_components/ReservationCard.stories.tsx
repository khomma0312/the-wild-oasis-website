import { Meta, StoryObj } from "@storybook/react";
import ReservationCard, { Booking } from "./ReservationCard";
import { BookingsWithCabin } from "../_lib/data-service";
import { addDays, format, subDays } from "date-fns";

const baseBooking = {
  id: 1,
  cabinId: 1,
  cabinPrice: 100,
  created_at: format(new Date(), "yyyy-MM-dd"),
  extrasPrice: 120,
  guestId: 1,
  hasBreakfast: false,
  isPaid: false,
  numGuests: 1,
  numNights: 3,
  observations: "test",
  totalPrice: 300,
  status: "pending",
  cabins: {
    name: "TEST",
    image:
      "https://images.unsplash.com/photo-1525113990976-399835c43838?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
};

const pastBooking: BookingsWithCabin = {
  ...baseBooking,
  endDate: format(new Date(), "yyyy-MM-dd"),
  startDate: format(subDays(new Date(), 1), "yyyy-MM-dd"),
};

const futureBooking: BookingsWithCabin = {
  ...baseBooking,
  endDate: format(addDays(new Date(), 2), "yyyy-MM-dd"),
  startDate: format(addDays(new Date(), 1), "yyyy-MM-dd"),
};

const meta: Meta<typeof ReservationCard> = {
  component: ReservationCard,
  title: "Components/ReservationCard",
  args: {},
};
export default meta;

type Story = StoryObj<typeof meta>;

export const PastBooking: Story = {
  args: {
    booking: pastBooking,
  },
};

export const FutureBooking: Story = {
  args: {
    booking: futureBooking,
  },
};
