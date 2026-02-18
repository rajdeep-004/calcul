(() => {
  const { useMemo, useState } = React
  const h = React.createElement

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
  ]

  const isOperator = (value) => ['+', '-', '*', '/'].includes(value)

  function App() {
    const [expression, setExpression] = useState('')
    const [result, setResult] = useState('0')

    const display = useMemo(() => (expression.length ? expression : '0'), [expression])

    const appendToken = (token) => {
      if (token === 'C') {
        setExpression('')
        setResult('0')
        return
      }

      if (isOperator(token)) {
        if (!expression.length && token !== '-') return
        const last = expression.at(-1)
        if (isOperator(last)) {
          setExpression((current) => `${current.slice(0, -1)}${token}`)
          return
        }
      }

      if (token === '.') {
        const activeNumber = expression.split(/[+\-*/]/).at(-1)
        if (activeNumber.includes('.')) return
        if (!activeNumber.length) {
          setExpression((current) => `${current}0.`)
          return
        }
      }

      setExpression((current) => `${current}${token}`)
    }

    const calculate = () => {
      if (!expression.length) return
      const last = expression.at(-1)
      if (isOperator(last)) return

      try {
        const computed = Number(Function(`"use strict"; return (${expression})`)())
        if (Number.isFinite(computed)) {
          const normalized = Number(computed.toPrecision(12)).toString()
          setResult(normalized)
          setExpression(normalized)
          return
        }
        setResult('Error')
      } catch {
        setResult('Error')
      }
    }

    return h(
      'main',
      { className: 'layout' },
      h(
        'section',
        { className: 'calculator', 'aria-label': 'calculator' },
        h('h1', null, 'Basic Calculator'),
        h('p', { className: 'subtitle' }, 'Static React app that scales via CDN/edge delivery.'),
        h(
          'div',
          { className: 'screen', role: 'status', 'aria-live': 'polite' },
          h('div', { className: 'expression' }, display),
          h('div', { className: 'result' }, `= ${result}`)
        ),
        h(
          'div',
          { className: 'grid' },
          ...buttons.map((button) =>
            h(
              'button',
              {
                key: button,
                type: 'button',
                className: `key ${isOperator(button) ? 'operator' : ''}`,
                onClick: () => appendToken(button),
              },
              button
            )
          ),
          h(
            'button',
            {
              type: 'button',
              className: 'key equals',
              onClick: calculate,
            },
            '='
          )
        )
      )
    )
  }

  const rootElement = document.getElementById('root')
  ReactDOM.createRoot(rootElement).render(h(App))
})()
