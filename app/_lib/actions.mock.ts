import { fn } from "@storybook/test";
import * as actual from "./actions";

export * from "./actions";
export const createBooking = fn(actual.createBooking).mockName("createBooking");
