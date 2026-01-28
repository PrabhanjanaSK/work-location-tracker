import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Calendar from "./Calendar";

describe("Calendar page", () => {
  it("renders calendar page", async () => {
    // Arrange
    const router = createMemoryRouter(
      [
        {
          path: "/calendar",
          element: <Calendar />,
          loader: () => [],
        },
      ],
      { initialEntries: ["/calendar"] },
    );

    // Act
    render(<RouterProvider router={router} />);

    // Assert
    expect(await screen.findByText("Calendar")).toBeInTheDocument();
  });
});
