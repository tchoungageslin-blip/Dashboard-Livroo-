import React, { useState, useEffect } from 'react';
import { Pause, Play, Square, RotateCcw } from 'lucide-react';

const TimeTracker: React.FC = () => {
  const [time, setTime] = useState(5048); // Start at 01:24:08 for demo
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number | null = null;
    if (isActive) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const stopTimer = () => {
    setIsActive(false);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setTime(0);
  };

  const formatTime = (seconds: number) => {
    const getSeconds = `0${(seconds % 60)}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <div className="rounded-[32px] p-8 h-full flex flex-col justify-between relative overflow-hidden bg-[#052e16]">
      {/* Background ripples */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-emerald-800/30 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] border border-emerald-800/40 rounded-full"></div>
      
      <div className="relative z-10 flex justify-between items-start">
        <h3 className="text-emerald-100/70 text-sm font-medium mb-1">Shift Timer</h3>
        <button onClick={resetTimer} className="text-emerald-500 hover:text-emerald-300 transition-colors">
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="text-white text-4xl font-mono font-bold tracking-widest mb-6 tabular-nums">
          {formatTime(time)}
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTimer}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-900 hover:bg-gray-100 transition-colors shadow-lg"
          >
            {isActive ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>
          
          <button 
            onClick={stopTimer}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all shadow-lg ${isActive ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30' : 'bg-white/10 hover:bg-white/20'}`}
          >
            <Square size={18} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;