import { useId } from 'react';

const FestivalWish = ({ className = '' }) => {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className={`festival-wish relative isolate overflow-hidden rounded-2xl border border-orange-200/20 bg-gradient-to-br from-[#35121b] via-[#70251f] to-[#b84b22] p-4 text-white shadow-lg shadow-orange-950/20 sm:p-6 ${className}`}
    >
      <div aria-hidden="true" className="festival-wish-scene pointer-events-none absolute inset-y-0 right-0 w-2/5 overflow-hidden sm:w-1/2">
        <div className="festival-sun absolute right-[18%] top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-100 via-amber-300 to-orange-400 shadow-[0_0_48px_16px_rgba(251,146,60,0.28)] sm:right-[24%] sm:h-28 sm:w-28" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#381a26]/90 via-[#6b2a2a]/55 to-transparent" />
        <div className="festival-water absolute inset-x-0 bottom-0 h-1/3">
          <span className="festival-water-line absolute left-[8%] top-1/4 h-px w-3/4 rounded-full bg-amber-100/60" />
          <span className="festival-water-line festival-water-line-delayed absolute left-[28%] top-1/2 h-px w-1/2 rounded-full bg-orange-100/50" />
          <span className="festival-water-line absolute left-[2%] top-3/4 h-px w-2/3 rounded-full bg-amber-100/40" />
        </div>
        <span className="absolute bottom-3 right-[12%] text-2xl drop-shadow-lg sm:bottom-4 sm:right-[18%] sm:text-3xl">🪔</span>
        <span className="absolute right-[12%] top-4 text-amber-100/70 sm:right-[18%] sm:top-6">✦</span>
        <span className="absolute right-[58%] top-1/4 text-xs text-amber-100/60">✧</span>
      </div>

      <div className="relative z-10 flex min-h-28 items-center gap-3 sm:min-h-36 sm:gap-4">
        <div aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-100/30 bg-white/10 text-2xl shadow-inner backdrop-blur-sm sm:h-16 sm:w-16 sm:text-3xl">
          🙏
        </div>
        <div className="max-w-[72%] sm:max-w-[65%]">
          <div className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-amber-200 sm:text-xs">
            सूर्य उपासना • छठ महापर्व
          </div>
          <h2 id={titleId} className="text-xl font-black tracking-tight sm:text-3xl">
            Happy Chhath Puja!
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-orange-50/90 sm:mt-2 sm:text-sm">
            May the Sun God bless you and your family with happiness, health, and prosperity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FestivalWish;
