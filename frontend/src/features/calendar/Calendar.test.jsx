import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Calendar from "./Calendar";

/* ---------- mocks ---------- */

vi.mock("@fullcalendar/react", () => ({
  default: () => <div data-testid="full-calendar" />,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useRevalidator: () => ({
      revalidate: vi.fn(),
    }),
  };
});

/* ---------- test ---------- */

describe("Calendar page", () => {
  it("renders calendar page", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/calendar",
          element: <Calendar />,
          loader: () => ({
            workLocations: [],
            role: "EMPLOYEE",
            todayBoard: null,
          }),
        },
      ],
      { initialEntries: ["/calendar"] },
    );

    render(<RouterProvider router={router} />);

    expect(await screen.findByText("Calendar")).toBeInTheDocument();
    expect(screen.getByTestId("full-calendar")).toBeInTheDocument();
  });
});