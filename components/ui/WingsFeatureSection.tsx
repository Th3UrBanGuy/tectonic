import { cn } from "../../lib/utils";
import { Code, Bot, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { WINGS } from "../../data/wings";

export default function WingsFeatureSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
            {WINGS.map((wing, index) => (
                <WingFeature key={wing.id} wing={wing} index={index} />
            ))}
        </div>
    );
}

const WingFeature = ({
    wing,
    index,
}: {
    wing: typeof WINGS[0];
    index: number;
}) => {
    const Icon = wing.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={cn(
                "flex flex-col lg:border-r py-10 relative group/feature border-slate-200 dark:border-gray-800",
                (index === 0 || index === 4) && "lg:border-l border-slate-200 dark:border-gray-800",
                index < 4 && "lg:border-b border-slate-200 dark:border-gray-800"
            )}
        >
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-slate-100 dark:from-gray-800 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-slate-100 dark:from-gray-800 to-transparent pointer-events-none" />
            )}

            <div className={`mb-4 relative z-10 px-10 ${wing.color}`}>
                <Icon className="w-12 h-12" />
            </div>

            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className={cn(
                    "absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full transition-all duration-200 origin-center",
                    wing.color.replace('text-', 'bg-').replace('600', '300'),
                    `group-hover/feature:${wing.color.replace('text-', 'bg-')}`
                )} />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-slate-900 dark:text-white">
                    {wing.name}
                </span>
            </div>

            <p className="text-xs font-mono text-slate-500 dark:text-gray-500 mb-3 relative z-10 px-10 uppercase tracking-wide">
                {wing.tagline}
            </p>

            <p className="text-sm text-slate-600 dark:text-gray-400 max-w-xs relative z-10 px-10 leading-relaxed mb-6">
                {wing.description}
            </p>

            <div className="relative z-10 px-10 mt-auto">
                <Link
                    to={`/wings?id=${wing.id}`}
                    className={cn(
                        "text-sm font-medium inline-flex items-center gap-2 transition-colors",
                        wing.color,
                        "hover:underline"
                    )}
                >
                    Access Node →
                </Link>
            </div>
        </motion.div>
    );
};
