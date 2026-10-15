import { Badge } from "./Badge.jsx";

export default {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["prime", "deal", "neutral", "danger"],
    },
  },
};

export const Prime = { args: { children: "Prime", tone: "prime" } };
export const Deal = { args: { children: "Deal", tone: "deal" } };
export const Neutral = { args: { children: "Bestseller", tone: "neutral" } };
export const OutOfStock = { args: { children: "Out of stock", tone: "danger" } };
