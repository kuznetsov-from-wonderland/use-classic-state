# # useStateWithCallback React Hook

[![Build Status](https://travis-ci.com/kromsik/use-classic-state.svg?branch=master)](https://travis-ci.org/kromsik/use-classic-state)
![NPM](https://img.shields.io/npm/l/use-classic-state.svg)

## Installation

`npm install use-classic-state`

## The problem

While refactoring old code we don't want to split existing state (which can be complex ☝️) and rewrite it to multiple `useState`

## The solution / Usage

A custom hook with callback fn as a 2nd argument for `setState`, which is available for `setState` only in class components!

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
      <div>👋</div>
      <div onClick={increment}>
        {state.count}
      </div>
    </div>
  )
}
```

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
      <div>👋</div>
      <div onClick={setTo100}>{state.count}</div>
    </div>
  )
}
```
