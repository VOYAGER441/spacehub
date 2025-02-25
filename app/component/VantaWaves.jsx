"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import WAVE from "vanta/dist/vanta.waves.min";

function VantaWaves() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      const effect = WAVE({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x0,
        shininess: 70.0,
        waveHeight: 21.0,
        waveSpeed: 1.35,
      });

      console.log("Vanta Effect Initialized:", effect); // 🔍 Check console

      setVantaEffect(effect);
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}

export default VantaWaves;
