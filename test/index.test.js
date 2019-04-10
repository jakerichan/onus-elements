import React from 'react';
import { mount } from 'enzyme';
import { GetElement, SetElement } from '../index';
import { subscribe } from '../registry'

// Since we use the setTimeout in the GetElement onChange function,
// we can use fake timers and finish updating with SetElement when ready
jest.useFakeTimers();
let mountedApp
let noop = () => {};

const Test = ({ children, ...props }) => (
  <SetElement name='test' {...props}>
    <heading>{children}</heading>
  </SetElement>
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

describe('GetElement / SetElement', () => {
  afterEach(() => {
    if (mountedApp) mountedApp.unmount();
  })

  it('inserts children of SetElement into GetElement', () => {
    mountedApp = mount(
      <section>
        <article className='set-element'>
        <Test priority={0}>Test</Test>
        </article>
        <article className='get-element'>
          <GetElement name='test' />
        </article>
      </section>
    )
    jest.runAllTimers();
    expect(mountedApp.find(GetElement).text()).toBe('Test');
  });

  it('uses biggest priority value regardless of order', () => {
    mountedApp = mount(
      <section>
        <article className='get-element'>
          <GetElement name='test' />
        </article>
        <Test priority={2}>Two</Test>
        <Test priority={3}>Three</Test>
        <Test priority={0}>Zero</Test>
        <Test priority={1}>One</Test>
      </section>
    )
    jest.runAllTimers();
    expect(mountedApp.find(GetElement).text()).toBe('Three');
  });

  it('renders next lower priority when the highest unmounts', () => {
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = { showOne: true }
      }

      render() {
        return (
          <section>
            <GetElement name='test' />
            <Test priority={0}>Zero</Test>
            {this.state.showOne ? <Test priority={1}>One</Test> : null}
          </section>
        );
      }
    }

    mountedApp = mount(<App />)
    jest.runAllTimers();
    expect(mountedApp.find(GetElement).text()).toBe('One');
    mountedApp.setState({ showOne: false })
    jest.runAllTimers();
    expect(mountedApp.find(GetElement).text()).toBe('Zero');
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
            <GetElement name='test' />
            {this.state.showTwo ? <Test priority={2}>Two</Test> : null}
            <Test priority={0}>Zero</Test>
            {this.state.showOne ? <Test priority={1}>One</Test> : null}
          </section>
        );
      }
    }

    mountedApp = mount(<App />)
    jest.runAllTimers();
    expect(mountedApp.find(GetElement).text()).toBe('Zero');
    mountedApp.setState({ showOne: true })
    jest.runAllTimers();
    expect(mountedApp.find(GetElement).text()).toBe('One');
    mountedApp.setState({ showTwo: true })
    jest.runAllTimers();
    expect(mountedApp.find(GetElement).text()).toBe('Two');
  });

  it('renders multiple GetElement components', () => {
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = { showOne: false, showTwo: false }
      }

      render() {
        return (
          <section>
            <div className="first">
              <GetElement name='test' />
            </div>
            <Test priority={0}>Zero</Test>
            <Test priority={1}>One</Test>
            <div className="second">
              <GetElement name='test' />
            </div>
          </section>
        );
      }
    }

    mountedApp = mount(<App />)
    jest.runAllTimers();
    mountedApp.find(GetElement).forEach((element) => {
      expect(element.text()).toBe('One');
    })
  })

  it('renders correct element when using multiple SetElement names', () => {
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = { showOne: false, showTwo: false }
      }

      render() {
        return (
          <section>
            <GetElement name='test' />
            <GetElement name='foo' />
            <Test priority={0}>Zero</Test>
            <Test priority={1}>One</Test>
            <SetElement name='foo' priority={2}>
              <span>FooBar</span>
            </SetElement>
          </section>
        );
      }
    }

    mountedApp = mount(<App />)
    jest.runAllTimers();
    mountedApp.find(GetElement).forEach((element) => {
      if (element.prop('name') === 'foo') {
        expect(element.text()).toBe('FooBar');  
      } else {
        expect(element.text()).toBe('One');
      }
    })
  })

  it('appends rather than replacing element', () => {
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = { showOne: false, showTwo: true }
      }

      render() {
        return (
          <section>
            <GetElement name='test' />
            {this.state.showTwo ? <Test priority={2} append>Two</Test> : null}
            <Test priority={0}>Zero</Test>
            {this.state.showOne ? <Test priority={1}>One</Test> : null}
          </section>
        );
      }
    }

    mountedApp = mount(<App />)
    jest.runAllTimers();
    expect(mountedApp.find(GetElement).text()).toBe('ZeroTwo');
    mountedApp.setState({ showOne: true })
    jest.runAllTimers();
    expect(mountedApp.find(GetElement).text()).toBe('OneTwo');
  })

  it('prepends rather than replacing element', () => {
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = { showOne: false, showTwo: true }
      }

      render() {
        return (
          <section>
            <GetElement name='test' />
            {this.state.showTwo ? <Test priority={2} prepend>Two</Test> : null}
            <Test priority={0}>Zero</Test>
            {this.state.showOne ? <Test priority={1}>One</Test> : null}
          </section>
        );
      }
    }

    mountedApp = mount(<App />)
    jest.runAllTimers();
    expect(mountedApp.find(GetElement).text()).toBe('TwoZero');
    mountedApp.setState({ showOne: true })
    jest.runAllTimers();
    expect(mountedApp.find(GetElement).text()).toBe('TwoOne');
  })

  it('replaces children in the same priority', () => {
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = { showOne: true, showZero: false }
      }

      render() {
        return (
          <section>
            <GetElement name='test' />
            {this.state.showZero ? <SetElement name='test' priority={0}>Zero</SetElement> : null}
            {this.state.showOne ? <SetElement name='test' priority={0}>One</SetElement> : null}
          </section>
        );
      }
    }

    mountedApp = mount(<App />)
    jest.runAllTimers();
    expect(mountedApp.find(GetElement).text()).toBe('One');
    mountedApp.setState({ showOne: false, showZero: true })
    jest.runAllTimers();
    expect(mountedApp.find(GetElement).text()).toBe('Zero');
  });

  it('sets previous priority element with additional props using withProps', () => {
    class App extends React.Component {

      render() {
        return (
          <section>
            <GetElement name='withPropsTest' />
            <SetElement name='withPropsTest' priority={0}><span id='target'>Zero</span></SetElement>
            <SetElement name='withPropsTest' priority={1} withProps={{ className: 'bar'}} />
          </section>
        );
      }
    }

    mountedApp = mount(<App />)
    jest.runAllTimers();
    expect(mountedApp.find(GetElement).text()).toBe('Zero');
    // jest.runAllTimers();
    expect(mountedApp.find(GetElement).html()).toBe('<span id="target" class="bar">Zero</span>')
  })

  it('sets previous priority component with additional props using withProps', () => {
    const Label = (props) => <span {...props} id="target">Zero</span>
    class App extends React.Component {

      render() {
        return (
          <section>
            <GetElement name='withPropsTest' />
            <SetElement name='withPropsTest' priority={0}><Label /></SetElement>
            <SetElement name='withPropsTest' priority={1} withProps={{ className: 'bar'}} />
          </section>
        );
      }
    }

    mountedApp = mount(<App />)
    jest.runAllTimers();
    expect(mountedApp.find(GetElement).text()).toBe('Zero');
    expect(mountedApp.find(GetElement).html()).toBe('<span id="target" class="bar">Zero</span>')
  })

  it('maintains order using withProps', () => {
    class App extends React.Component {
      state = {
        showTwo: false
      }
      render() {
        const { showTwo } = this.state;
        return (
          <section>
            <GetElement name='withPropsTest' />
            <SetElement name='withPropsTest' priority={0}><span id="target">Zero</span></SetElement>
            <SetElement name='withPropsTest' priority={1} withProps={{ className: 'bar'}} />
            {showTwo && <SetElement name='withPropsTest' priority={2}><span id="target">Two</span></SetElement>}
          </section>
        );
      }
    }

    mountedApp = mount(<App />)
    jest.runAllTimers();
    expect(mountedApp.find(GetElement).html()).toBe('<span id="target" class="bar">Zero</span>')
    mountedApp.setState({ showTwo: true })
    jest.runAllTimers();
    expect(mountedApp.find(GetElement).html()).toBe('<span id="target">Two</span>')
  })
});