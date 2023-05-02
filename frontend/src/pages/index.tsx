import { useEffect, useState } from 'react';

function MyComponent() {
  const [messages, setMessages] = useState([] as PubSubPayload[]);
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8000/sse/testes', { withCredentials: false });
    eventSource.onmessage = (event) => setMessages(prev => ([...prev, JSON.parse(event.data)]));
    eventSource.onerror = (event) => console.log('error', event)
    return () => eventSource.close()
  }, []);
  return (
    <div className='p-2 rounded-sm sm:max-w-xs m-auto bg-gray-800 mt-5 gap-6 flex flex-col'>
      <div className='flex gap-2 flex-col'>
        <h3 className='font-medium'>Notificações</h3>
        <ul className=' p-1 rounded-sm flex flex-col gap-2'>
          {messages?.map(message => (
            <li className='bg-gray-700' key={message.id}><a>{message?.payload?.message}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default MyComponent;