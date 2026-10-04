import { useEffect } from "react";
import { Package, Gift, Medal, Trophy, Briefcase, Ticket } from "lucide-react";
import perksBg from "../assets/perksBg.webp";

function Perks() {
  const perks = [
    {
      icon: <Package className="w-8 h-8" />,
      title: "Exclusive Merchandise",
      text: "Get your hands on limited edition Springfest merch that you can’t buy anywhere else!"
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Premium Goodies",
      text: "Receive surprise goodie bags packed with awesome items throughout your journey."
    },
    {
      icon: <Medal className="w-8 h-8" />,
      title: "Exciting Rewards",
      text: "Earn points and unlock exclusive rewards based on your performance and engagement."
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Cash Prizes",
      text: "Top performers get rewarded with attractive cash prizes. The more you do, the more you earn!"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Internships",
      text: "Stand out and get priority consideration for internships with our partner organizations."
    },
    {
      icon: <Ticket className="w-8 h-8" />,
      title: "Free Night Pass",
      text: "Enjoy VIP access with a complimentary night pass to experience Springfest like never before!"
    }
  ];

  // 🌠 ANIMATION INTERSECTION OBSERVER
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay');
            setTimeout(() => {
              entry.target.classList.remove('opacity-0', 'translate-y-12');
              entry.target.classList.add('opacity-100', 'translate-y-0');
            }, delay || 0);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.perk-animate').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="perks"
      className="w-full relative min-h-screen flex items-center justify-center py-24 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url(${perksBg})`,
      }}
    >
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Decorative blurry blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 z-0" />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20 scroll-mt-24">
          <h1 className="font-jaro text-5xl md:text-7xl text-white mb-6 tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            What You’ll Get
          </h1>
          <p className="inline-block px-8 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-lg md:text-xl text-gray-200 shadow-xl">
            Being an ambassador comes with incredible perks and opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {perks.map((perk, i) => (
            <div
              key={i}
              data-delay={i * 100}
              className="perk-animate opacity-0 translate-y-12 transition-all duration-700 ease-out group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/[0.08] hover:border-cyan-400/30 flex flex-col items-center text-center h-full transform hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.3)]"
            >
              <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-out">
                <div className="text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                  {perk.icon}
                </div>
              </div>
              <h2 className="font-jaro text-3xl text-white mb-4 tracking-wide group-hover:text-cyan-300 transition-colors duration-300">
                {perk.title}
              </h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {perk.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Perks;