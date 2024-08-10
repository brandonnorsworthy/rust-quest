import testRequestService from "@/service/testRequestService";
import { useState } from "react";

const LandingPage = () => {
  const [count, setCount] = useState(0);
  const [response, setResponse] = useState('');

  const test = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const testResponse: any = await testRequestService.testGetRequest();
    setResponse(testResponse);
  }
  return (
    <div>
      <header className='flex justify-between p-4 text-3xl text-white bg-slate-600'>
        <h1 className=''>
          Welcome to the resurected rust app
        </h1>
        <button className='px-4 py-2 font-bold text-white transition-colors rounded bg-slate-500 hover:bg-slate-700'>
          Login
        </button>
      </header>
      <main className="">
        <h1>Counter</h1>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>

        <button onClick={test}>Test</button>
        <p>{response}</p>
      </main>
    </div>
  );
}

export default LandingPage;