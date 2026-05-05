import { RiDoubleQuotesL } from '@remixicon/react';

export const TestimonialCard = ({ name, text }) => {
    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:border-cyan-100 transition-all duration-300 relative group flex flex-col h-full">
            <div className="absolute top-6 left-6 text-cyan-100 group-hover:text-cyan-200 transition-colors">
                <RiDoubleQuotesL className="w-12 h-12" />
            </div>
            <div className="pt-8 flex-grow">
                <p className="text-slate-600 italic leading-relaxed text-lg mb-6 relative z-10">
                    "{text}"
                </p>
            </div>
            <div className="mt-auto border-t border-slate-100 pt-4">
                <p className="font-bold text-slate-900 text-lg">
                    {name}
                </p>
                <p className="text-sm text-cyan-600 font-medium">Cliente verificado</p>
            </div>
        </div>
    );
};
