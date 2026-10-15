import { useState } from "react";
import { Input } from "./Input.jsx";
import { INPUT_KINDS, searchSchema, quantitySchema } from "../../../validation/schemas.js";

export default {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    kind: { control: "select", options: ["text", "number"] },
  },
};

export const Text = {
  render: () => {
    const [v, setV] = useState("");
    return (
      <Input
        label="Text only (letters, numbers, spaces)"
        placeholder="Try typing <script> — symbols are blocked"
        kind={INPUT_KINDS.TEXT}
        value={v}
        onChange={(e) => setV(e.target.value)}
      />
    );
  },
};

export const NumberOnly = {
  render: () => {
    const [v, setV] = useState("");
    return (
      <Input
        label="Number only"
        placeholder="Digits only"
        kind={INPUT_KINDS.NUMBER}
        value={v}
        onChange={(e) => setV(e.target.value)}
      />
    );
  },
};

export const WithZodSearchSchema = {
  render: () => {
    const [v, setV] = useState("");
    return (
      <Input
        label="Search (Zod validated)"
        placeholder="Search products"
        kind={INPUT_KINDS.TEXT}
        schema={searchSchema}
        value={v}
        onChange={(e) => setV(e.target.value)}
      />
    );
  },
};

export const WithZodQuantitySchema = {
  render: () => {
    const [v, setV] = useState("1");
    return (
      <Input
        label="Quantity (Zod 1–10)"
        kind={INPUT_KINDS.NUMBER}
        schema={quantitySchema}
        value={v}
        onChange={(e) => setV(e.target.value)}
      />
    );
  },
};

export const WithExternalError = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    error: "Please enter a valid value",
  },
};
