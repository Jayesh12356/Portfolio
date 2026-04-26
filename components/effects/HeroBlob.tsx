"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vNoise;

  // Ashima simplex noise 3D
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    float mouseInfluence = length(uMouse) * 0.6;
    vec3 pos = position;
    float n1 = snoise(pos * 1.2 + uTime * 0.25);
    float n2 = snoise(pos * 2.4 + uTime * 0.4 + uMouse.x * 1.5);
    float displacement = (n1 * 0.6 + n2 * 0.4) * (uIntensity + mouseInfluence * 0.4);
    vec3 displaced = pos + normal * displacement;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
    vWorldPos = worldPos.xyz;
    vNoise = displacement;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uBaseColor;
  uniform vec3 uHighlight;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vNoise;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.4);
    vec3 base = mix(uBaseColor, uColor, fresnel);
    base = mix(base, uHighlight, smoothstep(0.6, 1.0, fresnel));
    base += vec3(vNoise * 0.15) * uColor;
    gl_FragColor = vec4(base, 1.0);
  }
`;

function Blob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uIntensity: { value: 0.32 },
      uColor: { value: new THREE.Color("#ff2e63") },
      uBaseColor: { value: new THREE.Color("#0a0a0a") },
      uHighlight: { value: new THREE.Color("#ff8fae") },
    }),
    []
  );

  useFrame(({ clock, pointer }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime;
      mouse.current.x += (pointer.x - mouse.current.x) * 0.06;
      mouse.current.y += (pointer.y - mouse.current.y) * 0.06;
      matRef.current.uniforms.uMouse.value.copy(mouse.current);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0025;
      meshRef.current.rotation.x += 0.0012;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.15, 64]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export function HeroBlob({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowMemory =
      typeof nav.deviceMemory === "number" && nav.deviceMemory < 4;
    setEnabled(!reduced && !small && !lowMemory);
  }, []);

  if (enabled === null) {
    return <div className={className} aria-hidden />;
  }

  if (!enabled) {
    return (
      <div className={`relative ${className ?? ""}`} aria-hidden>
        <div
          className="absolute inset-1/4 rounded-full opacity-90 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #ff2e63 0%, rgba(255,46,99,0.5) 35%, transparent 70%)",
          }}
        />
      </div>
    );
  }

  return (
    <div className={className} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        <Blob />
      </Canvas>
    </div>
  );
}
