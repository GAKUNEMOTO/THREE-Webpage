window.addEventListener("load", init);

function init(){
    // size
    const width = 960;
    const heihgt  = 540;
    let rot = 0;

    // sceane
    const scene = new THREE.Scene();

    // camera
    const camera = new THREE.PerspectiveCamera(45, width / heihgt);
    // camera.position.z = 1000;

    // renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#myCanvas"),
    }); 
    renderer.setSize(window.innerWidth,window.innerHeight);

    // circle
    const geometry = new THREE.SphereGeometry(300, 30, 30);

    // material
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("earthmap1k.jpg")
    });

    // mesh

    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2, 1.9);

    directionalLight.position.set(1,1,1);
    scene.add(directionalLight);

    // pointLight
    const pointLight = new THREE.PointLight( 0xffffff, 2, 1000);
    scene.add(pointLight);


    const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
    scene.add(pointLightHelper);


    // Star
    createStarField();

    function createStarField(){
        // 座標
        const vertices = [];
        for(let i = 0; i < 500; i++){
            const x =  3000 * (Math.random() - 0.5);
            const y =  3000 * (Math.random() - 0.5);
            const z =  3000 * (Math.random() - 0.5);

            vertices.push(x, y, z);
        }

        // star thing
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            "position", 
            new THREE.Float32BufferAttribute(vertices, 3)
        );

        // material 
        const material = new THREE.PointsMaterial({
            size: 8,
            color: 0xffffff,
        });

        // mesh
        const stars = new THREE.Points(geometry, material);
        scene.add(stars);
    }


    // call function
    function tick(){
        rot += 0.5;

        // radian
        const radian = (rot * Math.PI) / 180;

        // angle
        camera.position.x = 1000 * Math.sin(radian);
        camera.position.z = 2000 * Math.cos(radian);

        // looking camera
        camera.lookAt(new THREE.Vector3(0,0, -400));


         //turn light
         pointLight.position.set(
            500 * Math.sin(Date.now() / 500),
            500 * Math.sin(Date.now() / 1000),
            500 * Math.cos(Date.now() / 500),
            );


        // rendering
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

    tick();

}