import { PropsWithChildren } from 'react';
import { render, cleanup } from '@testing-library/react';
import OnusElementsProvider from './OnusElementsProvider';
import GetElement from './GetElement';
import SetElement from './SetElement';
import useSetElement from './useSetElement';

interface TestProps extends PropsWithChildren {
  name?: string;
  priority: number;
  append?: boolean;
  prepend?: boolean;
}

const Test = ({
  children,
  name = 'test',
  priority,
  append,
  prepend,
}: TestProps) => {
  useSetElement(
    {
      append,
      prepend,
      priority,
      name: name + '--hook',
    },
    children
  );
  return (
    <SetElement
      name={name}
      priority={priority}
      append={append}
      prepend={prepend}
    >
      <header>{children}</header>
    </SetElement>
  );
};

describe('GetElement / SetElement', () => {
  afterEach(cleanup);

  it('GetElement accepts children as a default', () => {
    const App = () => (
      <OnusElementsProvider>
        <div data-testid="get-element">
          <GetElement name="test">Default</GetElement>
        </div>
        <div data-testid="get-element-hook">
          <GetElement name="test--hook">Default</GetElement>
        </div>
      </OnusElementsProvider>
    );
    const { getByTestId } = render(<App />);
    expect(getByTestId('get-element')).toHaveTextContent('Default');
    expect(getByTestId('get-element-hook')).toHaveTextContent('Default');
  });

  it('GetElement can live without a SetElement', () => {
    const App = () => (
      <OnusElementsProvider>
        <div data-testid="get-element">
          <GetElement name="test" />
        </div>
      </OnusElementsProvider>
    );

    const { getByTestId } = render(<App />);
    expect(getByTestId('get-element')).toBeVisible();
  });

  it('inserts children of SetElement into GetElement', () => {
    const App = () => (
      <OnusElementsProvider>
        <article data-testid="set-element">
          <Test priority={0}>Test</Test>
        </article>
        <article data-testid="get-element">
          <GetElement name="test" />
        </article>
        <article data-testid="get-element-hook">
          <GetElement name="test--hook" />
        </article>
      </OnusElementsProvider>
    );
    const { getByTestId } = render(<App />);
    expect(getByTestId('get-element')).toHaveTextContent('Test');
    expect(getByTestId('get-element-hook')).toHaveTextContent('Test');
  });

  it('uses biggest priority value regardless of order', () => {
    const { getByTestId } = render(
      <OnusElementsProvider>
        <article data-testid="get-element">
          <GetElement name="test" />
        </article>
        <article data-testid="get-element-hook">
          <GetElement name="test--hook" />
        </article>
        <Test priority={2}>Two</Test>
        <Test priority={3}>Three</Test>
        <Test priority={0}>Zero</Test>
        <Test priority={1}>One</Test>
      </OnusElementsProvider>
    );
    expect(getByTestId('get-element')).toHaveTextContent('Three');
    expect(getByTestId('get-element-hook')).toHaveTextContent('Three');
  });
  it('uses double digit priority values appropriately', () => {
    const { getByTestId } = render(
      <OnusElementsProvider>
        <article data-testid="get-element">
          <GetElement name="test" />
        </article>
        <article data-testid="get-element-hook">
          <GetElement name="test--hook" />
        </article>
        <Test priority={12}>Twelve</Test>
        <Test priority={3}>Three</Test>
        <Test priority={0}>Zero</Test>
        <Test priority={1}>One</Test>
      </OnusElementsProvider>
    );
    expect(getByTestId('get-element')).toHaveTextContent('Twelve');
    expect(getByTestId('get-element-hook')).toHaveTextContent('Twelve');
  });

  it('extreme priority values work', () => {
    const { getByTestId } = render(
      <OnusElementsProvider>
        <article data-testid="get-element">
          <GetElement name="test" />
        </article>
        <article data-testid="get-element-hook">
          <GetElement name="test--hook" />
        </article>
        <Test priority={1332949343}>Huge</Test>
        <Test priority={3}>Three</Test>
        <Test priority={0}>Zero</Test>
        <Test priority={1}>One</Test>
      </OnusElementsProvider>
    );
    expect(getByTestId('get-element')).toHaveTextContent('Huge');
    expect(getByTestId('get-element-hook')).toHaveTextContent('Huge');
  });

  it('renders next lower priority when the highest unmounts', () => {
    const App = ({ children }: PropsWithChildren) => (
      <OnusElementsProvider>
        <div data-testid="get-element">
          <GetElement name="test" />
        </div>
        <div data-testid="get-element-hook">
          <GetElement name="test--hook" />
        </div>
        <Test priority={0}>Zero</Test>
        {children}
      </OnusElementsProvider>
    );

    const { getByTestId, rerender } = render(
      <App>
        <Test priority={1}>One</Test>
      </App>
    );
    expect(getByTestId('get-element')).toHaveTextContent('One');
    expect(getByTestId('get-element-hook')).toHaveTextContent('One');
    rerender(<App />);
    expect(getByTestId('get-element')).toHaveTextContent('Zero');
    expect(getByTestId('get-element-hook')).toHaveTextContent('Zero');
  });

  it('renders new highest when it mounts', () => {
    const App = ({
      showOne,
      showTwo,
    }: {
      showOne?: boolean;
      showTwo?: boolean;
    }) => (
      <OnusElementsProvider>
        <div data-testid="get-element">
          <GetElement name="test" />
        </div>
        <div data-testid="get-element-hook">
          <GetElement name="test--hook" />
        </div>
        {showTwo ? <Test priority={2}>Two</Test> : null}
        <Test priority={0}>Zero</Test>
        {showOne ? <Test priority={1}>One</Test> : null}
      </OnusElementsProvider>
    );

    const { getByTestId, rerender } = render(<App />);
    expect(getByTestId('get-element')).toHaveTextContent('Zero');
    expect(getByTestId('get-element-hook')).toHaveTextContent('Zero');
    rerender(<App showOne />);
    expect(getByTestId('get-element')).toHaveTextContent('One');
    expect(getByTestId('get-element-hook')).toHaveTextContent('One');
    rerender(<App showTwo />);
    expect(getByTestId('get-element')).toHaveTextContent('Two');
    expect(getByTestId('get-element-hook')).toHaveTextContent('Two');
  });

  it('renders multiple GetElement components', () => {
    const App = () => (
      <OnusElementsProvider>
        <div data-testid="first">
          <GetElement name="test" />
        </div>
        <div data-testid="first--hook">
          <GetElement name="test--hook" />
        </div>
        <Test priority={0}>Zero</Test>
        <Test priority={1}>One</Test>
        <div data-testid="second">
          <GetElement name="test" />
        </div>
        <div data-testid="second--hook">
          <GetElement name="test--hook" />
        </div>
      </OnusElementsProvider>
    );

    const { getByTestId } = render(<App />);
    expect(getByTestId('first')).toHaveTextContent('One');
    expect(getByTestId('second')).toHaveTextContent('One');
    expect(getByTestId('first--hook')).toHaveTextContent('One');
    expect(getByTestId('second--hook')).toHaveTextContent('One');
  });

  it('renders correct element when using multiple SetElement names', () => {
    const App = () => (
      <OnusElementsProvider>
        <div data-testid="test">
          <GetElement name="test" />
        </div>
        <div data-testid="foo">
          <GetElement name="foo" />
        </div>
        <Test priority={0}>Zero</Test>
        <Test priority={1}>One</Test>
        <SetElement name="foo" priority={2}>
          <span>FooBar</span>
        </SetElement>
      </OnusElementsProvider>
    );

    const { getByTestId } = render(<App />);
    expect(getByTestId('foo')).toContainHTML('<span>FooBar</span>');
    expect(getByTestId('test')).toHaveTextContent('One');
  });

  it('appends rather than replacing element', () => {
    const App = ({ showOne }: { showOne?: boolean }) => (
      <OnusElementsProvider>
        <div data-testid="get-element">
          <GetElement name="test" />
        </div>
        <div data-testid="get-element-hook">
          <GetElement name="test--hook" />
        </div>
        <Test priority={2} append>
          Two
        </Test>
        <Test priority={0}>Zero</Test>
        {showOne ? <Test priority={1}>One</Test> : null}
      </OnusElementsProvider>
    );

    const { getByTestId, rerender } = render(<App />);
    expect(getByTestId('get-element')).toHaveTextContent('ZeroTwo');
    expect(getByTestId('get-element-hook')).toHaveTextContent('ZeroTwo');
    rerender(<App showOne />);
    expect(getByTestId('get-element')).toHaveTextContent('OneTwo');
    expect(getByTestId('get-element-hook')).toHaveTextContent('OneTwo');
  });

  it('prepends rather than replacing element', () => {
    const App = ({ showOne }: { showOne?: boolean }) => (
      <OnusElementsProvider>
        <div data-testid="get-element">
          <GetElement name="test" />
        </div>
        <div data-testid="get-element-hook">
          <GetElement name="test--hook" />
        </div>
        <Test priority={2} prepend>
          Two
        </Test>
        <Test priority={0}>Zero</Test>
        {showOne ? <Test priority={1}>One</Test> : null}
      </OnusElementsProvider>
    );

    const { getByTestId, rerender } = render(<App />);
    expect(getByTestId('get-element')).toHaveTextContent('TwoZero');
    expect(getByTestId('get-element-hook')).toHaveTextContent('TwoZero');
    rerender(<App showOne />);
    expect(getByTestId('get-element')).toHaveTextContent('TwoOne');
    expect(getByTestId('get-element-hook')).toHaveTextContent('TwoOne');
  });

  it('replaces children in the same priority', () => {
    const App = ({ showZero }: { showZero?: boolean }) => (
      <OnusElementsProvider>
        <div data-testid="get-element">
          <GetElement name="test" />
        </div>
        <div data-testid="get-element-hook">
          <GetElement name="test--hook" />
        </div>
        {showZero ? (
          <Test priority={0}>
            <span>Zero</span>
          </Test>
        ) : null}
        {!showZero ? (
          <Test priority={0}>
            <span>One</span>
          </Test>
        ) : null}
      </OnusElementsProvider>
    );

    const { getByTestId, rerender } = render(<App />);
    expect(getByTestId('get-element')).toHaveTextContent('One');
    expect(getByTestId('get-element-hook')).toHaveTextContent('One');
    rerender(<App showZero />);
    expect(getByTestId('get-element')).toHaveTextContent('Zero');
    expect(getByTestId('get-element-hook')).toHaveTextContent('Zero');
  });

  it('renders new children with prop update', () => {
    const App = ({ children }: PropsWithChildren) => (
      <OnusElementsProvider>
        <div data-testid="get-element">
          <GetElement name="test" />
        </div>
        <div data-testid="get-element-hook">
          <GetElement name="test--hook" />
        </div>
        <Test priority={0}>{children}</Test>
      </OnusElementsProvider>
    );

    const { getByTestId, rerender } = render(<App />);
    expect(getByTestId('get-element')).toHaveTextContent('');
    expect(getByTestId('get-element-hook')).toHaveTextContent('');
    rerender(<App>Zero</App>);
    expect(getByTestId('get-element')).toHaveTextContent('Zero');
    expect(getByTestId('get-element-hook')).toHaveTextContent('Zero');
  });

  it('renders two providers separately', () => {
    const { getByTestId } = render(
      <section>
        <article>
          <OnusElementsProvider>
            <article data-testid="get-element-1">
              <GetElement name="test" />
            </article>
            <article data-testid="get-element-1-hook">
              <GetElement name="test--hook" />
            </article>
            <Test priority={1}>One</Test>
          </OnusElementsProvider>
        </article>
        <article>
          <OnusElementsProvider>
            <article data-testid="get-element-2">
              <GetElement name="test" />
            </article>
            <article data-testid="get-element-2-hook">
              <GetElement name="test--hook" />
            </article>
            <Test priority={1}>Two</Test>
          </OnusElementsProvider>
        </article>
      </section>
    );
    expect(getByTestId('get-element-1')).toHaveTextContent('One');
    expect(getByTestId('get-element-2')).toHaveTextContent('Two');
    expect(getByTestId('get-element-1-hook')).toHaveTextContent('One');
    expect(getByTestId('get-element-2-hook')).toHaveTextContent('Two');
  });
});
