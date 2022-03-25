import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { NextPage } from "next";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { Object3D, Scene, WebGLRenderer } from "three";

let sphereModel: Object3D;

const ThreeElement: NextPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0.001, y: 0.002 });
  const [renderer, setRenderer] = useState<WebGLRenderer>();
  const [scene, setScene] = useState<Scene>();

  useEffect(() => {
    if (!scene || !renderer) {
      setScene(new THREE.Scene());
      setRenderer(new THREE.WebGLRenderer());
    }
  }, [ref.current]);

  useEffect(() => {
    if (renderer && scene && ref.current) {
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        5000
      );
      camera.rotation.y = (45 / 180) * Math.PI;
      camera.position.x = 50;
      camera.position.y = 0;
      camera.position.z = 50;

      const hlight = new THREE.AmbientLight(0x404040, 1.1);
      scene.add(hlight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
      directionalLight.position.set(-0.5, 1.7, 1);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      const light = new THREE.PointLight(0xc4c4c4, 1.1);
      light.position.set(0, 300, 500);
      scene.add(light);
      const light1 = new THREE.PointLight(0xc4c4c4, 1.1);
      light1.position.set(500, 100, 0);
      scene.add(light1);
      const light2 = new THREE.PointLight(0xc4c4c4, 1.1);
      light2.position.set(0, 100, -500);
      scene.add(light2);
      const light3 = new THREE.PointLight(0xc4c4c4, 1.1);
      light3.position.set(-500, 300, 0);
      scene.add(light3);

      if (window.innerWidth > window.innerHeight) {
        renderer.setSize(
          ref.current?.offsetWidth * 1.15,
          ref.current?.offsetWidth * 1.15
        );
      } else {
        renderer.setSize(
          ref.current?.offsetWidth * 1.6,
          ref.current?.offsetWidth * 3.6
        );
      }
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.setClearColor("0xff0000", 0);
      ref.current.appendChild(renderer.domElement);

      const loader = new GLTFLoader();
      /**
	* Model Information:
	* title:	Shield Sphere
	* source:	https://sketchfab.com/3d-models/shield-sphere-6967d56fa1004742b2d92bb8ca9fad8b
	* author:	Forest Run Forever (https://sketchfab.com/2w)

	* Model License:
	* license type:	CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
	* requirements:	Author must be credited. Commercial use is allowed.
	*/
      loader.load(
        "/3d-model.gltf",
        function (gltf) {
          const sphere = gltf.scene.children[0];
          var ship_material = new THREE.MeshStandardMaterial({
            color: 0x19f4ff,
            roughness: 0.1,
            metalness: 0.4,
          });
          sphere.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
              child.material = ship_material;
            }
          });
          if (window.innerWidth < window.innerHeight) {
            sphere.scale.set(
              window.innerWidth / 700,
              window.innerWidth / 700,
              window.innerWidth / 700
            );
          }
          scene.add(gltf.scene);

          const animate = () => {
            requestAnimationFrame(animate);

            sphere.rotation.y += 0.001;

            sphereModel = sphere;

            renderer?.render(scene, camera);
          };

          animate();
        },
        (a) => console.log(a),
        function (error) {
          console.log(error);
        }
      );
    }
  }, [renderer, scene]);

  const mouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const pX = event.clientX;
    const pY = event.clientY;
    sphereModel!.rotation.z +=
      pX > window.innerWidth / 2 ? pX / 100000 : -pX / 100000;
    sphereModel!.rotation.x +=
      pY > window.innerHeight / 2 ? pY / 100000 : -pY / 100000;
  };

  return (
    <>
      <div
        className="absolute w-11/12 h-4/5 inset-0 m-auto z-10"
        onMouseMove={mouseMove}
      />
      <div
        className="z-0 absolute flex justify-center w-6/12 h-4/5 top-0 mx-auto items-center left-0 right-0 my-auto bottom-0"
        ref={ref}
      />
    </>
  );
};

export default ThreeElement;
