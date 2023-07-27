import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { motion as m } from "framer-motion-3d";
import { Canvas, extend } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  OrbitControls,
  useGLTF,
  useHelper,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { gsap } from "gsap";

function Gun() {
  const Gun = useGLTF("/PossibleHand.glb");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const groupRef = useRef<THREE.Group>();

  var modelTwo = Gun.scene;
  let geoMet;
  console.log(modelTwo);
  var newMaterial = new THREE.MeshPhysicalMaterial({
    color: "silver",
    metalness: 0.7,
    roughness: 0.4,
    side: THREE.DoubleSide,
    reflectivity: 1,
  });
  modelTwo.traverse((o: any) => {
    if (o.isMesh) {
      o.material = newMaterial;
      geoMet = o.geometry;
    }
  });

  console.log(geoMet);

  useEffect(() => {
    const ctx = gsap.context(() => {
      groupRef.current?.rotation.reorder("XYZ");
      const animateGun = (x: number, y: number) => {
        gsap.to(groupRef.current?.rotation, {
          x: y - Math.PI / 6,
          y: Math.PI / 2 + x,
          z: 0,
        });
      };

      window.addEventListener("mousemove", (e) => {
        /*     console.log("Y", (e.clientY / window.innerHeight) * 2 + 1); */
        /*   console.log(
          "X",
          (1 - e.clientX / window.innerWidth + 1 * 180) / Math.PI
        ); */
        animateGun(
          1 - (e.clientX / window.innerWidth) * 2,
          1 - (e.clientY / window.innerHeight) * 0.8
        );
        /*  setMousePos((prev) => {
              return {
                ...prev,
                x: 1 - e.clientX / window.innerWidth,
                y: 1 - e.clientY / window.innerHeight,
              };
            }); */
      });
    });

    return () => ctx.revert();
  }, []);
  /*   useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.set(
        0,
        mousePos.x + Math.PI / 3,
        Math.PI / 2,
        "XYZ"
      );
    }
  }); */

  return (
    <m.group position={[0, 0, -5]} ref={groupRef}>
      <mesh position={[-3, 0, 0]} geometry={geoMet}>
        <MeshTransmissionMaterial
          distortionScale={2}
          temporalDistortion={1}
        ></MeshTransmissionMaterial>
      </mesh>
      <primitive object={Gun.scene}></primitive>
    </m.group>
  );
}

export default function FinalCanvas() {
  return (
    <div className="w-full h-screen  bg-black relative ">
      <div className="flex gap-[10%] items-center justify-center  absolute top-20 w-full">
        {[1, 2, 3].map((item) => {
          return (
            <div
              className="w-[20vw] h-[30vw] bg-gray-900 rounded-lg relative"
              key={item}
            >
              <p className="absolute top-10 text-4xl right-4 font-Berk text-black">
                {item}/3
              </p>
            </div>
          );
        })}
      </div>
      <Canvas className="fixed  h-screen w-full">
        <axesHelper></axesHelper>
        <ambientLight></ambientLight>
        <Gun></Gun>
      </Canvas>
    </div>
  );
}
