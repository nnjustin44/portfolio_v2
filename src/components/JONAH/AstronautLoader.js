import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const createBlock = (width, height, depth, material) => {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    material
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
};

const createPixelMaterial = (color, options = {}) =>
  new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
    roughness: 0.72,
    metalness: 0.04,
    ...options,
  });

const createAstronaut = () => {
  const astronaut = new THREE.Group();
  astronaut.rotation.y = -0.12;

  const suit = createPixelMaterial(0xe9eef2);
  const suitShadow = createPixelMaterial(0xb8c4cf);
  const outline = createPixelMaterial(0x263348, { roughness: 0.56 });
  const visor = createPixelMaterial(0x0b1930, {
    roughness: 0.22,
    metalness: 0.34,
  });
  const gold = createPixelMaterial(0xf2ad3b, { roughness: 0.44 });
  const cyan = createPixelMaterial(0x29c5c7, { roughness: 0.36 });
  const visorHighlight = new THREE.MeshBasicMaterial({ color: 0xa5f1ef });

  const backpack = createBlock(0.96, 1.08, 0.32, outline);
  backpack.position.set(0, 0.04, -0.48);
  astronaut.add(backpack);

  const torso = createBlock(1.12, 1.14, 0.74, suit);
  torso.position.y = 0.02;
  astronaut.add(torso);

  const shoulderShadow = createBlock(1.2, 0.22, 0.76, suitShadow);
  shoulderShadow.position.y = 0.48;
  astronaut.add(shoulderShadow);

  const belt = createBlock(1.18, 0.18, 0.78, gold);
  belt.position.y = -0.56;
  astronaut.add(belt);

  const chestPanel = createBlock(0.68, 0.44, 0.1, outline);
  chestPanel.position.set(0, 0.13, 0.42);
  astronaut.add(chestPanel);

  const panelScreen = createBlock(0.32, 0.14, 0.04, cyan);
  panelScreen.position.set(-0.1, 0.2, 0.49);
  astronaut.add(panelScreen);

  [-0.2, 0.02, 0.24].forEach((x, index) => {
    const pixel = createBlock(0.08, 0.08, 0.04, index === 1 ? gold : cyan);
    pixel.position.set(x, 0.01, 0.49);
    astronaut.add(pixel);
  });

  const helmet = createBlock(1.32, 1.02, 0.9, suit);
  helmet.position.set(0, 1.27, 0);
  astronaut.add(helmet);

  const helmetTop = createBlock(1.1, 0.14, 0.78, suitShadow);
  helmetTop.position.set(0, 1.83, -0.02);
  astronaut.add(helmetTop);

  const helmetRing = createBlock(1.16, 0.17, 0.8, gold);
  helmetRing.position.set(0, 0.72, 0);
  astronaut.add(helmetRing);

  const visorGlass = createBlock(0.94, 0.55, 0.11, visor);
  visorGlass.position.set(0, 1.29, 0.51);
  astronaut.add(visorGlass);

  const visorShineLarge = createBlock(0.24, 0.08, 0.03, visorHighlight);
  visorShineLarge.position.set(-0.25, 1.45, 0.585);
  astronaut.add(visorShineLarge);

  const visorShineSmall = createBlock(0.09, 0.08, 0.03, visorHighlight);
  visorShineSmall.position.set(0.01, 1.45, 0.585);
  astronaut.add(visorShineSmall);

  [-0.74, 0.74].forEach((x) => {
    const ear = createBlock(0.16, 0.45, 0.54, outline);
    ear.position.set(x, 1.28, 0);
    astronaut.add(ear);
  });

  const createLeg = (x) => {
    const leg = createBlock(0.4, 0.86, 0.54, suit);
    leg.position.set(x, -1.1, 0);
    astronaut.add(leg);

    const knee = createBlock(0.42, 0.18, 0.58, suitShadow);
    knee.position.set(x, -1.1, 0.04);
    astronaut.add(knee);

    const boot = createBlock(0.48, 0.34, 0.66, outline);
    boot.position.set(x, -1.68, 0.09);
    astronaut.add(boot);
  };

  createLeg(-0.3);
  createLeg(0.3);

  const restingArm = new THREE.Group();
  restingArm.position.set(-0.73, 0.46, 0);
  restingArm.rotation.z = -0.14;
  const restingSleeve = createBlock(0.34, 0.72, 0.46, suit);
  restingSleeve.position.y = -0.36;
  restingArm.add(restingSleeve);
  const restingCuff = createBlock(0.36, 0.16, 0.48, gold);
  restingCuff.position.y = -0.73;
  restingArm.add(restingCuff);
  const restingGlove = createBlock(0.38, 0.34, 0.46, outline);
  restingGlove.position.y = -0.96;
  restingArm.add(restingGlove);
  astronaut.add(restingArm);

  const wavingShoulder = new THREE.Group();
  wavingShoulder.position.set(0.73, 0.46, 0);
  wavingShoulder.rotation.z = 2.25;
  const upperArm = createBlock(0.34, 0.66, 0.46, suit);
  upperArm.position.y = -0.33;
  wavingShoulder.add(upperArm);

  const shoulderPatch = createBlock(0.36, 0.2, 0.48, cyan);
  shoulderPatch.position.y = -0.19;
  wavingShoulder.add(shoulderPatch);

  const elbow = new THREE.Group();
  elbow.position.y = -0.66;
  elbow.rotation.z = -1.48;
  const forearm = createBlock(0.32, 0.58, 0.44, suit);
  forearm.position.y = -0.29;
  elbow.add(forearm);

  const cuff = createBlock(0.35, 0.16, 0.47, gold);
  cuff.position.y = -0.6;
  elbow.add(cuff);

  const glove = new THREE.Group();
  glove.position.y = -0.75;
  const palm = createBlock(0.42, 0.38, 0.48, outline);
  glove.add(palm);
  [-0.14, -0.05, 0.05, 0.14].forEach((x) => {
    const finger = createBlock(0.07, 0.2, 0.42, suit);
    finger.position.set(x, -0.27, 0);
    glove.add(finger);
  });
  elbow.add(glove);
  wavingShoulder.add(elbow);
  astronaut.add(wavingShoulder);

  return { astronaut, wavingShoulder, elbow, glove };
};

