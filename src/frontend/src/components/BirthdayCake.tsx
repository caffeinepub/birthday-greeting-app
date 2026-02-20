interface BirthdayCakeProps {
  isLit: boolean;
}

export default function BirthdayCake({ isLit }: BirthdayCakeProps) {
  return (
    <div className="relative inline-block">
      <div className="relative">
        <img
          src="/assets/generated/birthday-cake.dim_800x600.png"
          alt="Birthday Cake"
          className="w-full max-w-2xl h-auto drop-shadow-2xl"
        />
        
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 flex gap-4">
          {[0, 1, 2].map((index) => (
            <div key={index} className="relative" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Candle wrapper with themed styling */}
              <div className="relative w-12 h-24 md:w-16 md:h-32">
                {/* Candle body with festive colors */}
                <div 
                  className={`absolute inset-0 rounded-t-lg transition-all duration-500 ${
                    isLit 
                      ? 'bg-candle-body shadow-lg' 
                      : 'bg-candle-extinguished shadow-md opacity-80'
                  }`}
                  style={{
                    background: isLit 
                      ? `linear-gradient(to right, oklch(var(--candle-body-shadow)), oklch(var(--candle-body)), oklch(var(--candle-highlight)))`
                      : `oklch(var(--candle-extinguished))`
                  }}
                >
                  {/* Decorative stripes */}
                  <div className="absolute top-[20%] left-0 right-0 h-[3px] bg-candle-highlight opacity-40"></div>
                  <div className="absolute top-[40%] left-0 right-0 h-[3px] bg-candle-highlight opacity-40"></div>
                  <div className="absolute top-[60%] left-0 right-0 h-[3px] bg-candle-highlight opacity-40"></div>
                </div>
                
                {/* Wick */}
                <div 
                  className={`absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-candle-wick rounded-sm transition-all duration-500 ${
                    isLit ? 'opacity-100' : 'opacity-60'
                  }`}
                ></div>
                
                {/* Wax drip effect when lit */}
                {isLit && (
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-4 bg-candle-wax-drip rounded-full opacity-60"
                    style={{
                      clipPath: 'polygon(50% 0%, 30% 100%, 70% 100%)'
                    }}
                  ></div>
                )}
              </div>
              
              {/* Flame with harmonized colors */}
              {isLit && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-6 flame-flicker">
                  <div 
                    className="w-full h-full rounded-full blur-sm animate-flame"
                    style={{
                      background: `linear-gradient(to top, oklch(var(--party-flame-base)), oklch(var(--party-flame-mid)), oklch(var(--party-flame-tip)))`
                    }}
                  ></div>
                  {/* Inner flame glow */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-full blur-md opacity-70 animate-flame"
                    style={{
                      background: `radial-gradient(circle, oklch(var(--party-flame-tip)), transparent)`,
                      animationDelay: '0.05s'
                    }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
