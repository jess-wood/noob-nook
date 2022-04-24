import React from 'react';
import { render } from '@testing-library/react';
import Game_2048 from './game_2048';

test('renders learn react link', () => {
  const { getByText } = render(<Game_2048 />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
