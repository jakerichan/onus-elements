import React from 'react';
import { mount } from 'enzyme';
import { GetContent, SetContent } from '../index';
import { subscribe } from '../registry'

// Since we use the setTimeout in the GetContent onChange function,
// we can use fake timers and finish updating with SetContent when ready
jest.useFakeTimers();
let mountedApp
let noop = () => {};

const Test = ({ children, ...props }) => (
  <SetContent name='test' {...props}>
    <heading>{children}</heading>
  </SetContent>
)

describe('registry', () => {
  describe("subscribe", () => {
    it("returns function", () => {
      const subscription = subscribe("foo", noop);
      expect(subscription).toBeInstanceOf(Function);
      subscription();
    });
  })
})

describe('GetContent / SetContent', () => {
  afterEach(() => {
    if (mountedApp) mountedApp.unmount();
  })

  it('inserts contents of SetContent into GetContent', () => {
    mountedApp = mount(
      <section>
        <article className='set-content'>
        <Test depth={0}>Test</Test>
        </article>
        <article className='get-content'>
          <GetContent name='test' />
        </article>
      </section>
    )
    jest.runAllTimers();
    expect(mountedApp.find(GetContent).text()).toBe('Test');
  });

  it('uses biggest depth value regardless of order', () => {
    mountedApp = mount(
      <section>
        <article className='get-content'>
          <GetContent name='test' />
        </article>
        <Test depth={2}>Two</Test>
        <Test depth={3}>Three</Test>
        <Test depth={0}>Zero</Test>
        <Test depth={1}>One</Test>
      </section>
    )
    jest.runAllTimers();
    expect(mountedApp.find(GetContent).text()).toBe('Three');
  });

  it('renders next lower depth when the highest unmounts', () => {
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = { showOne: true }
      }

      render() {
        return (
          <section>
            <GetContent name='test' />
            <Test depth={0}>Zero</Test>
            {this.state.showOne ? <Test depth={1}>One</Test> : null}
          </section>
        );
      }
    }

    mountedApp = mount(<App />)
    jest.runAllTimers();
    expect(mountedApp.find(GetContent).text()).toBe('One');
    mountedApp.setState({ showOne: false })
    jest.runAllTimers();
    expect(mountedApp.find(GetContent).text()).toBe('Zero');
  });

  it('renders new highest when it mounts', () => {
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = { showOne: false, showTwo: false }
      }

      render() {
        return (
          <section>
            <GetContent name='test' />
            {this.state.showTwo ? <Test depth={2}>Two</Test> : null}
            <Test depth={0}>Zero</Test>
            {this.state.showOne ? <Test depth={1}>One</Test> : null}
          </section>
        );
      }
    }

    mountedApp = mount(<App />)
    jest.runAllTimers();
    expect(mountedApp.find(GetContent).text()).toBe('Zero');
    mountedApp.setState({ showOne: true })
    jest.runAllTimers();
    expect(mountedApp.find(GetContent).text()).toBe('One');
    mountedApp.setState({ showTwo: true })
    jest.runAllTimers();
    expect(mountedApp.find(GetContent).text()).toBe('Two');
  });

  it('renders multiple GetContent components', () => {
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = { showOne: false, showTwo: false }
      }

      render() {
        return (
          <section>
            <div className="first">
              <GetContent name='test' />
            </div>
            <Test depth={0}>Zero</Test>
            <Test depth={1}>One</Test>
            <div className="second">
              <GetContent name='test' />
            </div>
          </section>
        );
      }
    }

    mountedApp = mount(<App />)
    jest.runAllTimers();
    mountedApp.find(GetContent).forEach((element) => {
      expect(element.text()).toBe('One');
    })
  })

  it('renders correct content when using multiple SetContent names', () => {
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = { showOne: false, showTwo: false }
      }

      render() {
        return (
          <section>
            <GetContent name='test' />
            <GetContent name='foo' />
            <Test depth={0}>Zero</Test>
            <Test depth={1}>One</Test>
            <SetContent name='foo' depth={2}>
              <span>FooBar</span>
            </SetContent>
          </section>
        );
      }
    }

    mountedApp = mount(<App />)
    jest.runAllTimers();
    mountedApp.find(GetContent).forEach((element) => {
      if (element.prop('name') === 'foo') {
        expect(element.text()).toBe('FooBar');  
      } else {
        expect(element.text()).toBe('One');
      }
    })
  })

  it('appends rather than replacing content', () => {
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = { showOne: false, showTwo: true }
      }

      render() {
        return (
          <section>
            <GetContent name='test' />
            {this.state.showTwo ? <Test depth={2} append>Two</Test> : null}
            <Test depth={0}>Zero</Test>
            {this.state.showOne ? <Test depth={1}>One</Test> : null}
          </section>
        );
      }
    }

    mountedApp = mount(<App />)
    jest.runAllTimers();
    expect(mountedApp.find(GetContent).text()).toBe('ZeroTwo');
    mountedApp.setState({ showOne: true })
    jest.runAllTimers();
    expect(mountedApp.find(GetContent).text()).toBe('OneTwo');
  })

  it('prepends rather than replacing content', () => {
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = { showOne: false, showTwo: true }
      }

      render() {
        return (
          <section>
            <GetContent name='test' />
            {this.state.showTwo ? <Test depth={2} prepend>Two</Test> : null}
            <Test depth={0}>Zero</Test>
            {this.state.showOne ? <Test depth={1}>One</Test> : null}
          </section>
        );
      }
    }

    mountedApp = mount(<App />)
    jest.runAllTimers();
    expect(mountedApp.find(GetContent).text()).toBe('TwoZero');
    mountedApp.setState({ showOne: true })
    jest.runAllTimers();
    expect(mountedApp.find(GetContent).text()).toBe('TwoOne');
  })

  it('replaces elements in the same depth', () => {
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = { showOne: true, showZero: false }
      }

      render() {
        return (
          <section>
            <GetContent name='test' />
            {this.state.showZero ? <SetContent name='test' depth={0}>Zero</SetContent> : null}
            {this.state.showOne ? <SetContent name='test' depth={0}>One</SetContent> : null}
          </section>
        );
      }
    }

    mountedApp = mount(<App />)
    jest.runAllTimers();
    expect(mountedApp.find(GetContent).text()).toBe('One');
    mountedApp.setState({ showOne: false, showZero: true })
    jest.runAllTimers();
    expect(mountedApp.find(GetContent).text()).toBe('Zero');
  });
});