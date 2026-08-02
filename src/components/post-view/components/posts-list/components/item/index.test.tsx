import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PostsListItem from "./index";

describe("PostsListItem Component", () => {
  const mockPost = {
    body: "Test post body content",
    id: 1,
    title: "Test Post Title",
  };

  it("should render post title and body", () => {
    render(<PostsListItem post={mockPost} />);

    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    expect(screen.getByText("Test post body content")).toBeInTheDocument();
  });

  it("should render as a card component", () => {
    render(<PostsListItem post={mockPost} />);

    const card = screen.getByRole("listitem");
    expect(card).toBeInTheDocument();
    expect(card.firstChild).toHaveClass("group/card");
  });

  it("should have title and description structure", () => {
    render(<PostsListItem post={mockPost} />);

    const title = screen.getByText("Test Post Title");
    const description = screen.getByText("Test post body content");

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
