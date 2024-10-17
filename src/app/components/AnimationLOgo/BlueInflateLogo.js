import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function BlueINflateLogo(props) {
  const { nodes, materials } = useGLTF('/assets/Blue-Inflate-Logo.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_1.geometry}
        material={nodes.mesh_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_2.geometry}
        material={nodes.mesh_2.material}
      />
    </group>
  )
}

useGLTF.preload('/assets/Blue-Inflate-Logo.gltf')