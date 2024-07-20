import React from 'react';
import { motion } from 'framer-motion';

// Define the array of slides with numbers
const slides = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
];

const Motions = () => {
    // Duplicate the slides array to ensure seamless looping
    const duplicatedSlides = [...slides, ...slides];

    return (
        <div className="relative w-full overflow-hidden">
            {/* Wrapping div for seamless looping */}
            <motion.div
                className="flex"
                animate={{
                    x: ['-100%', '0%'],
                    transition: {
                        ease: 'linear',
                        duration: 10,
                        repeat: Infinity,
                    }
                }}
            >
                {/* Render duplicated slides */}
                {duplicatedSlides.map((slide, index) => (
                    <span key={index} className="flex flex-row flex-shrink-0" style={{ width: `${100 / slides.length}%` }}>
                        <span className="flex flex-col items-center justify-center h-full text-6xl">
                            {slide.number}
                        </span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default Motions;
