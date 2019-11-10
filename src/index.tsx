import React from 'react'

type Fn<S> = (prevState: S) => S
type VoidFn = () => void

const noop: VoidFn = () => {}

function useClassicStateFn<T>(initialState: T) {
  const callback = React.useRef<VoidFn>(noop)
  const reducer = (
    state: T,
    action: { type: string; payload: T | Partial<T> }
  ): T => {
    switch (action.type) {
      case 'UPDATE':
        return { ...state, ...action.payload }
      case 'SET':
        return { ...state, ...action.payload }
      default:
        return state
    }
  }
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    callback.current()
    callback.current = noop
  }, [state])

  const setState = (nextState: Partial<T> | Fn<T>, cb?: VoidFn) => {
    if (typeof nextState === 'function') {
      if (cb) {
        callback.current = cb
      }
      const netxCalculatedState = nextState(state)
      dispatch({ type: 'SET', payload: netxCalculatedState })
    } else {
      if (cb) {
        callback.current = cb
      }
      dispatch({ type: 'UPDATE', payload: nextState })
    }
  }
  return [state, setState]
}

export default useClassicStateFn
