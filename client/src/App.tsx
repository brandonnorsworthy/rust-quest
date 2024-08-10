import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <header className='bg-red-400'>
        <h3 className='text-red-500'>
          Welcome to the resurected rust app
        </h3>
      </header>
      <main>
        <h1>Counter</h1>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
      </main>
    </div>
  )
}

export default App
