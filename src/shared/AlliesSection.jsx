import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

export const AlliesSection = () => {
    return (
        <div className="mb-16 mt-24 animate-in fade-in duration-700 delay-300">
            <div className="border-b border-slate-200 mb-10">
                <h3 className="text-3xl font-black text-slate-800 inline-block border-b-4 border-cyan-600 pb-3 px-2 -mb-[2px]">
                    Nuestros aliados
                </h3>
            </div>
            <div className="flex items-center justify-between gap-6">
                <button className="p-3 text-cyan-600 hover:bg-cyan-50 rounded-full transition-colors hidden sm:block">
                    <RiArrowLeftSLine className="w-12 h-12" />
                </button>

                <div className="flex-1 flex justify-center items-center gap-6 sm:gap-10 lg:gap-16 flex-wrap sm:flex-nowrap overflow-hidden">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="w-36 h-24 sm:w-56 sm:h-36 lg:w-72 lg:h-48 bg-white rounded-2xl shadow-md border border-slate-100 flex-shrink-0 flex items-center justify-center p-3 sm:p-4 hover:shadow-xl hover:border-cyan-100 transition-all cursor-pointer group">
                            <img
                                src="/health_banner.png"
                                alt={`Aliado ${item}`}
                                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </div>

                <button className="p-3 text-cyan-600 hover:bg-cyan-50 rounded-full transition-colors hidden sm:block">
                    <RiArrowRightSLine className="w-12 h-12" />
                </button>
            </div>
        </div>
    );
};
