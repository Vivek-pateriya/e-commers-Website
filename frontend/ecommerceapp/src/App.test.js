import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: '' })),
}));

test('renders the main account links', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /admin/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /customer/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /vender/i })).toBeInTheDocument();
});
