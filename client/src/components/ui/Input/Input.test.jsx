import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Input } from "./Input.jsx";
import { INPUT_KINDS, quantitySchema } from "../../../validation/schemas.js";

function Controlled(props) {
  const [v, setV] = useState("");
  return <Input value={v} onChange={(e) => setV(e.target.value)} {...props} />;
}

describe("Input (secure)", () => {
  it("strips disallowed characters for text kind", async () => {
    render(<Controlled label="Name" kind={INPUT_KINDS.TEXT} />);
    const input = screen.getByLabelText("Name");
    await userEvent.type(input, "ab<script>cd");
    // angle brackets and the word stay stripped of symbols
    expect(input.value).toBe("abscriptcd");
  });

  it("keeps only digits for number kind", async () => {
    render(<Controlled label="Qty" kind={INPUT_KINDS.NUMBER} />);
    const input = screen.getByLabelText("Qty");
    await userEvent.type(input, "12ab3");
    expect(input.value).toBe("123");
  });

  it("shows a Zod validation error when the schema fails", async () => {
    render(
      <Controlled label="Qty" kind={INPUT_KINDS.NUMBER} schema={quantitySchema} />
    );
    const input = screen.getByLabelText("Qty");
    await userEvent.type(input, "99");
    expect(screen.getByText(/Maximum quantity is 10/i)).toBeInTheDocument();
  });
});
