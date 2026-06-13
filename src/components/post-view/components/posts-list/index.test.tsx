import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PostsList from "./index";

describe("PostsList Component", () => {
  const mockPosts = [
    { id: 1, title: "First Post", body: "First body" },
    { id: 2, title: "Second Post", body: "Second body" },
  ];

  it("should render a list of posts", () => {
    render(<PostsList posts={mockPosts} />);

    expect(screen.getByText("First Post")).toBeInTheDocument();
    expect(screen.getByText("Second Post")).toBeInTheDocument();
    expect(screen.getByText("First body")).toBeInTheDocument();
    expect(screen.getByText("Second body")).toBeInTheDocument();
  });

  it("should render empty list when no posts", () => {
    render(<PostsList posts={[]} />);

    // Should not throw errors, just render empty scroll area
    const scrollArea = screen.getByTestId("scroll-area", {
      selector: '[data-slot="scroll-area"]',
    });
    expect(scrollArea).toBeInTheDocument();
  });

  it("should have scrollable container", () => {
    render(<PostsList posts={mockPosts} />);

    const scrollArea = screen.getByTestId("scroll-area", {
      selector: '[data-slot="scroll-area"]',
    });
    expect(scrollArea).toHaveClass("h-96");
    expect(scrollArea).toHaveClass("rounded-md");
  });
});
