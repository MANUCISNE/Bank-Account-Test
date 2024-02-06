/**
 * @jest-environment jsdom
 */

import Dashboard from '@/src/app/(dashboard-routes)/dashboard/page';
import { render, screen } from '@testing-library/react';

if (typeof TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = require("util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  rest.get('/accounts', (req, res, ctx) => {
    return res(ctx.json({ current_account: { value: 1000 }, savings_account: { value: 2000 } }))
  }),
  rest.get('/transactions', (req, res, ctx) => {
    return res(ctx.json([]))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders Dashboard component', async () => {
  render(<Dashboard />);

  expect(await screen.findByText('Savings Account')).toBeInTheDocument();
  expect(screen.getByText('1,000')).toBeInTheDocument();
  expect(screen.getByText('Current Account')).toBeInTheDocument();
  expect(screen.getByText('2,000')).toBeInTheDocument();

  expect(screen.getByText('New transaction')).toBeInTheDocument();
});
