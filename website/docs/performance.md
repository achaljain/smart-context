---
sidebar_position: 7
---

# Performance

Smart-Context is equivalent to React context.

There is a common opinion that context is not suitable for big applications. [Play with the sample app](#app) to find out.

**Context is good enough for most of the applications, if used in the right manner.**

## Steps to run the test

For performance test, a todo list app is created in three ways - Vanilla React, Smart-Context, Redux.

Run the app with CPU throttling.

- Select App type
- Select Input size
- Select Performance mode
- Click Run test

## Results

When test run completes, you will see the time to toggle 10 random todos(recorded via web performance API).

It is interesting to note that Redux and Context API show similar performance. The fix to improve performance lies in React memo. It is not specific to the state management solution used.

:::tip

Explore [source code](https://github.com/achaljain/smart-context/tree/master/website/src/perf) and notice, how performance fix is same for Redux and Context.

:::

## App

import PerfApp from '@site/src/perf'

<PerfApp />
