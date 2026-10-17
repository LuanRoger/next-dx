import { fireEvent, render, screen } from "@testing-library/react";
import { useAction } from "next-safe-action/hooks";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ReloadPostsButton } from "./index";

vi.mock("next-safe-action/hooks", () => ({
  useAction: vi.fn(),
}));

function mockAction(isPending = false, isExecuting = false) {
  const common = {
    execute: vi.fn(),
    executeAsync: vi.fn(),
    hasErrored: false as const,
    hasNavigated: false as const,
    hasSucceeded: false as const,
    input: undefined,
    isTransitioning: false,
    reset: vi.fn(),
    result: { data: undefined, serverError: undefined, validationErrors: {} },
  };
  const action = isExecuting
    ? {
        ...common,
        isExecuting: true as const,
        isIdle: false as const,
        isPending: true as const,
        status: "executing" as const,
      }
    : {
        ...common,
        isExecuting: false as const,
        isIdle: true as const,
        isPending,
        status: "idle" as const,
      };
  vi.mocked(useAction).mockReturnValue(action);
  return action;
}

function getIconSlot() {
  const slot = screen.getByRole("button").querySelector("[data-crossfade]");
  if (!slot) {
    throw new Error("Reload button icon slot was not rendered");
  }
  return slot;
}

function getIconLayers() {
  return getIconSlot().querySelectorAll("[data-visible]");
}

describe("ReloadPostsButton Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAction();
  });

  it("should render button with reload text without an initial crossfade", () => {
    render(<ReloadPostsButton />);

    expect(screen.getByText("Reload")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reload" })).toBeEnabled();
    expect(getIconSlot()).toHaveAttribute("data-crossfade", "false");
    expect(getIconSlot()).toHaveAttribute("data-loading", "false");
    expect(getIconLayers()[0]).toHaveAttribute("data-visible", "true");
    expect(getIconLayers()[1]).toHaveAttribute("data-visible", "false");
  });

  it.each([undefined, 7])("should execute once with userId %s", (userId) => {
    const { execute } = mockAction();
    render(<ReloadPostsButton userId={userId} />);

    fireEvent.click(screen.getByRole("button"));

    expect(execute).toHaveBeenCalledExactlyOnceWith({ userId });
  });

  it.each([
    { isExecuting: false, isPending: true },

    { isExecuting: true, isPending: true },
  ])(
    "should show loading for $isPending pending and $isExecuting executing",
    ({ isPending, isExecuting }) => {
      mockAction(isPending, isExecuting);
      render(<ReloadPostsButton />);

      expect(screen.getByRole("button", { name: "Reload" })).toBeDisabled();
      expect(getIconSlot()).toHaveAttribute("data-loading", "true");
      expect(getIconSlot()).toHaveAttribute("data-crossfade", "false");
      expect(getIconLayers()[0]).toHaveAttribute("data-visible", "false");
      expect(getIconLayers()[1]).toHaveAttribute("data-visible", "true");
      expect(screen.getAllByRole("status")).toHaveLength(1);
      expect(screen.getByRole("status")).toHaveTextContent("Loading posts");
    }
  );

  it.each([
    { crossfade: "true", detail: 1 },
    { crossfade: "false", detail: 0 },
  ])(
    "should preserve crossfade=$crossfade through a detail=$detail request",
    ({ detail, crossfade }) => {
      const { execute } = mockAction();
      const { rerender } = render(<ReloadPostsButton />);
      const slot = getIconSlot();
      const [refresh, spinner] = getIconLayers();
      const status = screen.getByRole("status");

      expect(slot).toHaveAttribute("aria-hidden", "true");
      expect(status).toBeEmptyDOMElement();
      fireEvent.click(screen.getByRole("button"), { detail });
      expect(execute).toHaveBeenCalledExactlyOnceWith({ userId: undefined });

      mockAction(true, false);
      rerender(<ReloadPostsButton />);
      expect(getIconSlot()).toBe(slot);
      expect(slot).toHaveAttribute("data-crossfade", crossfade);
      expect(slot).toHaveAttribute("data-loading", "true");
      expect(getIconLayers()[0]).toBe(refresh);
      expect(getIconLayers()[1]).toBe(spinner);
      expect(refresh).toHaveAttribute("data-visible", "false");
      expect(spinner).toHaveAttribute("data-visible", "true");
      expect(screen.getByRole("button", { name: "Reload" })).toBeDisabled();
      expect(screen.getAllByRole("status")).toHaveLength(1);
      expect(screen.getByRole("status")).toBe(status);
      expect(status).toHaveTextContent("Loading posts");

      mockAction();
      rerender(<ReloadPostsButton />);
      expect(getIconSlot()).toBe(slot);
      expect(slot).toHaveAttribute("data-crossfade", crossfade);
      expect(slot).toHaveAttribute("data-loading", "false");
      expect(getIconLayers()[0]).toBe(refresh);
      expect(getIconLayers()[1]).toBe(spinner);
      expect(refresh).toHaveAttribute("data-visible", "true");
      expect(spinner).toHaveAttribute("data-visible", "false");
      expect(screen.getByRole("button", { name: "Reload" })).toBeEnabled();
      expect(screen.getByRole("status")).toBe(status);
      expect(status).toBeEmptyDOMElement();
    }
  );

  it("should update the crossfade policy on each activation", () => {
    const { execute } = mockAction();
    const { rerender } = render(<ReloadPostsButton />);

    for (const detail of [1, 0, 1]) {
      fireEvent.click(screen.getByRole("button"), { detail });
      mockAction(true, false);
      rerender(<ReloadPostsButton />);
      expect(getIconSlot()).toHaveAttribute(
        "data-crossfade",
        String(detail > 0)
      );

      vi.mocked(useAction).mockReturnValue({ ...mockAction(), execute });
      rerender(<ReloadPostsButton />);
      expect(getIconSlot()).toHaveAttribute(
        "data-crossfade",
        String(detail > 0)
      );
    }

    expect(execute).toHaveBeenCalledTimes(3);
  });

  it("should not execute again while loading", () => {
    const { execute } = mockAction(true, false);
    render(<ReloadPostsButton />);

    fireEvent.click(screen.getByRole("button"), { detail: 1 });

    expect(execute).not.toHaveBeenCalled();
    expect(getIconSlot()).toHaveAttribute("data-crossfade", "false");
  });
});
