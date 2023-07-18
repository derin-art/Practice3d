import { useEffect, useRef, useState } from "react";
import {
  OrbitControls,
  useGLTF,
  useHelper,
  MeshPortalMaterial,
  Float,
  Stage,
  Backdrop,
  MeshReflectorMaterial,
  MeshWobbleMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { AmbientLight, Object3D } from "three";
import { Canvas } from "@react-three/fiber";

const DirectionalLight = (props: {
  pos?: [x: number, y: number, z: number];
}) => {
  const light: any = useRef<Object3D>();
  /*   useHelper(light, THREE.DirectionalLightHelper); */
  return (
    <directionalLight
      intensity={1.6}
      position={props.pos}
      ref={light}
    ></directionalLight>
  );
};

const SilverHand = () => {
  const Hand = useGLTF("/Hand.glb");
  const groupRef: any = useRef<THREE.Group>(null);
  return (
    <Float
      speed={1}
      rotationIntensity={1}
      floatIntensity={1}
      floatingRange={[1, 1.5]}
    >
      <group ref={groupRef}>
        <DirectionalLight pos={[0, 7, 0]}></DirectionalLight>
        <DirectionalLight pos={[6, 0, 0]}></DirectionalLight>
        <DirectionalLight pos={[-4, 0, 0]}></DirectionalLight>
        <DirectionalLight pos={[0, -8, 0]}></DirectionalLight>
        <primitive object={Hand.scene}></primitive>
      </group>
    </Float>
  );
};

const PortalStuff = () => {
  return (
    <mesh>
      <planeBufferGeometry args={[1, 2]}></planeBufferGeometry>
      <MeshPortalMaterial>
        <SilverHand></SilverHand>
      </MeshPortalMaterial>
    </mesh>
  );
};

const StagingStuff = () => {
  return (
    <Stage
      adjustCamera
      intensity={0.5}
      shadows="accumulative"
      environment="dawn"
    >
      {" "}
      <SilverHand></SilverHand>
    </Stage>
  );
};

const ReflectiveMat = () => {
  return (
    <mesh>
      <planeBufferGeometry args={[4, 4, 4]}></planeBufferGeometry>
      <MeshReflectorMaterial
        color={"gray"}
        blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
        mixBlur={0} // How much blur mixes with surface roughness (default = 1)
        mixStrength={1} // Strength of the reflections
        mixContrast={1} // Contrast of the reflections
        resolution={256} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        distortion={1} // Amount of distortion based on the distortionMap texture
        // The red channel of this texture is used as the distortion map. Default is null
        debug={0}
        /* Depending on the assigned value, one of the following channels is shown:
      0 = no debug
      1 = depth channel
      2 = base channel
      3 = distortion channel
      4 = lod channel (based on the roughness)
    */
        reflectorOffset={0.2}
      ></MeshReflectorMaterial>
    </mesh>
  );
};

const WobbleObj = () => {
  return (
    <mesh>
      <sphereBufferGeometry args={[2, 20, 20]}></sphereBufferGeometry>

      <MeshWobbleMaterial wireframe factor={1} speed={5}></MeshWobbleMaterial>
    </mesh>
  );
};

export default function PortalTest() {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <OrbitControls></OrbitControls>
        <Backdrop floor={2} segments={40} receiveShadow={{}}>
          <meshNormalMaterial></meshNormalMaterial>
        </Backdrop>{" "}
        <WobbleObj></WobbleObj>
      </Canvas>
    </div>
  );
}
