import React from "react";
import { render } from "CustomRender";
import Signin from "./Signin";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
   ...jest.requireActual("react-router-dom"),
   useNavigate: () => mockNavigate,
}));

describe("Signin", () => {
   it("showing Sign in test on SignIn page", () => {
      const { getByTestId } = render(<Signin />);
      const singInLabel = getByTestId("signinLabel");

      expect(singInLabel).toHaveTextContent("Sign in");
   });
});
