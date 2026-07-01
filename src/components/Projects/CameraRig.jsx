import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraRig({ progress }) {
  // Translate progress to horizontal camera movement
  // Camera pans to the right as Vansh walks forward in the studio
  const panRange = 14; // total horizontal distance the camera pans
  const targetX = (progress - 0.1) * panRange; // Offset so panning starts at 10% progress

  useFrame((state) => {
    // Damp position changes (0.1 matches the required damping)
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x, 
      progress < 0.1 ? 0 : targetX, 
      0.1
    );
    
    // Smoothly track lookAt
    state.camera.lookAt(new THREE.Vector3(state.camera.position.x, 0, 0));
  });

  return null;
}
