/* eslint-disable */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { useClassicState } from '../index'

const initialState = {
  count: 0,
  error: false,
}

const TestComponent1 = () => {
  const [state, setState] = useClassicState(initialState)
  const increment = () => {
    setState(state => ({ ...state, count: state.count + 1 }))
  }
  return (
    <div>
      <div>hi</div>
      <div data-testid="count" onClick={increment}>
        {state.count}
      </div>
    </div>
  )
}

const TestComponent2 = () => {
  const [count, setCount] = useClassicState(0)
  const increment = () => {
    setCount(state => state + 1)
  }
  return (
    <div>
      <div>hi</div>
      <div data-testid="count" onClick={increment}>
        {count}
      </div>
    </div>
  )
}

const TestComponent3 = () => {
  const [count, setCount] = useClassicState(0)
  const increment = () => {
    setCount(1)
  }
  return (
    <div>
      <div>hi</div>
      <div data-testid="count" onClick={increment}>
        {count}
      </div>
    </div>
  )
}

const fnSpy = jest.fn(() => console.log('spy!'))

const TestComponent4 = () => {
  const [state, setState] = useClassicState({
    count: 10,
    error: false,
  })
  const increment = () => {
    setState(state => ({ ...state, count: state.count + 1 }), fnSpy)
  }
  return (
    <div>
      <div>hi</div>
      <div data-testid="count" onClick={increment}>
        {state.count}
      </div>
    </div>
  )
}

const TestComponent5 = () => {
  const [count, setCount] = useClassicState(10)
  const increment = () => {
    setCount(11, fnSpy)
  }
  return (
    <div>
      <div>hi</div>
      <div data-testid="count" onClick={increment}>
        {count}
      </div>
    </div>
  )
}

const TestComponent6 = () => {
  const [state, setState] = useClassicState({
    count: 10,
    error: false,
  })
  const increment = () => {
    setState({ count: 11 }, fnSpy)
  }
  return (
    <div>
      <div>hi</div>
      <div data-testid="count" onClick={increment}>
        {state.count}
        {state.error.toString()}
      </div>
    </div>
  )
}

afterEach(() => {
  fnSpy.mockReset()
})

describe('useClassicState hook', () => {
  test('should render with no error by default', () => {
    const { getByText } = render(<TestComponent1 />)
    getByText(/hi/gi)
    getByText(/0/gi)
  })
  test('should render with no error with initial state', () => {
    const { getByText } = render(<TestComponent1 />)
    const { count } = initialState
    getByText(`${count}`)
  })
  test('should render an updates state', () => {
    const { getByTestId, getByText } = render(<TestComponent2 />)
    const node = getByTestId('count')
    fireEvent.click(node)
    getByText(`1`)
  })
  test('should render an updates state when state is primitive', () => {
    const { getByTestId, getByText } = render(<TestComponent2 />)
    fireEvent.click(getByTestId('count'))
    getByText('1')
  })
  test('should render an updates state when state is primitive', () => {
    const { getByTestId, getByText } = render(<TestComponent3 />)
    fireEvent.click(getByTestId('count'))
    getByText('1')
  })
  test('should render with no error by default with callback', () => {
    const { getByText, getByTestId } = render(<TestComponent4 />)
    getByText(/hi/gi)
    getByText(/10/gi)
    const node = getByTestId('count')
    fireEvent.click(node)
    expect(fnSpy).toHaveBeenCalled()
    expect(fnSpy).toHaveBeenCalledTimes(1)
  })
  test('should render with no error by default with callback', () => {
    const { getByText, getByTestId } = render(<TestComponent5 />)
    getByText(/hi/gi)
    getByText(/10/gi)
    const node = getByTestId('count')
    fireEvent.click(node)
    expect(fnSpy).toHaveBeenCalled()
    expect(fnSpy).toHaveBeenCalledTimes(1)
    getByText(/11/gi)
  })
  test('should render with no error by default with callback and mutable state argument', () => {
    const { getByText, getByTestId } = render(<TestComponent6 />)
    getByText(/hi/gi)
    getByText(/10/gi)
    getByText(/false/gi)
    const node = getByTestId('count')
    fireEvent.click(node)
    expect(fnSpy).toHaveBeenCalled()
    expect(fnSpy).toHaveBeenCalledTimes(1)
    getByText(/11/gi)
    getByText(/false/gi)
  })
})

/* eslint-enable */
