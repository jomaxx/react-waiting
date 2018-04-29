import React from "react";
import { render } from "react-testing-library";
import { Wait, Waiting } from "../src";

test("renders", () => {
  render(<Waiting>{() => <Wait />}</Waiting>);
});
