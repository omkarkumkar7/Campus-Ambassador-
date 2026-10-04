import React from "react";

export default function FAQItem({ title, children, isOpen, onToggle }) {
  return (
    <div className="rounded-lg overflow-hidden border border-white/10 bg-black/10">
      <div className="flex items-stretch">
        {/* left accent */}
        <div className={`w-1 transition-all duration-300 ${isOpen ? 'bg-amber-400' : 'bg-transparent'}`} />

        <div className="flex-1">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-between px-5 py-4 bg-neutral-900 hover:bg-neutral-800 transition"
            aria-expanded={isOpen}
          >
            <span className="text-left font-semibold text-white">{title}</span>
            <span className={`text-white/80 ml-4 text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▾</span>
          </button>

          <div
            className={`text-sm text-white/80 transition-all duration-300 overflow-hidden px-5 ${
              isOpen ? 'max-h-96 pt-3 pb-4 opacity-100' : 'max-h-0 pt-0 pb-0 opacity-0'
            }`}
            aria-hidden={!isOpen}
          >
            <div className="leading-relaxed">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
