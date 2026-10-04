import React, { useState } from "react";
import FAQItem from "./FAQItem";

export default function FAQAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <FAQItem
          key={i}
          title={it.title}
          isOpen={openIndex === i}
          onToggle={() => toggle(i)}
        >
          {it.content}
        </FAQItem>
      ))}
    </div>
  );
}
