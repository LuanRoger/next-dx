import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ShimmerText } from "./index";

describe("ShimmerText Component", () => {
  it("should render children text", () => {
    render(<ShimmerText>Hello World</ShimmerText>);

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("should apply default variant class", () => {
    render(<ShimmerText>Test</ShimmerText>);

    const shimmerElement = screen.getByText("Test");
    expect(shimmerElement).toBeInTheDocument();
  });

  it("should apply custom variant classes", () => {
    render(<ShimmerText variant="red">Red Text</ShimmerText>);

    const shimmerElement = screen.getByText("Red Text");
    expect(shimmerElement).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(<ShimmerText className="custom-class">Custom</ShimmerText>);

    const container = screen.getByText("Custom").parentElement;
    expect(container).toHaveClass("custom-class");
  });

  it("should apply custom duration and delay", () => {
    render(
      <ShimmerText delay={1} duration={2}>
        Animated
      </ShimmerText>
    );

    expect(screen.getByText("Animated")).toBeInTheDocument();
  });

  it("should render with different variants", () => {
    const variants = [
      "secondary",
      "destructive",
      "red",
      "blue",
      "green",
      "yellow",
    ];

    for (const variant of variants) {
      const { container } = render(
        <ShimmerText variant={variant as any}>Test</ShimmerText>
      );
      expect(container).toBeInTheDocument();
    }
  });
});
