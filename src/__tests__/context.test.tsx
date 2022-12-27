import React, { useContext } from 'react'
import { fireEvent, render } from '@testing-library/react'

import { WithContextProvider, WithContextConsumer, getContext } from '../index'

const config1 = {
  initialState: { dummy1: '' },
  actionsConfig: {
    setDummy1: ['dummy1', 'dummy2'],
    invalidAction: [null],
    reset: () => () => {},
  },
  displayName: 'testCtx1',
  debug: false,
}

const config2 = {
  initialState: { dummy2: '' },
  actionsConfig: {
    setDummy2: (str) => (state) => ({ ...state, dummy2: str }),
    extraParams: ['dummy'],
    errorAction: () => () => {
      throw new Error('error action')
    },
    invalidAction: () => 'dummy',
  },
  displayName: 'testCtx2',
  debug: true,
}
// eslint-disable-next-line
const FunctionComp = () => {
  const {
    state: { dummy1 },
    actions: { setDummy1 },
  } = useContext(getContext('testCtx1'))

  const fireAction = () => {
    setDummy1({ dummy1: 'func comp', extraProp: 'val' })
  }

  return (
    <div data-testid="comp1">
      <span>{`Context: ${dummy1}`}</span>
      <button type="button" onClick={fireAction}>
        dispatch
      </button>
    </div>
  )
}

type ClsProps = {
  testCtx2: { state: any; actions: any }
}

class ClassComp extends React.Component<ClsProps> {
  constructor(props) {
    super(props)
    this.fireAction = this.fireAction.bind(this)
  }

  fireAction(e) {
    const { id } = e.target
    const {
      testCtx2: { actions },
    } = this.props
    if (id === 'default') {
      actions.setDummy2('class comp')
    } else if (id === 'invalid') {
      actions.extraParams('class comp')
      actions.invalidAction()
    } else if (id === 'error') {
      actions.errorAction('abc')
    } else {
      actions.reset()
    }
  }

  render() {
    const {
      testCtx2: { state },
    } = this.props
    return (
      <div data-testid="comp2">
        <span>{`Context: ${state.dummy2}`}</span>
        <button type="button" id="default" onClick={this.fireAction}>
          dispatch
        </button>
        <button type="button" id="invalid" onClick={this.fireAction}>
          dispatch
        </button>
        <button type="button" id="error" onClick={this.fireAction}>
          dispatch
        </button>
        <button type="button" id="reset" onClick={this.fireAction}>
          dispatch
        </button>
      </div>
    )
  }
}

describe('Context wrapper', () => {
  let Component

  // eslint-disable-next-line
  const App = ({ children }) => <div id="app">{children}</div>

  const WithContext = WithContextProvider(App, [config1, config2])

  const ClassCompWithContext = WithContextConsumer(ClassComp, ['testCtx2'])

  beforeEach(() => {
    Component = render(
      <WithContext>
        <FunctionComp />
        <ClassCompWithContext />
      </WithContext>
    )
  })

  it('should render properly and dispatch action for class and function component', async () => {
    expect(Component.getByTestId('comp1')).toBeTruthy()
    expect(Component.getByTestId('comp2')).toBeTruthy()

    const btn = Component.getAllByRole('button')

    fireEvent.click(btn[0])
    fireEvent.click(btn[1])
    /** Simulate invalid, error actions. Just for coverage ;) */
    fireEvent.click(btn[2])
    fireEvent.click(btn[3])

    Component.rerender(
      <WithContext>
        <FunctionComp />
        <ClassCompWithContext />
      </WithContext>
    )

    const elem1 = await Component.findByText(/func comp/gi)
    const elem2 = await Component.findByText(/class comp/gi)

    expect(elem1).toBeTruthy()
    expect(elem2).toBeTruthy()

    fireEvent.click(btn[4])
    Component.rerender(
      <WithContext>
        <FunctionComp />
        <ClassCompWithContext />
      </WithContext>
    )

    const elem3 = Component.queryAllByText(/class comp/gi)
    expect(elem3.length).toBeFalsy()
  })

  it('should throw error for invalid config in provider', () => {
    try {
      // @ts-ignore
      WithContextProvider(App, [{}])
    } catch (error) {
      expect(error).toBeTruthy() // eslint-disable-line
    }
  })

  it('should throw error for invalid config in consumer', () => {
    try {
      WithContextConsumer(App, [])
    } catch (error) {
      expect(error).toBeTruthy() // eslint-disable-line
    }
  })

  it('should use existing provider', () => {
    const WithContextDup = WithContextProvider(App, [
      config1,
      {
        displayName: 'testCtx1',
        initialState: {},
        actionsConfig: {},
        debug: false,
      },
    ])
    expect(WithContextDup).toBeTruthy()
  })
})
