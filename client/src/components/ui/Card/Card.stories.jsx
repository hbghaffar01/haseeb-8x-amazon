import { Card } from "./Card.jsx";

export default {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
};

export const Default = {
  args: {
    children: "A simple card surface with padding.",
  },
};

export const Hoverable = {
  args: {
    hoverable: true,
    children: "Hover me — I lift on hover.",
  },
};
