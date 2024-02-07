import { SignUpModal } from '@/src/app/(auth-routes)/SignUp';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import {screen} from '@testing-library/dom'
import api from "@/src/services/api";

jest.mock('../src/services/api.ts', () => ({
  post: jest.fn(),
}));

describe('SignUpModal', () => {
  it('should make API call on form submission', async () => {
    const mockData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
      confirm_password: 'password',
    };

    (api.post as jest.Mock).mockResolvedValue({});

    const { getByRole } = render(<SignUpModal />);

    const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
    const currentNameValue = nameInput.value;
    fireEvent.change(nameInput, {
      target: { value: mockData.name },
    });

    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    const currentEmailValue = emailInput.value;
    fireEvent.change(emailInput, {
      target: { value: mockData.email },
    });

    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
    const currentPasswordValue = passwordInput.value;
    fireEvent.change(passwordInput, {
      target: { value: mockData.password },
    });

    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password') as HTMLInputElement;
    const currentConfirmPasswordValue = confirmPasswordInput.value;
    fireEvent.change(confirmPasswordInput, {
      target: { value: mockData.confirm_password },
    });

    fireEvent.click(getByRole('button', { name: /register/i }));

    await waitFor(() =>
      expect(api.post).toHaveBeenCalledWith('/users', mockData)
    );
  });
});
