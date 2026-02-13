import { useState } from 'react'

function UseState() {

  const [count, setCount] = useState(0)
  const [user, setUser] = useState({
    name: "Umair",
    age: 20
  })

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

      <div className='w-screen h-screen flex flex-col items-center justify-center gap-3'>
        <h2>Name: {user.name}</h2>
        <h2>Age: {user.age}</h2>

        <button className='bg-[#bb3333] text-white p-1 rounded-md' onClick={() => setUser(prev => ({
          ...prev,
          age: prev.age + 1
        }))}>
          Increase age
        </button>

        <button className='bg-[#bb3333] text-white p-1 rounded-md' onClick={() => setUser(prev => ({
          ...prev,
          age: prev.age - 1
        }))}>
          Decrease age
        </button>
      </div>
    </>
  )
}

export default UseState
