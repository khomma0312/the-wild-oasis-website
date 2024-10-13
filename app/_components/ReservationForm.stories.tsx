import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { addDays, format } from "date-fns";
import { User } from "next-auth";
import ReservationForm from "./ReservationForm";
import { Cabin } from "../_types/models";
import { ReservationProvider } from "./ReservationContext";
import { createBooking } from "@/app/_lib/actions.mock";

const cabin: Cabin = {
  created_at: format(new Date(), "yyyy-MM-dd"),
  description: "test",
  discount: 50,
  id: 1,
  image:
    "https://images.unsplash.com/photo-1525113990976-399835c43838?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  maxCapacity: 2,
  name: "TEST",
  regularPrice: 100,
};

const user: User = {
  id: "test_1",
  // guestId: 'test_guest_1'
};

const meta: Meta<typeof ReservationForm> = {
  component: ReservationForm,
  title: "Components/ReservationForm",
  decorators: [
    (Story) => (
      <ReservationProvider
        initialState={{
          from: addDays(new Date(), 1),
          to: addDays(new Date(), 2),
        }}
      >
        <Story />
      </ReservationProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof meta>;

// Function to emulate pausing between interactions
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const Default: Story = {
  args: {
    cabin,
    user,
  },
  beforeEach: async () => {
    createBooking.mockImplementation(async () => {
      await sleep(0);
      return Promise.resolve();
    });
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.getByRole("button");
    // 必須項目を入力
    const numGuestsSelect = canvas.getByLabelText("How many guests?");
    await userEvent.selectOptions(numGuestsSelect, "1");

    // 送信していない時のボタンの文言をテスト
    expect(submitButton).toHaveTextContent("Reserve now");

    // submitボタンをクリックしてformを送信する
    await userEvent.click(submitButton);

    // 送信中の送信ボタンの文言をテスト
    expect(submitButton).toHaveTextContent("Reserving...");
  },
};
