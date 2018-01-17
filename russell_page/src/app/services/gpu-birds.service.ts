import { Injectable } from '@angular/core';
import * as THREE from "three";

@Injectable()
export class GpuBirdsService {

  vector = new THREE.Vector3();
  _width = 500; _height = 500; _depth = 200; _goal; _neighborhoodRadius = 100;
  _maxSpeed = 4; _maxSteerForce = 0.1; _avoidWalls = false;

  position = new THREE.Vector3();
  velocity = new THREE.Vector3();
  _acceleration = new THREE.Vector3();

  constructor() {
  }





  setGoal ( target ) {

    this._goal = target;

  };

  setAvoidWalls ( value ) {

    this._avoidWalls = value;

  };

  setWorldSize ( width, height, depth ) {

    this._width = width;
    this._height = height;
    this._depth = depth;

  };

}
