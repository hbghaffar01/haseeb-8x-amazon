import { Rating } from "./Rating.jsx";

export default {
  title: "UI/Rating",
  component: Rating,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 5, step: 0.1 } },
  },
};

export const Default = { args: { value: 4.5, reviews: 1203 } };
export const WithValue = { args: { value: 4.7, reviews: 98211, showValue: true } };
export const Empty = { args: { value: 0 } };
