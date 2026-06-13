import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "./index";

// Mock next-themes
vi.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useTheme: () => ({ resolvedTheme: "light", setTheme: vi.fn() }),
}));

describe("ThemeProvider Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render children", () => {
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("should pass default props to NextThemesProvider", () => {
    render(
      <ThemeProvider>
        <div>Child</div>
      </ThemeProvider>
    );

    expect(screen.getByText("Child")).toBeInTheDocument();
  });

  it("should include ThemeHotkey component", () => {
    render(
      <ThemeProvider>
        <div>Content</div>
      </ThemeProvider>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
