import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PostsListItem from "./index";

describe("PostsListItem Component", () => {
  const mockPost = {
    id: 1,
    title: "Test Post Title",
    body: "Test post body content",
  };

  it("should render post title and body", () => {
    render(<PostsListItem post={mockPost} />);

    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    expect(screen.getByText("Test post body content")).toBeInTheDocument();
  });

  it("should render as an alert component", () => {
    render(<PostsListItem post={mockPost} />);

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  it("should have title and description structure", () => {
    render(<PostsListItem post={mockPost} />);

    const title = screen.getByText("Test Post Title");
    const description = screen.getByText("Test post body content");

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
