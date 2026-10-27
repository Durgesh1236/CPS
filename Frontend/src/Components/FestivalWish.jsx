import { useId } from 'react';

const FestivalWish = ({ className = '' }) => {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className={`relative isolate overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-r from-[#7c2d12] via-[#c2410c] to-[#f59e0b] p-4 text-white shadow-lg shadow-orange-900/15 sm:p-5 ${className}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-5 -top-8 text-7xl opacity-20 sm:right-6 sm:top-1 sm:text-8xl">
        🪔
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-8 right-16 text-6xl opacity-15 sm:right-32">
        ✨
      </div>
      <div className="relative flex items-start gap-3 sm:items-center sm:gap-4">
        <div aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-2xl shadow-inner sm:h-14 sm:w-14 sm:text-3xl">
          🪔
        </div>
        <div className="min-w-0">
          <div className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-amber-100 sm:text-xs">
            Festival wishes
          </div>
          <h2 id={titleId} className="text-xl font-black tracking-tight sm:text-2xl">
            Happy Diwali!
          </h2>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-amber-50 sm:text-sm">
            May the festival of lights bring joy, peace, and prosperity to you and your family.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FestivalWish;
