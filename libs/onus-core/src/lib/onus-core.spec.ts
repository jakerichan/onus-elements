import { POSITION_APPEND, POSITION_DEFAULT, POSITION_PREPEND } from '../utils'
import { OnusCore } from './onus-core'

describe('OnusCore', () => {
  let core: OnusCore

  beforeEach(() => {
    core = new OnusCore()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('register', () => {
    it('registers an element', () => {
      core.register(
        { name: 'test', children: 'foobar', priority: 1 },
        POSITION_APPEND
      )
      expect(core.getRegistry('test')).toEqual({
        1: { c: 'foobar', l: POSITION_APPEND },
      })
    })
  })
  it('unregister', () => {
    core.register(
      { name: 'test', children: 'foobar', priority: 1 },
      POSITION_APPEND
    )
    core.unregister('test', 1)
    expect(core.getRegistry('test')).toEqual({})
  })

  describe('subscribe', () => {
    it('calls the callback when a new item is registered', () => {
      const subscribeSpy = jest.fn()
      const end = core.subscribe('test', subscribeSpy)
      subscribeSpy.mockClear()
      core.register(
        { name: 'test', children: 'foobar', priority: 1 },
        POSITION_DEFAULT
      )
      expect(subscribeSpy).toHaveBeenCalledTimes(1)
      end()
    })

    it('invokes callback immediately to trigger latest element', () => {
      const subscribeSpy = jest.fn()
      core.register(
        { name: 'test', children: 'foobar', priority: 1 },
        POSITION_DEFAULT
      )
      const end = core.subscribe('test', subscribeSpy)
      expect(subscribeSpy).toHaveBeenCalledTimes(1)
      expect(subscribeSpy).toHaveBeenCalledWith(['foobar'])
      end()
    })

    it('replaces the highest priority item to the callback inside an array', () => {
      const subscribeSpy = jest.fn()
      const end = core.subscribe('test', subscribeSpy)

      core.register(
        { name: 'test', children: 'foobar', priority: 1 },
        POSITION_DEFAULT
      )
      expect(subscribeSpy).toHaveBeenCalledWith(['foobar'])

      core.register(
        { name: 'test', children: 'grand foobar', priority: 2 },
        POSITION_DEFAULT
      )
      expect(subscribeSpy).toHaveBeenCalledWith(['grand foobar'])

      core.register(
        { name: 'test', children: 'zero', priority: 0 },
        POSITION_DEFAULT
      )
      expect(subscribeSpy).toHaveBeenCalledWith(['grand foobar'])
      end()
    })

    it('appends new items to the array passed to the callback', () => {
      const subscribeSpy = jest.fn()
      const end = core.subscribe('test', subscribeSpy)

      core.register(
        { name: 'test', children: 'foobar', priority: 1 },
        POSITION_APPEND
      )
      expect(subscribeSpy).toHaveBeenCalledWith(['foobar'])

      core.register(
        { name: 'test', children: 'grand foobar', priority: 2 },
        POSITION_APPEND
      )
      expect(subscribeSpy).toHaveBeenCalledWith(['foobar', 'grand foobar'])

      core.register(
        { name: 'test', children: 'zero', priority: 0 },
        POSITION_APPEND
      )
      expect(subscribeSpy).toHaveBeenCalledWith([
        'zero',
        'foobar',
        'grand foobar',
      ])
      end()
    })
    it('prepends new items to the array passed to the callback', () => {
      const subscribeSpy = jest.fn()
      const end = core.subscribe('test', subscribeSpy)

      core.register(
        { name: 'test', children: 'foobar', priority: 1 },
        POSITION_PREPEND
      )
      expect(subscribeSpy).toHaveBeenCalledWith(['foobar'])

      core.register(
        { name: 'test', children: 'grand foobar', priority: 2 },
        POSITION_PREPEND
      )
      expect(subscribeSpy).toHaveBeenCalledWith(['grand foobar', 'foobar'])

      core.register(
        { name: 'test', children: 'zero', priority: 0 },
        POSITION_PREPEND
      )
      expect(subscribeSpy).toHaveBeenCalledWith([
        'grand foobar',
        'foobar',
        'zero',
      ])
      end()
    })
    it('default location resets array from that priority forward', () => {
      const subscribeSpy = jest.fn()
      const end = core.subscribe('test', subscribeSpy)

      core.register(
        { name: 'test', children: 'foobar', priority: 1 },
        POSITION_DEFAULT
      )
      expect(subscribeSpy).toHaveBeenCalledWith(['foobar'])

      core.register(
        { name: 'test', children: 'grand foobar', priority: 2 },
        POSITION_APPEND
      )
      expect(subscribeSpy).toHaveBeenCalledWith(['foobar', 'grand foobar'])

      core.register(
        { name: 'test', children: 'zero', priority: 0 },
        POSITION_DEFAULT
      )
      expect(subscribeSpy).toHaveBeenCalledWith(['foobar', 'grand foobar'])
      end()
    })
  })
  it('watch triggers callback for all events', () => {
    const watchSpy = jest.fn()
    const end = core.watch(watchSpy)

    core.register(
      { name: 'test', children: 'foobar', priority: 1 },
      POSITION_DEFAULT
    )
    expect(watchSpy).toHaveBeenCalledWith('test', ['foobar'])

    core.register(
      { name: 'another', children: 12345, priority: 2 },
      POSITION_DEFAULT
    )
    expect(watchSpy).toHaveBeenCalledWith('another', [12345])

    core.register(
      { name: 'another', children: 12, priority: 1 },
      POSITION_DEFAULT
    )
    expect(watchSpy).toHaveBeenCalledWith('another', [12345])
    end()
  })
})
