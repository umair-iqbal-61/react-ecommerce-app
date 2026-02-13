import { useEffect, useState } from 'react'

function UseEffect() {

  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `Count: ${count}`
  }, [count])

  useEffect(() => {
    console.log('App mounted')
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Tick')
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      <div className='w-screen h-screen flex flex-col items-center justify-center gap-3'>
        <h1>Count: {count}</h1>

        <div className='flex items-center justify-center gap-2'>
          <button className='bg-[#bb3333] text-white p-1 rounded-md' onClick={() => setCount(prev => prev + 1)}>
            Increase
          </button>

          <button className='bg-[#bb3333] text-white p-1 rounded-md' onClick={() => setCount(prev => prev - 1)}>
            Decrease
          </button>

          <button className='bg-[#bb3333] text-white p-1 rounded-md' onClick={() => setCount(0)}>
            Reset
          </button>
        </div>
      </div>
    </>
  )
}

export default UseEffect
