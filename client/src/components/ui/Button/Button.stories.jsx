import { Button } from "./Button.jsx";

export default {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "link"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export const Primary = {
  args: { children: "Add to Cart", variant: "primary" },
};

export const Secondary = {
  args: { children: "Buy Now", variant: "secondary" },
};

export const Link = {
  args: { children: "See all details", variant: "link" },
};

export const FullWidth = {
  args: { children: "Proceed to checkout", variant: "primary", fullWidth: true },
};

export const Disabled = {
  args: { children: "Out of stock", variant: "primary", disabled: true },
};
