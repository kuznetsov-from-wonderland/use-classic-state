import React from 'react'

const noop = () => {}

function useClassicState(initialState) {
  const callback = React.useRef(noop)
  const reducer = (state, action) => {
    const { type, payload } = action
    if (type === 'UPDATE') {
      return typeof payload === 'object' ? { ...state, ...payload } : payload
    }
    return typeof payload === 'object' ? { ...payload } : payload
  }
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    callback.current()
    callback.current = noop
  }, [state])

  const setState = (nextState, cb) => {
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

export { useClassicState }
