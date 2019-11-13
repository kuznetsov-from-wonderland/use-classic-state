[![Build Status](https://travis-ci.com/kromsik/use-classic-state.svg?branch=master)](https://travis-ci.org/kromsik/use-classic-state)
[![Coverage Status](https://coveralls.io/repos/github/kromsik/use-classic-state/badge.svg?branch=master)](https://coveralls.io/github/kromsik/use-classic-state?branch=master)
![NPM](https://img.shields.io/npm/l/use-classic-state.svg)

## Installation

`npm install use-classic-state`

## The problem

While refactoring old code we don't want to split existing state (which can be complex ☝️) and rewrite it to multiple `useState`

## The solution / Usage

A **well tested** custom hook with callback `fn` as a 2nd argument for `setState`, which is available for `setState` only in class components!

### Basic Example

```js
import React from 'react'

import { useClassicState } from 'use-classic-state'

const App = () => {
  const [state, setState] = useClassicState({
    count: 10,
    error: false,
  })
  const increment = () => {
    setState(state => ({ ...state, count: state.count + 1 }))
  }
  return (
    <div>
      <div>👋</div>
      <div onClick={increment}>{state.count}</div>
    </div>
  )
}
```

### Example with callback

> 🆘🚨⚡️☝️

> Important note - it is recommended that your callback `fn` is void function

> In most cases you want this to do some `closeModal` of `notification` things.

> The worst case - you want to **read** already updated state here, but this is not recommended, instead do this with `useUffect`

```js
import React from 'react';

import { useClassicState } from 'use-classic-state';

const App = () => {
  const [state, setState] = useClassicState({
    count: 10,
    error: false,
  })
  const increment = () => {
    setState(state => ({ ...state, count: state.count + 1 }), () => console.log('done')))
  }
  return (
    <div>
      <div onClick={increment}>👋</div>
      <div>
        {state.count} // 10 -> 11 after `setState`
      </div>
      <div>
        {state.error} // false
      </div>
    </div>
  )
}
```

### Example with Partial state (will be merged with prevState)

```js
import React from 'react'

import { useClassicState } from 'use-classic-state'

const App = () => {
  const [state, setState] = useClassicState({
    count: 10,
    error: false,
  })
  const setTo100 = () => {
    setState({ count: 100 })
  }
  return (
    <div>
      <div onClick={setTo100}>👋</div>
      // 10 -> 100 after `setState`
      <div>{state.count}</div>
      // false
      <div>{state.error}</div>
    </div>
  )
}
```
