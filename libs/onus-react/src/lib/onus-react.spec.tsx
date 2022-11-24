import { render } from '@testing-library/react';

import OnusReact from './onus-react';

describe('OnusReact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OnusReact />);
    expect(baseElement).toBeTruthy();
  });
});
