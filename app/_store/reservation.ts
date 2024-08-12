import { atom, useAtom, useAtomValue } from "jotai";
import { DateRange } from "react-day-picker";

export const initialRange = { from: undefined, to: undefined } as DateRange;
const dateRange = atom<DateRange>(initialRange);

export const useReservationRange = () => useAtom(dateRange);
export const useReservationRangeValue = () => useAtomValue(dateRange);
