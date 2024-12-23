'use client'
import React, { useRef, useEffect } from 'react';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';

export default function Counter({ from, to }) {
    const counter = useMotionValue(from);
    const roundedCounter = useTransform(counter, (latest) => Math.round(latest));
    const ref = useRef(null);
    const isInView = useInView(ref);

    useEffect(() => {
        if (isInView) {
            animate(counter, to, { duration: 3 });
        }
    }, [counter, to, isInView]);

    return (
        <motion.span ref={ref}>{roundedCounter}</motion.span>
    );
} 