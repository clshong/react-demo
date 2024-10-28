import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeScene = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // 创建场景
        const scene = new THREE.Scene();

        // 设置摄像机
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);

        // 创建渲染器
        const renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(0xeeeeee));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;

        // 显示三维坐标系
        const axes = new THREE.AxesHelper(20);
        scene.add(axes);

        // 添加环境光
        const ambientLight = new THREE.AmbientLight(0x404040, 1); // 半强度环境光
        scene.add(ambientLight);

        // 创建地面的几何体
        const planeGeometry = new THREE.PlaneGeometry(60, 20);
        const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -0.5 * Math.PI;
        plane.receiveShadow = true;
        scene.add(plane);

        // 添加立方体
        const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(0, 4, 2);
        cube.castShadow = true;
        scene.add(cube);

        // 添加球体
        const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff }); // 蓝色
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(10, 4, 0);
        sphere.castShadow = true;
        scene.add(sphere);

        // 创建聚光灯
        const spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(30, 50, -30);
        spotLight.castShadow = true;
        spotLight.angle = Math.PI / 6;
        spotLight.shadow.penumbra = 0.05;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        scene.add(spotLight);

        // 定位相机，并指向场景中心
        camera.position.set(30, 30, 30);
        camera.lookAt(scene.position);

        // 将渲染器输出添加到 HTML 元素中
        mountRef.current?.appendChild(renderer.domElement);

        // 渲染场景
        const renderScene = () => {
            renderer.render(scene, camera);
        };

        // 创建 OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', renderScene);

        // 开始渲染
        renderScene();

        // 清理
        return () => {
            controls.dispose();
            renderer.dispose();
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ width: "80vw", height: "80vh" }} />;
};

export default ThreeScene;
