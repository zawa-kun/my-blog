"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // レンダラーの作成
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

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

    // 初期サイズ設定
    const updateSize = () => {
      if (mountRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    updateSize();
    mountRef.current.appendChild(renderer.domElement);


    // 波の作成
    const geometry = new THREE.PlaneGeometry(10, 10, 100, 100);

    // テクスチャロードの安全性確保
    let material;
    try {
      const textureLoader = new THREE.TextureLoader();
      const waterTexture = textureLoader.load(
        "/images/water-texture3.jpg",
        // 成功時のコールバック
        () => {
          renderer.render(scene, camera);
        },
        // 進捗コールバック
        undefined,
        // エラー時のコールバック
        (err) => {
          console.error("テクスチャの読み込みエラー:", err);
        }
      );

      material = new THREE.MeshPhongMaterial({
        map: waterTexture,
        shininess: 100,
        opacity: 0.9,
        transparent: true,
      });
    } catch (error) {
      console.error("テクスチャ処理エラー:", error);
      // フォールバックマテリアル
      material = new THREE.MeshPhongMaterial({
        color: 0x0077be,
        shininess: 100,
        opacity: 0.9,
        transparent: true,
      });
    }

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
      updateSize();
    };
    window.addEventListener("resize", handleResize);

    // アニメーション
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (geometry.attributes.position && geometry.attributes.position.array) {
        const positionArray = geometry.attributes.position.array;
        const time = Date.now() * 0.001;

        for (let i = 0; i < positionArray.length; i += 3) {
          positionArray[i + 2] =
            Math.sin(time + positionArray[i]) * 0.5 +
            Math.cos(time + positionArray[i + 1]) * 0.3;
        }

        geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    animate();

    // クリーンアップ
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ pointerEvents: "none" }} // マウスイベントを無視
    />
  );
}
