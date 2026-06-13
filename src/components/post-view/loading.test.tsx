import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PostViewLoading from "./loading";

describe("PostViewLoading Component", () => {
  it("should render loading skeleton elements", () => {
    render(<PostViewLoading />);

    // Should render skeleton elements - check by attribute
    const skeletonElements = screen.getAllByTestId("skeleton");
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it("should have the correct structure", () => {
    render(<PostViewLoading />);

    // Find by class name
    const container = screen.getByTestId("post-view-loading");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("flex flex-col gap-2");
  });
});
