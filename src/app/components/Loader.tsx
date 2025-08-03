'use client';

import {motion} from 'framer-motion';

const AirLoader=()=> {
    return (
        <div className="flex items-center justify-center h-48 w-48">
            <div className="relative w-20 h-20">
                {[0, 0.3, 0.6].map((delay, i) => (
                    <motion.span
                        key={i}
                        className="absolute top-0 left-0 w-full h-full rounded-full border border-blue-400"
                        variants={{
                            animate: {
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.5, 1],
                                transition: {
                                    duration: 1.5,
                                    ease: 'easeInOut',
                                    repeat: Infinity,
                                    delay,
                                },
                            },
                        }}
                        animate="animate"
                    />
                ))}
                <span
                    className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500"></span>
            </div>
        </div>
    );
}

export default AirLoader
