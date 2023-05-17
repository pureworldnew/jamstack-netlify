import React from "react";
import { render, screen } from "CustomRender";
import userEvent from "@testing-library/user-event";
import signInImage from "assets/difficult-roads.jpg";
import Signin from "./Signin";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
   ...jest.requireActual("react-router-dom"),
   useNavigate: () => mockNavigate,
}));

describe("Signin Page rendering", () => {
   it("renders default state", () => {
      render(<Signin />);
      const emailAddress = screen.getByRole("textbox", { name: /email/i });
      const password = screen.getByTestId("password");
      const singInLabel = screen.getByText("Sign in", { selector: "h1" });
      const BkgImage = screen.getByTestId("signInBackgroundImage");
      const rememberMeCheckbox = screen.getByLabelText("Remember me");
      const signInBtn = screen.getByRole("button", { name: /Sign In/i });
      const forgotPasswordLink = screen.getByRole("link", {
         name: "Forgot password?",
      });
      const dontSignUpLink = screen.getByRole("link", {
         name: "Don't have an account? Sign Up",
      });
      const yourWebsiteLink = screen.getByRole("link", {
         name: "Your Website",
      });

      expect(rememberMeCheckbox).not.toBeChecked();
      expect(signInBtn).toBeInTheDocument();
      expect(emailAddress).toBeInTheDocument();
      expect(password).toBeInTheDocument();
      expect(BkgImage).toHaveStyle(`background-image: url(${signInImage})`);
      expect(singInLabel).toBeInTheDocument();
      expect(forgotPasswordLink).toBeInTheDocument();
      expect(dontSignUpLink).toBeInTheDocument();
      expect(yourWebsiteLink).toBeInTheDocument();
   });
   it("navigation & checkbox is working properly", () => {
      render(<Signin />);
      const rememberMeCheckbox = screen.getByLabelText("Remember me");
      userEvent.click(screen.getByRole("checkbox", { name: /Remember me/i }));
      expect(rememberMeCheckbox).toBeChecked();

      const dontSignUpLink = screen.getByRole("link", {
         name: "Don't have an account? Sign Up",
      });
      userEvent.click(dontSignUpLink);
   });
});
