"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { Cabin, Settings } from "../_types/models";
import { initialRange, useReservationRange } from "../_store/reservation";
import { useReservation } from "./ReservationContext";

const today = new Date();
const endMonth = new Date(today.getFullYear() + 5, today.getMonth());

function isAlreadyBooked(
  range: { from: Date | string; to: Date | string },
  datesArr: Date[]
) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({
  settings,
  bookedDates,
  cabin,
}: {
  settings: Settings;
  bookedDates: Date[];
  cabin: Cabin;
}) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(
    { from: range?.from || "", to: range?.to || "" },
    bookedDates
  )
    ? initialRange
    : range;

  const { regularPrice, discount } = cabin;
  const discountNum = Number(discount);
  const numNights = differenceInDays(
    displayRange?.to || "",
    displayRange?.from || ""
  );
  const cabinPrice = numNights * (regularPrice - discountNum);
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        selected={displayRange}
        onSelect={(range) => {
          range && setRange(range);
        }}
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={today}
        hidden={{ before: today }}
        endMonth={endMonth}
        captionLayout="dropdown-years"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((bookedDate) => isSameDay(curDate, bookedDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discountNum > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discountNum}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {displayRange?.from || displayRange?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
