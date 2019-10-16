import React from 'react'
import { render, cleanup } from '@testing-library/react'
import CanaryProvider from '../src/components/OnusElementsProvider'
import GetElement from '../src/components/GetElement'
import SetElement from '../src/components/SetElement'

const Test = ({ children, ...props }) => (
  <SetElement name='test' {...props}>
    <header>{children}</header>
  </SetElement>
)

describe('GetElement / SetElement', () => {
  afterEach(cleanup)

  it('inserts children of SetElement into GetElement', () => {
    const { getByTestId } = render(
      <CanaryProvider>
        <article data-testid='set-element'>
          <Test priority={0}>Test</Test>
        </article>
        <article data-testid='get-element'>
          <GetElement name='test' />
        </article>
      </CanaryProvider>
    )
    expect(getByTestId('get-element')).toHaveTextContent('Test')
  })

  it('uses biggest priority value regardless of order', () => {
    const { getByTestId } = render(
      <CanaryProvider>
        <article data-testid='get-element'>
          <GetElement name='test' />
        </article>
        <Test priority={2}>Two</Test>
        <Test priority={3}>Three</Test>
        <Test priority={0}>Zero</Test>
        <Test priority={1}>One</Test>
      </CanaryProvider>
    )
    expect(getByTestId('get-element')).toHaveTextContent('Three')
  })

  it('renders next lower priority when the highest unmounts', () => {
    const App = ({ showOne }) => (
      <CanaryProvider>
        <div data-testid='get-element'>
          <GetElement name='test' />
        </div>
        <Test priority={0}>Zero</Test>
        {showOne ? <Test priority={1}>One</Test> : null}
      </CanaryProvider>
    )

    const { getByTestId } = render(<App />)
    expect(getByTestId('get-element')).toHaveTextContent('Zero')
    cleanup()
    const { getByTestId: getShowOneByTestId } = render(<App showOne />)
    expect(getShowOneByTestId('get-element')).toHaveTextContent('One')
  })

  it('renders new highest when it mounts', () => {
    const App = ({ showOne, showTwo }) => (
      <CanaryProvider>
        <div data-testid='get-element'>
          <GetElement name='test' />
        </div>
        {showTwo ? <Test priority={2}>Two</Test> : null}
        <Test priority={0}>Zero</Test>
        {showOne ? <Test priority={1}>One</Test> : null}
      </CanaryProvider>
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
      <CanaryProvider>
        <div data-testid='first'>
          <GetElement name='test' />
        </div>
        <Test priority={0}>Zero</Test>
        <Test priority={1}>One</Test>
        <div data-testid='second'>
          <GetElement name='test' />
        </div>
      </CanaryProvider>
    )

    const { getByTestId } = render(<App />)
    expect(getByTestId('first')).toHaveTextContent('One')
    expect(getByTestId('second')).toHaveTextContent('One')
  })

  it('renders correct element when using multiple SetElement names', () => {
    const App = () => (
      <CanaryProvider>
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
      </CanaryProvider>
    )

    const { getByTestId } = render(<App />)
    expect(getByTestId('foo')).toContainHTML('<span>FooBar</span>')
    expect(getByTestId('test')).toHaveTextContent('One')
  })

  it('appends rather than replacing element', () => {
    const App = ({ showOne }) => (
      <CanaryProvider>
        <div data-testid='get-element'>
          <GetElement name='test' />
        </div>
        <Test priority={2} append>Two</Test>
        <Test priority={0}>Zero</Test>
        {showOne ? <Test priority={1}>One</Test> : null}
      </CanaryProvider>
    )

    const { getByTestId } = render(<App />)
    expect(getByTestId('get-element')).toHaveTextContent('ZeroTwo')
    cleanup()
    const { getByTestId: getShowOneByTestId } = render(<App showOne />)
    expect(getShowOneByTestId('get-element')).toHaveTextContent('OneTwo')
  })

  it('prepends rather than replacing element', () => {
    const App = ({ showOne }) => (
      <CanaryProvider>
        <div data-testid='get-element'>
          <GetElement name='test' />
        </div>
        <Test priority={2} prepend>Two</Test>
        <Test priority={0}>Zero</Test>
        {showOne ? <Test priority={1}>One</Test> : null}
      </CanaryProvider>
    )

    const { getByTestId } = render(<App />)
    expect(getByTestId('get-element')).toHaveTextContent('TwoZero')
    cleanup()
    const { getByTestId: getShowOneByTestId } = render(<App showOne />)
    expect(getShowOneByTestId('get-element')).toHaveTextContent('TwoOne')
  })

  it('replaces children in the same priority', () => {
    const App = ({ showZero }) => (
      <CanaryProvider>
        <div data-testid='get-element'>
          <GetElement name='test' />
        </div>
        {showZero ? <SetElement name='test' priority={0}><span>Zero</span></SetElement> : null}
        {!showZero ? <SetElement name='test' priority={0}><span>One</span></SetElement> : null}
      </CanaryProvider>
    )

    const { getByTestId } = render(<App />)
    expect(getByTestId('get-element')).toHaveTextContent('One')
    cleanup()
    const { getByTestId: getShowZeroByTestId } = render(<App showZero />)
    expect(getShowZeroByTestId('get-element')).toHaveTextContent('Zero')
  })

  it('renders two providers separately', () => {
    const { getByTestId } = render(
      <section>
        <article>
          <CanaryProvider>
            <article data-testid='get-element-1'>
              <GetElement name='test' />
            </article>
            <Test priority={1}>One</Test>
          </CanaryProvider>
        </article>
        <article>
          <CanaryProvider>
            <article data-testid='get-element-2'>
              <GetElement name='test' />
            </article>
            <Test priority={1}>Two</Test>
          </CanaryProvider>
        </article>
      </section>
    )
    expect(getByTestId('get-element-1')).toHaveTextContent('One')
    expect(getByTestId('get-element-2')).toHaveTextContent('Two')
  })
})
