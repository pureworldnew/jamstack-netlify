import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Using FaunaDB & Netlify functions header", () => {
  render(<App />);
  const linkElement = screen.getByText(/Using FaunaDB & Netlify functions/i);
  expect(linkElement).toBeInTheDocument();
});

test("todos useState hook", () => {
  
})