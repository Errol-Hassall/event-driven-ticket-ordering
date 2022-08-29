import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Buy tickets now link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Buy tickets now/i);
  expect(linkElement).toBeInTheDocument();
});
