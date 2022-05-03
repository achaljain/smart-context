---
sidebar_position: 7
---

# Performance

Use it in right manner, Context is good enough for most of the applications.

`smart-context` performs as good as React context itself.

For performance test, a todo list app is created in three ways - Vanilla React, Smart-Context, Redux.

[Play with the app](#app).

## Steps to run the test

Run the app under CPU load (e.g. with react profiler open in highlight mode).

- Select app type
- Select input size
- Click generate
- Select performance mode
- Click simulate

## Results

React profiler commit time to toggle 10 random todos.

:::tip

Explore [source code](https://github.com/achaljain/smart-context/tree/master/website/src/perf) and notice, how performance fix is same for Redux and Context.

:::

## App

import PerfApp from '@site/src/perf'

<PerfApp />
