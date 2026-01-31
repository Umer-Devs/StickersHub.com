

import { ReactLenis } from 'lenis/react';

export default function LenisProvider({ children }) {
    return (
        <ReactLenis
            root
            options={{
                duration: 1.2,      // smoothness (1.2 bohot popular hai)
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth ease
                smoothWheel: true,
                smoothTouch: false, // mobile touch pe zyada smooth nahi chahiye aksar
                // normalizeWheel: true, // optional
            }}
        >
            {children}
        </ReactLenis>
    );
}