'use client';

import { Suspense, lazy, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

// Lazy load the 3D scene for performance
const Scene3D = lazy(() => 
  import('./Scene3D').then(module => ({ default: module.Scene3D }))
);

interface ThreeBackgroundProps {
  enabled?: boolean;
}

export function ThreeBackground({ enabled = true }: ThreeBackgroundProps) {
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setIsWebGLSupported(false);
      }
    } catch (e) {
      setIsWebGLSupported(false);
    }
  }, []);

  // Don't render on server or if disabled
  if (!mounted || !enabled || !isWebGLSupported) {
    return <StaticBackground />;
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Suspense fallback={<StaticBackground />}>
        <Canvas
          camera={{ position: [0, 0, 20], fov: 50 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance'
          }}
          dpr={[1, 2]} // Device pixel ratio for retina displays
          className="w-full h-full"
        >
          <Scene3D />
        </Canvas>
      </Suspense>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-900/30 to-dark-900/50 pointer-events-none" />
    </div>
  );
}

// Static fallback background for SSR and WebGL unsupported devices
function StaticBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-dark-900">
      {/* Animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 animate-pulse-slow" />
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(11, 96, 255, 0.15) 0%, transparent 70%)'
        }}
      />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(11, 96, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(11, 96, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
}
