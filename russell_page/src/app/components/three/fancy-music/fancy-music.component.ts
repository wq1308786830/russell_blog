import { Component, OnInit } from '@angular/core';
import * as THREE from "three";

@Component({
  selector: 'app-fancy-music',
  templateUrl: './fancy-music.component.html',
  styleUrls: ['./fancy-music.component.scss']
})
export class FancyMusicComponent implements OnInit {

  scene; camera; renderer; analyser; uniforms; self;


  constructor() {
    this.self = this;
  }

  ngOnInit() {


    this.init();
    this.animate = this.animate.bind(this);
    this.animate();
  }

  init() {

    let fftSize = 128;
    let container = document.getElementById( 'container' );

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize( 384, 190 );
    this.renderer.setClearColor( 0x000000 );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    container.appendChild( this.renderer.domElement );

    this.scene = new THREE.Scene();

    this.camera = new THREE.Camera();

    //

    let audioLoader = new THREE.AudioLoader();

    let listener = new THREE.AudioListener();

    let audio = new THREE.Audio( listener );

    audioLoader.load( 'assets/musics/canno.mp3', buffer => {

      audio.setBuffer( buffer );
      audio.setLoop( true );
      audio.play();

    }, null, null );

    this.analyser = new THREE.AudioAnalyser( audio, fftSize );

    //

    this.uniforms = {

      tAudioData: { value: new THREE.DataTexture( this.analyser.data, fftSize / 2, 1, THREE.LuminanceFormat ) }

    };

    let material = new THREE.ShaderMaterial( {

      uniforms: this.uniforms,
      vertexShader: "varying vec2 vUv;void main() {vUv = uv;gl_Position = vec4( position, 1.0 );}",
      fragmentShader: "uniform sampler2D tAudioData;varying vec2 vUv;void main() {" +
      "vec3 backgroundColor = vec3( 0.125, 0.125, 0.125 );vec3 color = vec3( 1.0, 1.0, 0.0 );" +
      "float f = texture2D( tAudioData, vec2( vUv.x, 0.0 ) ).r;float i = step( vUv.y, f ) * step( f - 0.0125, vUv.y );" +
      "gl_FragColor = vec4( mix( backgroundColor, color, i ), 1.0 );}"

    } );

    let geometry = new THREE.PlaneBufferGeometry( 1, 1 );

    let mesh = new THREE.Mesh( geometry, material );
    this.scene.add( mesh );

    //

    window.addEventListener( 'resize', this.onResize, false );

  }

  animate() {

    requestAnimationFrame( this.animate );

    this.render();

  }

  render() {

    this.analyser.getFrequencyData();

    this.uniforms.tAudioData.value.needsUpdate = true;

    this.renderer.render( this.scene, this.camera );

  }

  onResize() {

    this.renderer.setSize( window.innerWidth / 10, window.innerHeight / 10 );

  }

}
