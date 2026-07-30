import React from 'react';

export const ProfitMintLogo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {/* Coin Outer Ring with Metallic Gradient */}
      <div className="w-full h-full bg-gradient-to-br from-blue-600 via-sky-500 to-indigo-700 rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(59,130,246,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)] border-2 border-white/10 overflow-hidden group">
        {/* Dynamic Sweep Shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
        
        {/* Currency Symbol with Custom Styling */}
        <div className="relative z-10 font-black text-white leading-none select-none drop-shadow-sm italic" style={{ fontSize: '60%' }}>
          $
        </div>
        
        {/* Embossed Inner Ring */}
        <div className="absolute inset-[3px] rounded-full border-2 border-black/10"></div>
        <div className="absolute inset-[2px] rounded-full border border-white/20"></div>
      </div>
    </div>
  );
};
