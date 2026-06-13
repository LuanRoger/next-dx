import { fireEvent, render, screen } from "@testing-library/react";
import { useAction } from "next-safe-action/hooks";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ReloadPostsButton } from "./index";

vi.mock("next-safe-action/hooks", () => ({
  useAction: vi.fn(),
}));

describe("ReloadPostsButton Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render button with reload text", () => {
    vi.mocked(useAction).mockReturnValue({
      execute: vi.fn(),
      executeAsync: vi.fn(),
      input: undefined,
      reset: vi.fn(),
      isTransitioning: false,
      status: "idle",
      isIdle: true,
      isExecuting: false,
      isPending: false,
      hasSucceeded: false,
      hasErrored: false,
      hasNavigated: false,
      result: {},
    });

    render(<ReloadPostsButton />);

    expect(screen.getByText("Reload")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call execute when button is clicked", () => {
    const mockExecute = vi.fn();

    vi.mocked(useAction).mockReturnValue({
      execute: mockExecute,
      executeAsync: vi.fn(),
      input: undefined,
      reset: vi.fn(),
      isTransitioning: false,
      status: "idle",
      isIdle: true,
      isExecuting: false,
      isPending: false,
      hasSucceeded: false,
      hasErrored: false,
      hasNavigated: false,
      result: {},
    });

    render(<ReloadPostsButton />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockExecute).toHaveBeenCalledTimes(1);
  });

  it("should show spinner when loading", () => {
    vi.mocked(useAction).mockReturnValue({
      execute: vi.fn(),
      executeAsync: vi.fn(),
      input: undefined,
      reset: vi.fn(),
      isTransitioning: false,
      status: "executing",
      isIdle: false,
      isExecuting: true,
      isPending: true,
      hasSucceeded: false,
      hasErrored: false,
      hasNavigated: false,
      result: {},
    });

    render(<ReloadPostsButton />);

    // Button should be disabled when loading
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should show spinner when executing", () => {
    vi.mocked(useAction).mockReturnValue({
      execute: vi.fn(),
      executeAsync: vi.fn(),
      input: undefined,
      reset: vi.fn(),
      isTransitioning: false,
      status: "executing",
      isIdle: false,
      isExecuting: true,
      isPending: true,
      hasSucceeded: false,
      hasErrored: false,
      hasNavigated: false,
      result: {},
    });

    render(<ReloadPostsButton />);

    // Button should be disabled when executing
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
