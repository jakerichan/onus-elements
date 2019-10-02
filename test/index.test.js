import React from 'react'
import { render, cleanup } from '@testing-library/react'
import GetElement from '../src/components/GetElement'
import SetElement from '../src/components/SetElement'
import { subscribe } from '../src/utils/registry'

const Test = ({ children, ...props }) => (
  <SetElement name='test' {...props}>
    <header>{children}</header>
  </SetElement>
)

describe('registry', () => {
  describe('subscribe', () => {
    it('returns function', () => {
      const subscription = subscribe('foo', jest.fn())
      expect(subscription).toBeInstanceOf(Function)
      subscription()
    })
  })
})

describe('GetElement / SetElement', () => {
  afterEach(cleanup)

  it('inserts children of SetElement into GetElement', () => {
    const { getByTestId } = render(
      <section>
        <article data-testid='set-element'>
          <Test priority={0}>Test</Test>
        </article>
        <article data-testid='get-element'>
          <GetElement name='test' />
        </article>
      </section>
    )
    expect(getByTestId('get-element')).toHaveTextContent('Test')
  })

  it('uses biggest priority value regardless of order', () => {
    const { getByTestId } = render(
      <section>
        <article data-testid='get-element'>
          <GetElement name='test' />
        </article>
        <Test priority={2}>Two</Test>
        <Test priority={3}>Three</Test>
        <Test priority={0}>Zero</Test>
        <Test priority={1}>One</Test>
      </section>
    )
    expect(getByTestId('get-element')).toHaveTextContent('Three')
  })

  it('renders next lower priority when the highest unmounts', () => {
    const App = ({ showOne }) => (
      <section>
        <div data-testid='get-element'>
          <GetElement name='test' />
        </div>
        <Test priority={0}>Zero</Test>
        {showOne ? <Test priority={1}>One</Test> : null}
      </section>
    )

    const { getByTestId } = render(<App />)
    expect(getByTestId('get-element')).toHaveTextContent('Zero')
    cleanup()
    const { getByTestId: getShowOneByTestId } = render(<App showOne />)
    expect(getShowOneByTestId('get-element')).toHaveTextContent('One')
  })

  it('renders new highest when it mounts', () => {
    const App = ({ showOne, showTwo }) => (
      <section>
        <div data-testid='get-element'>
          <GetElement name='test' />
        </div>
        {showTwo ? <Test priority={2}>Two</Test> : null}
        <Test priority={0}>Zero</Test>
        {showOne ? <Test priority={1}>One</Test> : null}
      </section>
    )

    const { getByTestId } = render(<App />)
    expect(getByTestId('get-element')).toHaveTextContent('Zero')
    cleanup()
    const { getByTestId: getShowOneByTestId } = render(<App showOne />)
    expect(getShowOneByTestId('get-element')).toHaveTextContent('One')
    cleanup()
    const { getByTestId: getShowTwoByTestId } = render(<App showTwo />)
    expect(getShowTwoByTestId('get-element')).toHaveTextContent('Two')
  })

  it('renders multiple GetElement components', () => {
    const App = () => (
      <section>
        <div data-testid='first'>
          <GetElement name='test' />
        </div>
        <Test priority={0}>Zero</Test>
        <Test priority={1}>One</Test>
        <div data-testid='second'>
          <GetElement name='test' />
        </div>
      </section>
    )

    const { getByTestId } = render(<App />)
    expect(getByTestId('first')).toHaveTextContent('One')
    expect(getByTestId('second')).toHaveTextContent('One')
  })

  it('renders correct element when using multiple SetElement names', () => {
    const App = () => (
      <section>
        <div data-testid='test'>
          <GetElement name='test' />
        </div>
        <div data-testid='foo'>
          <GetElement name='foo' />
        </div>
        <Test priority={0}>Zero</Test>
        <Test priority={1}>One</Test>
        <SetElement name='foo' priority={2}>
          <span>FooBar</span>
        </SetElement>
      </section>
    )

    const { getByTestId } = render(<App />)
    expect(getByTestId('foo')).toContainHTML('<span>FooBar</span>')
    expect(getByTestId('test')).toHaveTextContent('One')
  })

  it('appends rather than replacing element', () => {
    const App = ({ showOne }) => (
      <section>
        <div data-testid='get-element'>
          <GetElement name='test' />
        </div>
        <Test priority={2} append>Two</Test>
        <Test priority={0}>Zero</Test>
        {showOne ? <Test priority={1}>One</Test> : null}
      </section>
    )

    const { getByTestId } = render(<App />)
    expect(getByTestId('get-element')).toHaveTextContent('ZeroTwo')
    cleanup()
    const { getByTestId: getShowOneByTestId } = render(<App showOne />)
    expect(getShowOneByTestId('get-element')).toHaveTextContent('OneTwo')
  })

  it('prepends rather than replacing element', () => {
    const App = ({ showOne }) => (
      <section>
        <div data-testid='get-element'>
          <GetElement name='test' />
        </div>
        <Test priority={2} prepend>Two</Test>
        <Test priority={0}>Zero</Test>
        {showOne ? <Test priority={1}>One</Test> : null}
      </section>
    )

    const { getByTestId } = render(<App />)
    expect(getByTestId('get-element')).toHaveTextContent('TwoZero')
    cleanup()
    const { getByTestId: getShowOneByTestId } = render(<App showOne />)
    expect(getShowOneByTestId('get-element')).toHaveTextContent('TwoOne')
  })

  it('replaces children in the same priority', () => {
    const App = ({ showZero }) => (
      <section>
        <div data-testid='get-element'>
          <GetElement name='test' />
        </div>
        {showZero ? <SetElement name='test' priority={0}>Zero</SetElement> : null}
        {!showZero ? <SetElement name='test' priority={0}>One</SetElement> : null}
      </section>
    )

    const { getByTestId } = render(<App />)
    expect(getByTestId('get-element')).toHaveTextContent('One')
    cleanup()
    const { getByTestId: getShowZeroByTestId } = render(<App showZero />)
    expect(getShowZeroByTestId('get-element')).toHaveTextContent('Zero')
  })

  it('sets previous priority element with additional props using withProps', () => {
    const App = () => (
      <section>
        <div data-testid='get-element'>
          <GetElement name='withPropsTest' />
        </div>
        <SetElement name='withPropsTest' priority={0}><span id='target'>Zero</span></SetElement>
        <SetElement name='withPropsTest' priority={1} withProps={{ className: 'bar' }} />
      </section>
    )

    const { getByTestId } = render(<App />)
    expect(getByTestId('get-element').children[0]).toHaveClass('bar')
  })

  it('sets previous priority component with additional props using withProps', () => {
    const Label = (props) => <span {...props} id='target'>Zero</span>
    const App = () => (
      <section>
        <div data-testid='get-element'>
          <GetElement name='withPropsTest' />
        </div>
        <SetElement name='withPropsTest' priority={0}><Label /></SetElement>
        <SetElement name='withPropsTest' priority={1} withProps={{ className: 'bar' }} />
      </section>
    )

    const { getByTestId } = render(<App />)
    expect(getByTestId('get-element')).toContainHTML('<span class="bar" id="target">Zero</span>')
  })

  it('maintains order using withProps', () => {
    const App = ({ showTwo }) => (
      <section>
        <div data-testid='get-element'>
          <GetElement name='withPropsTest' />
        </div>
        <SetElement name='withPropsTest' priority={0}><span id='target'>Zero</span></SetElement>
        <SetElement name='withPropsTest' priority={1} withProps={{ className: 'bar' }} />
        {showTwo && <SetElement name='withPropsTest' priority={2}><span id='target'>Two</span></SetElement>}
      </section>
    )

    const { getByTestId } = render(<App />)
    expect(getByTestId('get-element')).toContainHTML('<span id="target" class="bar">Zero</span>')
    cleanup()
    const { getByTestId: getShowTwoByTestId } = render(<App showTwo />)
    expect(getShowTwoByTestId('get-element')).toContainHTML('<span id="target">Two</span>')
  })

  it('removes component withProps when unmounted', () => {
    const App = ({ showWithProps }) => (
      <section>
        <div data-testid='get-element'>
          <GetElement name='withPropsTest' />
        </div>
        <SetElement name='withPropsTest' priority={0}><span id='target'>Zero</span></SetElement>
        {showWithProps && <SetElement name='withPropsTest' priority={1} withProps={{ className: 'bar' }} />}
      </section>
    )

    const { getByTestId: getWithPropsByTestId } = render(<App showWithProps />)
    expect(getWithPropsByTestId('get-element')).toContainHTML('<span id="target" class="bar">Zero</span>')
    cleanup()
    const { getByTestId } = render(<App />)
    expect(getByTestId('get-element')).toContainHTML('<span id="target">Zero</span>')
  })
})