const AstronautLoader = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container || !window.WebGLRenderingContext) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-2.4, 2.4, 2.4, -2.4, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    scene.add(new THREE.HemisphereLight(0xd8f1ff, 0x202a3c, 2.5));

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(3.5, 4.2, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x29c5c7, 1.9);
    rimLight.position.set(-4, 1.5, -2.5);
    scene.add(rimLight);

    const warmLight = new THREE.PointLight(0xf2ad3b, 1.6, 10);
    warmLight.position.set(2.7, -1.8, 3);
    scene.add(warmLight);

    const { astronaut, wavingShoulder, elbow, glove } = createAstronaut();
    astronaut.scale.setScalar(0.76);
    astronaut.position.y = -0.08;
    scene.add(astronaut);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const clock = new THREE.Clock();
    let animationFrameId;

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      const pixelScale = width <= 390 ? 2.5 : 3;
      const renderWidth = Math.max(Math.round(width / pixelScale), 96);
      const renderHeight = Math.max(Math.round(height / pixelScale), 64);
      const aspect = width / height;
      const halfHeight = 2.35;

      renderer.setSize(renderWidth, renderHeight, false);
      camera.left = -halfHeight * aspect;
      camera.right = halfHeight * aspect;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();
      const steppedTime = Math.floor(elapsed * 8) / 8;
      const motion = prefersReducedMotion ? 0 : 1;
      const wave = Math.round(Math.sin(steppedTime * 5) * 4) / 4;
      const sway = Math.round(Math.sin(steppedTime * 1.4) * 3) / 3;

      astronaut.position.y = -0.08 + sway * 0.035 * motion;
      astronaut.rotation.y = -0.12 + sway * 0.08 * motion;
      wavingShoulder.rotation.z = 2.25 + wave * 0.2 * motion;
      elbow.rotation.z = -1.48 + wave * 0.09 * motion;
      glove.rotation.z = wave * 0.3 * motion;

      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="astronautLoader"
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label="J.O.N.A.H is thinking"
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="loadingStatus">J.O.N.A.H is thinking...</span>
    </div>
  );
};

export default AstronautLoader;
