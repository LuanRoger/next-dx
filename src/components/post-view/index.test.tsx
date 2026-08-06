import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getPosts } from "@/app/actions/posts";
import PostView from "./index";

// Mock the getPosts function
vi.mock("@/app/actions/posts", () => ({
  getPosts: vi.fn(),
}));

// Mock Next.js cache features
vi.mock("next/cache", () => ({
  cacheTag: vi.fn(),
}));

describe("PostView Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render error message when posts fetch fails", async () => {
    vi.mocked(getPosts).mockResolvedValue({
      data: undefined,
      serverError: undefined,
      validationErrors: { _errors: ["Failed to fetch"] },
    });

    const Component = await PostView({});
    render(Component);

    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch posts. Please try again later.")
      ).toBeInTheDocument();
    });
  });

  it("should render posts when fetch is successful", async () => {
    const mockResult = {
      lastUpdate: "2023-01-01",
      result: [
        { body: "Test Body", id: 1, title: "Test Post", userId: 1 },
        { body: "Another Body", id: 2, title: "Another Post", userId: 1 },
      ],
    };

    vi.mocked(getPosts).mockResolvedValue({
      data: mockResult,
      serverError: undefined,
      validationErrors: undefined,
    });

    const Component = await PostView({});
    render(Component);

    await waitFor(() => {
      expect(screen.getByText("Last updated: 2023-01-01")).toBeInTheDocument();
      expect(screen.getByText("Test Post")).toBeInTheDocument();
      expect(screen.getByText("Another Post")).toBeInTheDocument();
    });
  });

  it("should filter posts by userId when provided", async () => {
    const mockResult = {
      lastUpdate: "2023-01-01",
      result: [{ body: "Body", id: 1, title: "User 1 Post", userId: 1 }],
    };

    vi.mocked(getPosts).mockResolvedValue({
      data: mockResult,
      serverError: undefined,
      validationErrors: undefined,
    });

    const Component = await PostView({ userId: 1 });
    render(Component);

    await waitFor(() => {
      expect(getPosts).toHaveBeenCalledWith({ userId: 1 });
      expect(screen.getByText("User 1 Post")).toBeInTheDocument();
    });
  });
});
