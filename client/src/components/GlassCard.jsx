// import React from "react";

// function GlassCard({ icon, children }) {
//             return (
//                 <div className="panel-style p-6 text-center text-white transition-all duration-300 hover:bg-gray-800/80 cursor-pointer h-full">
//                     <div className="text-4xl mb-3">{icon}</div>
//                     <div className="font-semibold">{children}</div>
//                 </div>
//             );
//         }

// export default GlassCard;
import React from "react";

function GlassCard({ icon, children }) {
            return (
                <div className="panel-style p-6 text-center text-white transition-all duration-300 hover:bg-gray-800/80 cursor-pointer h-full">
                    <div className="text-4xl mb-3">{icon}</div>
                    <div className="font-semibold">{children}</div>
                </div>
            );
        }


export default GlassCard;

