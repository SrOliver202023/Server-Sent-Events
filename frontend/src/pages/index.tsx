import { useEffect, useState } from 'react';

function MyComponent() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3000/sse', { withCredentials: false });

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


  return (
    <div>
      <h1>Eventos</h1>
      <span>{message}</span>
    </div>
  );
}

export default MyComponent;