
import React from 'react';
import { Button } from "@/components/ui/button";

interface ControlPanelProps {
  onNavigate?: (planet: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onNavigate }) => {
  return (
    <div className="control-panel fixed bottom-0 left-0 right-0 h-48 z-30 px-4 py-2">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-2">
          <div className="text-blue-400 font-bold">STELLAR VOYAGER</div>
          <div className="text-blue-400">SYSTEM STATUS: <span className="text-green-400">ONLINE</span></div>
          <div className="text-blue-400">VELOCITY: <span className="text-white">1.23c</span></div>
        </div>
        
        {/* Main control grid */}
        <div className="grid grid-cols-6 gap-4 flex-1">
          {/* Left displays */}
          <div className="col-span-1 flex flex-col gap-2">
            <div className="panel-item flex-1">
              <div className="w-full h-full rounded bg-black/50 border border-blue-500/30 flex items-center justify-center">
                <div className="h-16 w-16 border-2 border-t-blue-500 border-r-blue-300/40 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              </div>
            </div>
            <div className="panel-item h-12 text-xs text-blue-300">SYSTEM SCAN</div>
          </div>
          
          {/* Center panel */}
          <div className="col-span-4 flex flex-col gap-2">
            <div className="flex gap-2 flex-1">
              <div className="panel-item flex-1 text-xs text-blue-300 overflow-hidden">
                <div className="h-full w-full flex flex-col">
                  <div className="text-center mb-1 border-b border-blue-500/30 pb-1">NAVIGATION</div>
                  <div className="grid grid-cols-2 gap-2 text-center flex-1">
                    <button onClick={() => onNavigate && onNavigate('earth')} className="bg-blue-600/20 rounded-md p-1 hover:bg-blue-600/50">EARTH</button>
                    <button onClick={() => onNavigate && onNavigate('mars')} className="bg-red-600/20 rounded-md p-1 hover:bg-red-600/50">MARS</button>
                    <button onClick={() => onNavigate && onNavigate('jupiter')} className="bg-orange-600/20 rounded-md p-1 hover:bg-orange-600/50">JUPITER</button>
                    <button onClick={() => onNavigate && onNavigate('saturn')} className="bg-yellow-600/20 rounded-md p-1 hover:bg-yellow-600/50">SATURN</button>
                  </div>
                </div>
              </div>
              <div className="panel-item flex-1">
                <div className="h-full w-full flex flex-col text-xs text-blue-300">
                  <div className="text-center border-b border-blue-500/30 pb-1">SYSTEM METRICS</div>
                  <div className="flex-1 flex flex-col justify-around">
                    <div className="flex items-center justify-between">
                      <span>LIFE SUPPORT</span>
                      <div className="bg-black/50 h-2 w-20 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full w-3/4"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>FUEL</span>
                      <div className="bg-black/50 h-2 w-20 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>SHIELDS</span>
                      <div className="bg-black/50 h-2 w-20 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 h-12">
              <div className="panel-item flex-grow flex gap-2 justify-between px-4">
                <Button variant="outline" size="sm" className="text-xs border-blue-400/50 text-blue-400 hover:text-blue-200">SCAN</Button>
                <Button variant="outline" size="sm" className="text-xs border-blue-400/50 text-blue-400 hover:text-blue-200">DOCK</Button>
                <Button variant="outline" size="sm" className="text-xs border-green-400/50 text-green-400 hover:text-green-200">COM</Button>
                <Button variant="outline" size="sm" className="text-xs border-red-400/50 text-red-400 hover:text-red-200">ALERT</Button>
              </div>
              <div className="panel-item w-32">
                <div className="text-center text-blue-400 text-xs">WARP DRIVE</div>
                <div className="h-1.5 w-full bg-black/50 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-blue-500 w-3/4 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right displays */}
          <div className="col-span-1 flex flex-col gap-2">
            <div className="panel-item flex-1">
              <div className="w-full h-full rounded bg-black/50 border border-blue-500/30 p-1">
                <div className="w-full h-full flex flex-col justify-between text-[10px] text-blue-300">
                  <div>T+04:23:15</div>
                  <div>LAT: 34.2812° N</div>
                  <div>LON: 118.4451° W</div>
                  <div>ALT: 408 KM</div>
                  <div>VEL: 27,800 KM/H</div>
                </div>
              </div>
            </div>
            <div className="panel-item h-12 text-xs text-blue-300 flex items-center justify-center">
              <div className="text-center animate-pulse">MISSION ACTIVE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
