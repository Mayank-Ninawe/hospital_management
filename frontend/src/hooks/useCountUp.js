import { useState, useEffect, useRef } from 'react';
export function useCountUp(target, duration = 600) {
    const [count, setCount] = useState(0);
    const prevTargetRef = useRef(0);
    useEffect(() => {
        const startValue = prevTargetRef.current;
        const endValue = target;
        if (startValue === endValue)
            return;
        let startTime = null;
        let frame;
        const animate = (timestamp) => {
            if (!startTime)
                startTime = timestamp;
            const progress = timestamp - startTime;
            const percent = Math.min(progress / duration, 1);
            setCount(Math.floor(startValue + (endValue - startValue) * percent));
            if (percent < 1) {
                frame = requestAnimationFrame(animate);
            }
            else {
                prevTargetRef.current = target;
            }
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [target, duration]);
    return count;
}
