import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button.jsx";

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Add to Cart</Button>);
    expect(screen.getByRole("button", { name: "Add to Cart" })).toBeInTheDocument();
  });

  it("fires onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Buy</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Nope
      </Button>
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies the variant class", () => {
    render(<Button variant="secondary">X</Button>);
    expect(screen.getByRole("button")).toHaveClass("ui-btn--secondary");
  });
});
