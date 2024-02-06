import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastFunction } from "@/src/contexts/Toast";
import ToastContainer from "@/src/components/ToastContainer";

jest.mock("axios");
jest.mock("react-hook-form", () => ({
  useForm: jest.fn().mockReturnValue({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    reset: jest.fn(),
    formState: { isSubmitting: false },
  }),
}));

describe("SignUpModal", () => {
  it("should handle user creation successfully", async () => {
    const mockData = {
      name: "Test User",
      email: "test@example.com",
      password: "password",
      confirm_password: "password",
    };

    await waitFor(() => {
      expect(useForm().reset).toHaveBeenCalled();
      expect(ToastFunction().addToast).toHaveBeenCalledWith({
        type: "success",
        title: "Registration completed!",
        description: "You can now login!",
      });
    });
  });

  it("should handle user creation error", async () => {
    const error = {
      response: {
        data: {
          message: ["Error message"],
        },
      },
    };

    await waitFor(() => {
      expect(ToastFunction().addToast).toHaveBeenCalledWith({
        type: "error",
        title: "Error in registration",
        description: "Error message",
      });
    });
  });
});
