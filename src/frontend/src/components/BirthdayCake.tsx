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
            <div
              key={index}
              className="relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={
                  isLit
                    ? "/assets/generated/candle-lit.dim_64x128.png"
                    : "/assets/generated/candle-out.dim_64x128.png"
                }
                alt={isLit ? "Lit Candle" : "Extinguished Candle"}
                className={`w-12 h-24 md:w-16 md:h-32 transition-all duration-500 ${
                  isLit ? "scale-100" : "scale-95 opacity-80"
                }`}
              />
              {isLit && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-6 flame-flicker">
                  <div className="w-full h-full bg-gradient-to-t from-party-flame-base via-party-flame-mid to-party-flame-tip rounded-full blur-sm animate-flame" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
