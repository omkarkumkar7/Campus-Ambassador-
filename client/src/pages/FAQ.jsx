import React from "react";
import FAQAccordion from "../components/FAQAccordion";

export default function FAQ() {
  const items = [
    { title: "What is the role of a Campus Ambassador?", content: "Campus Ambassador will represent Spring Fest, IIT Kharagpur in their colleges. They will be the first point of contact to any student who requires information about Spring Fest. They would promote and motivate students to participate in the events conducted by Spring Fest." },
    { title: "Am I suitable to become a Campus Ambassador?", content: "Campus Ambassador will represent Spring Fest, IIT Kharagpur in their colleges. They will be the first point of contact to any student who requires information about Spring Fest. They would promote and motivate students to participate in the events conducted by Spring Fest." },
    { title: "How can I apply for the post of Campus Ambassador?", content: "Click on Sign Up and register. You will receive an email after successful registration." },
    { title: "How many Campus Ambassadors are usually chosen from a particular college?", content: "One or more campus ambassadors are chosen depending on the size of the college and the number of students who have applied for the position." },
    { title: "How much time do I need to devote once selected?", content: "There is no particular constraint on the number of hours per week that you need to devote. It may vary depending on the number of tasks allotted and how smartly and efficiently you perform it." },
  ];

  return (
    <div id="faq" className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_#0f172a,_#0b0f1a)]">
     

      <main className="relative z-10 flex items-start justify-center py-24 px-6">
        <section className="w-full max-w-4xl p-10 rounded-3xl bg-gradient-to-br from-black/60 via-slate-900/60 to-black/60 border border-white/6 backdrop-blur-lg text-white shadow-2xl">
          <header className="mb-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
            <p className="mt-2 text-sm text-white/70">Answers to common questions about the Campus Ambassador program.</p>
          </header>

          <div className="space-y-4">
            <FAQAccordion items={items} />
          </div>
        </section>
      </main>
    </div>
  );
}
