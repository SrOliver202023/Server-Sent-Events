import { useEffect, useState } from 'react';

function MyComponent() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5672/sse', { withCredentials: false });

    eventSource.onmessage = (event) => {
      setMessage(event.data);
    };

    eventSource.onerror = (event) => {
      console.log('error', event)
    }

    return () => {
      eventSource.close();
    };
  }, []);


  function handleCreateQueue() {

  }



  return (
    <div className='p-2 rounded-sm sm:max-w-xs m-auto bg-gray-800 mt-5 gap-6 flex flex-col'>

      <div className='flex gap-4 flex-col '>
        <div className='flex gap-2 flex-col font-medium'>
          <label htmlFor="">E-mail</label>
          <input type="text" className='w-full text-gray-500 px-2 py-1' />
        </div>
        <button className='bg-green-500 hover:bg-green-600 rounded-sm font-bold p-1'>
          SALVAR NOME
        </button>
      </div>

      <div>
        <h3 className='font-medium'>Posts</h3>
        <ul className='bg-gray-700 p-1 rounded-sm'>
        </ul>
      </div>

      <div>
        <h3 className='font-medium'>Notificações</h3>
        <ul className='bg-gray-700 p-1 rounded-sm'>
        </ul>
      </div>

    </div>
  );
}

export default MyComponent;