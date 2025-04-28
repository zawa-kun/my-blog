'use client'

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // シーンの作成
    const scene = new THREE.Scene();

    // カメラの追加
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    // レンダラーの作成
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // 高解像度対応
    mountRef.current?.appendChild(renderer.domElement);

    // 波の作成
    const geometry = new THREE.PlaneGeometry(10, 10, 100, 100);
    const textureLoader = new THREE.TextureLoader();
    const waterTexture = textureLoader.load("/images/water-texture3.jpg");
    const material = new THREE.MeshPhongMaterial({
      map: waterTexture,
      shininess: 100,
      opacity: 0.9,
      transparent: true,
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // ライトの追加
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.position.set(5, 10, 5);
    scene.add(spotLight);

    // 背景色
    scene.background = new THREE.Color("white");

    // 画面リサイズ処理
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio); // 高画質ディスプレイにも対応
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);

      const positionArray = geometry.attributes.position.array;
      const time = Date.now() * 0.0007;

      for (let i = 0; i < positionArray.length; i += 3) {
        positionArray[i + 2] =
          Math.sin(time + positionArray[i]) * 0.5 +
          Math.cos(time + positionArray[i + 1]) * 0.3;
      }

      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // クリーンアップ
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute w-100%"/>
  );
}
