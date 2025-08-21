//preparar la escena, el renderizador y una camara
const escena = new THREE.Scene(); //escena nueva
const renderizador = new THREE.WebGLRenderer();  //el renderizador
renderizador.setSize(window.innerWidth, window.innerHeight); //dar tamano al renderizador
document.body.appendChild(renderizador.domElement); //acoplar el render al body

// ajustar la camara
const ancho = window.innerWidth; //ancho
const alto = window.innerHeight; //alto
const camara = new THREE.OrthographicCamera(ancho / -2, ancho / 2, alto / 2, alto / -2, 0.1, 1000);
camara.position.z = 100; //posicion de la camara

const controls = new THREE.OrbitControls(camara, renderizador.domElement);

const luz_direccional = new THREE.DirectionalLight(0xffffff, 1); // luz blanca, intensidad 1
luz_direccional.position.set(0, 0, 1000); // desde arriba, mirando hacia el plano XY
luz_direccional.target.position.set(0, 0, 0); // apunta al centro
escena.add(luz_direccional);
escena.add(luz_direccional.target);

const fog = new THREE.FogExp2(0x000000, 0.01); // niebla negra
escena.fog = fog;

const geo_sol = new THREE.DodecahedronGeometry(50, 1);
const mat_sol = new THREE.MeshPhongMaterial({
    color: 0xffff00,
    emissive: 0xffa500,
    shininess: 50,
});
const sol = new THREE.Mesh(geo_sol, mat_sol);
sol.position.set(0, 0, 0);
escena.add(sol);

const luz_sol = new THREE.PointLight(0xffffff, 2, 700);
luz_sol.position.copy(sol.position); // misma posicion que el sol
escena.add(luz_sol);

const geo_mercurio = new THREE.DodecahedronGeometry(20, 1);
const mat_mercurio = new THREE.MeshPhongMaterial({
    color: 0x888888,
    shininess: 30
});
const mercurio = new THREE.Mesh(geo_mercurio, mat_mercurio);
mercurio.position.set(-100, 0, 0); // posicion de mercurio
escena.add(mercurio);

const geo_venus = new THREE.DodecahedronGeometry(30, 1);
const mat_venus = new THREE.MeshPhongMaterial({
    color: 0xf20a0a,
    shininess: 30
});
const venus = new THREE.Mesh(geo_venus, mat_venus);
venus.position.set(-170, 0, 0);
escena.add(venus);

const geo_terra = new THREE.DodecahedronGeometry(20, 1);
const mat_terra = new THREE.MeshPhongMaterial({
    color: 0x1a4fff,
    shininess: 50
});
const terra = new THREE.Mesh(geo_terra, mat_terra);
terra.position.set(-250, 0, 0);
escena.add(terra);

const geo_mars = new THREE.DodecahedronGeometry(25, 1);
const mat_mars = new THREE.MeshPhongMaterial({
    color: 0xa1251b,
    shininess: 30
});
const mars = new THREE.Mesh(geo_mars, mat_mars);
mars.position.set(-310, 0, 0);
escena.add(mars);

const geo_jupi = new THREE.DodecahedronGeometry(40, 1);
const mat_jupi = new THREE.MeshPhongMaterial({
    color: 0xa59186,
    shininess: 30
});
const jupi = new THREE.Mesh(geo_jupi, mat_jupi);
jupi.position.set(-380, 0, 0);
escena.add(jupi);

const geo_sat = new THREE.DodecahedronGeometry(20, 1);
const mat_sat = new THREE.MeshPhongMaterial({
    color: 0xead6b8,
    shininess: 30
});
const sat = new THREE.Mesh(geo_sat, mat_sat);
sat.position.set(-450, 0, 0);
escena.add(sat);

const geo_anillo = new THREE.RingGeometry(25, 35, 64);
const mat_anillo = new THREE.MeshBasicMaterial({
    color: 0xd2b48c,
    side: THREE.DoubleSide,
    transparent: false,
    opacity: 0.5
});
const anillo = new THREE.Mesh(geo_anillo, mat_anillo);
anillo.position.copy(sat.position);
escena.add(anillo);

