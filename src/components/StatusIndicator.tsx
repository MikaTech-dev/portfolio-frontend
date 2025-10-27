import { useEffect, useState } from 'react';

interface ApiStatus {
  isOnline: boolean;
  message: string;
}

export default function StatusIndicator() {
  const [status, setStatus] = useState<ApiStatus>({ isOnline: false, message: 'Checking status...' });
  const [showTooltip, setShowTooltip] = useState(false);

  const checkApiStatus = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStatus({
          isOnline: true,
          message: data.message || 'API is online',
        });
      } else {
        throw new Error(`API responded with status: ${response.status}`);
      }
    } catch (error) {
      setStatus({
        isOnline: false,
        message: error instanceof Error ? error.message : 'Failed to connect to API',
      });
    }
  };

  useEffect(() => {
    checkApiStatus();
    // Check status every ${statusUpdate/1000} seconds
    const statusUpdateDelay = import.meta.env.VITE_DELAY
    const statusUpdate = parseInt(statusUpdateDelay, 10)
    const interval = setInterval(checkApiStatus, statusUpdate);
    console.log(`Get request in ${statusUpdate/1000 || 30000} Seconds.`)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div
          className={`w-4 h-4 rounded-full glass-card relative
            ${status.isOnline ? 'bg-green-400' : 'bg-red-400'}
            before:content-[''] before:absolute before:inset-0 
            before:rounded-full before:animate-ping before:duration-1000
            ${status.isOnline ? 'before:bg-green-400/40' : 'before:bg-red-400/40'}
          `}
        />
        
        {showTooltip && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2 glass-card 
            rounded-lg py-2 px-4 min-w-[200px] max-w-[300px] text-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <div 
                className={`w-2 h-2 rounded-full ${
                  status.isOnline ? 'bg-green-400' : 'bg-red-400'
                }`}
              />
              <span className="text-frosted-silver">
                {status.message}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}