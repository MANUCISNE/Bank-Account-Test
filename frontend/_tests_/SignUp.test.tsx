import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import api from "@/src/services/api";
import React from "react";
import { SignUpModal }  from "@/src/app/(auth-routes)/SignUp";

// Mock para a chamada de API
jest.mock("../src/services/api.ts", () => ({
  post: jest.fn(),
}));

// Criação do mock para addToast e removeToast
const mockAddToast = jest.fn();
const mockRemoveToast = jest.fn();

jest.mock("../src/app/(auth-routes)/SignUp/index.tsx", () => ({
  ToastFunction: () => ({
    addToast: mockAddToast,
    removeToast: mockRemoveToast,
  }),
}));

describe("SignUpModal", () => {
  it("should make API call on form submission", async () => {
    const mockData = {
      name: "Test User",
      email: "test@example.com",
      password: "password",
      confirm_password: "password",
    };

    (api.post as jest.Mock).mockResolvedValue({});

    const { getByPlaceholderText } = render(<SignUpModal />);
    const nameInput = getByPlaceholderText("Name");
    fireEvent.change(nameInput, { target: { value: mockData.name } });

    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: mockData.email } });

    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: mockData.password } });

    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm password");
        fireEvent.change(confirmPasswordInput, {
          target: { value: mockData.confirm_password },
        });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() =>
      expect(api.post).toHaveBeenCalledWith("/users", mockData)
    );

    // Verifica se addToast foi chamado
    expect(mockAddToast).toHaveBeenCalled();
  });
});
