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
      hasErrored: false,
      hasNavigated: false,
      hasSucceeded: false,
      input: undefined,
      isExecuting: false,
      isIdle: true,
      isPending: false,
      isTransitioning: false,
      reset: vi.fn(),
      result: {},
      status: "idle",
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
      hasErrored: false,
      hasNavigated: false,
      hasSucceeded: false,
      input: undefined,
      isExecuting: false,
      isIdle: true,
      isPending: false,
      isTransitioning: false,
      reset: vi.fn(),
      result: {},
      status: "idle",
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
      hasErrored: false,
      hasNavigated: false,
      hasSucceeded: false,
      input: undefined,
      isExecuting: true,
      isIdle: false,
      isPending: true,
      isTransitioning: false,
      reset: vi.fn(),
      result: {},
      status: "executing",
    });

    render(<ReloadPostsButton />);

    // Button should be disabled when loading
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should show spinner when executing", () => {
    vi.mocked(useAction).mockReturnValue({
      execute: vi.fn(),
      executeAsync: vi.fn(),
      hasErrored: false,
      hasNavigated: false,
      hasSucceeded: false,
      input: undefined,
      isExecuting: true,
      isIdle: false,
      isPending: true,
      isTransitioning: false,
      reset: vi.fn(),
      result: {},
      status: "executing",
    });

    render(<ReloadPostsButton />);

    // Button should be disabled when executing
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
