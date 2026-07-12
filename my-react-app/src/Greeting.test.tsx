import {describe, expect, it} from "vitest";
import Greeting from "./Greeting.tsx";
import {render, screen} from "@testing-library/react";


describe("Greeting", () => {
  it("show name", () => {
    render(<Greeting name="Andrew"/>);
    expect(screen.getByText("Hello Andrew")).toBeInTheDocument()
  })

  it("show empty name", () => {
    render(<Greeting name=""/>);
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })
})