import { Meta, StoryObj } from "@storybook/react";
import Circle from "./Circle";

const meta: Meta<typeof Circle> = {
  component: Circle,
  title: "Example/Circle",
  argTypes: {
    variant: {
      control: { type: "select" },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Docsにコメントを追加できる
 * オレンジ色の円
 */
export const BaseCircle: Story = {
  args: {
    variant: "orange",
  },
};
export const GreenCircle: Story = {
  args: {
    variant: "green",
  },
};
export const YellowCircle: Story = {
  args: {
    variant: "yellow",
  },
};

export const GroupedCircle: Story = {
  render: () => (
    <div style={{ display: "flex" }}>
      <Circle variant="orange" />
      <Circle variant="green" />
      <Circle variant="yellow" />
    </div>
  ),
};
