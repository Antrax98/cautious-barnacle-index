import { AfterViewInit, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  ngAfterViewInit(): void {

    //MUSIC
    let audio = new Audio();
    audio.src = "Maxwell_the_Cat.mp3";
    audio.load();
    audio.loop = true;
    audio.play();



    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    //model loader
    const loader = new GLTFLoader();
    let cat: THREE.Object3D<THREE.Object3DEventMap>;
    loader.load("maxwell/maxwell.gltf",function(gltf) {
      cat = gltf.scene;
      cat.rotation.x = 0.3;
      cat.position.y = -1;
      cat.scale.set(0.2,0.2,0.2);
      scene.add(cat);
    });
    //model loader END
    const cube = new THREE.Mesh( geometry, material );
    //cat.position.x=2;
    //scene.add( cube );



    //ligth
    const ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
    scene.add( ambientLight );
    

    camera.position.z = 10;

    cube.rotation.x = 0.5;

    function animate() {
      if (cat) {
        cat.rotation.y -=0.05;
      }
      cube.position.x = 0;
      //cube.rotation.x += 0.01;
      cube.rotation.y += 0.015;
      renderer.render( scene, camera );
    }
    renderer.setAnimationLoop( animate );
  }

  protected readonly title = signal('cautious-barnacle-index');
}
