import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Analytics from "./Analytics";

describe("Analytics page", () => {
  it("renders analytics values correctly", async () => {
    // Arrange
    const mockData = {
      WFO: 2,
      WFH: 3,
      LEAVE: 1,
      HOLIDAY: 0,
    };

    const router = createMemoryRouter(
      [
        {
          path: "/analytics",
          element: <Analytics />,
          loader: () => mockData,
        },
      ],
      { initialEntries: ["/analytics"] },
    );

    // Act
    render(<RouterProvider router={router} />);

    // Assert (ASYNC because loader resolves)
    expect(await screen.findByText("Work From Office")).toBeInTheDocument();
    expect(await screen.findByText("2")).toBeInTheDocument();

    expect(await screen.findByText("Work From Home")).toBeInTheDocument();
    expect(await screen.findByText("3")).toBeInTheDocument();
  });
});