const geo_urano = new THREE.DodecahedronGeometry(20, 1);
const mat_urano = new THREE.MeshPhongMaterial({
    color: 0xc6d3e3,
    shininess: 30
});
const urano = new THREE.Mesh(geo_urano, mat_urano);
urano.position.set(-540, 0, 0);
escena.add(urano);

const geo_nept = new THREE.DodecahedronGeometry(15, 1);
const mat_nept = new THREE.MeshPhongMaterial({
    color: 0x85addb,
    shininess: 30
});
const nept = new THREE.Mesh(geo_nept, mat_nept);
nept.position.set(-610, 0, 0);
escena.add(nept);

const geo_pluto = new THREE.DodecahedronGeometry(10, 1);
const mat_pluto = new THREE.MeshPhongMaterial({
    color: 0x92a8a4,
    shininess: 30
});
const pluto = new THREE.Mesh(geo_pluto, mat_pluto);
pluto.position.set(-670, 0, 0);
escena.add(pluto);

let angulo_mercurio = 0;
let angulo_venus = 30;
let angulo_terra = 50;
let angulo_mars = 20;
let angulo_jupi = 150;
let angulo_sat = 180;
let angulo_urano = 70;
let angulo_nept = 90;
let angulo_pluto = 195;

function crear_orbita(radio) {
    const geo_orbita = new THREE.RingGeometry(radio - 0.5, radio + 0.5, 128);
    const mat_orbita = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7    
    });
    const orbita = new THREE.Mesh(geo_orbita, mat_orbita);
    orbita.position.copy(sol.position); // centra la orbita en el sol
    orbita.rotation.z = Math.PI / 2;    // orienta el anillo en el plano XY
    escena.add(orbita);
}

crear_orbita(100);  // mercurio
crear_orbita(150);  // venus
crear_orbita(200);  // terra
crear_orbita(250);  // mars
crear_orbita(300);  // jupi
crear_orbita(350);  // sat
crear_orbita(400);  // urano
crear_orbita(450);  // nept
crear_orbita(500);  // pluto

function animacion() {
    requestAnimationFrame(animacion); //funcion recuriva
    sol.rotation.z += 0.01; //rotar el sol en z
    sol.rotation.x += 0.01; //rotar el sol en x 
    anillo.rotation.z += 0.01;
    anillo.rotation.x += 0.01;
    anillo.rotation.y += 0.01;

    angulo_mercurio = orbitar_fast(mercurio, angulo_mercurio, 100);
    angulo_venus = orbitar_fast(venus, angulo_venus, 150);
    angulo_terra = orbitar(terra, angulo_terra, 200);
    angulo_mars = orbitar_slow(mars, angulo_mars, 250);
    angulo_jupi = orbitar_slow(jupi, angulo_jupi, 300);
    angulo_sat = orbitar_slow(sat, angulo_sat, 350);
    angulo_sat_ring = orbitar_slow(anillo, angulo_sat, 350);
    angulo_urano = orbitar_slow(urano, angulo_urano, 400);
    angulo_nept = orbitar_slow(nept, angulo_nept, 450);
    angulo_pluto = orbitar_slow(pluto, angulo_pluto, 500);

    controls.update(); // actualizar los controles

    renderizador.render(escena, camara);
}

function orbitar(planeta, angulo, radio) {
    angulo += 0.01;
    planeta.position.x = sol.position.x + Math.cos(angulo) * radio;
    planeta.position.y = sol.position.y + Math.sin(angulo) * radio;
    return angulo;
}

function orbitar_fast(planeta, angulo, radio) {
    angulo += 0.05;
    planeta.position.x = sol.position.x + Math.cos(angulo) * radio;
    planeta.position.y = sol.position.y + Math.sin(angulo) * radio;
    return angulo;
}

function orbitar_slow(planeta, angulo, radio) {
    angulo += 0.005;
    planeta.position.x = sol.position.x + Math.cos(angulo) * radio;
    planeta.position.y = sol.position.y + Math.sin(angulo) * radio;
    return angulo;
}
animacion();

window.addEventListener('resize', () => { //crear la escena
    const ancho = window.innerWidth;
    const alto = window.innerHeight;
    camara.left = ancho / -2;
    camara.right = ancho / 2;
    camara.top = alto / 2;
    camara.bottom = alto / -2;
    camara.updateProjectionMatrix();
    renderizador.setSize(ancho, alto);
});
