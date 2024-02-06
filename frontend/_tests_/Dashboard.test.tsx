/**
 * @jest-environment jsdom
 */

import Dashboard from '@/src/app/(dashboard-routes)/dashboard/page';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('../src/services/api.ts', () => ({
  get: jest.fn().mockImplementation((url) => {
    if (url === '/accounts') {
      return Promise.resolve({
        data: {
          current_account: { value: 1000 },
          savings_account: { value: 2000 },
        },
      });
    }
    if (url === '/transactions') {
      return Promise.resolve({
        data: [],
      });
    }
  }),
}));

describe('Dashboard', () => {
  it('renders without crashing', async () => {
    const { findByText } = render(<Dashboard />);
    const savingsAccount = await findByText(`Savings Account`);
    const currentAccount = await findByText(`Current Account`);
    expect(savingsAccount).toBeInTheDocument();
    expect(currentAccount).toBeInTheDocument();
  });
});
