import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Analytics from "./Analytics";

describe("Analytics page", () => {
  it("renders analytics values correctly", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/analytics",
          element: <Analytics />,
          loader: () => ({
            role: "EMPLOYEE",
            summary: {
              WFO: 2,
              WFH: 3,
              LEAVE: 1,
              HOLIDAY: 0,
            },
            employees: [],
          }),
        },
      ],
      { initialEntries: ["/analytics"] },
    );

    render(<RouterProvider router={router} />);

    expect(await screen.findByText("Work From Office")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    expect(screen.getByText("Work From Home")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});