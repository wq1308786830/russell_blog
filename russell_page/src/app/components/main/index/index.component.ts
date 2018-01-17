import {Component, OnInit} from '@angular/core';
import {LightIntensity} from "../../../services/light-intensity";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {


  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private imageData: ImageData;
// 光源的中心位置
  private sourceX: number = 0.5;
  private sourceY: number = 0.5;
  private lightIntensity: LightIntensity;
  constructor() {
    this.lightIntensity = new LightIntensity(this.sourceX, this.sourceY);
  }

  ngOnInit() {
    const WIDTH = 180;
    const HEIGHT = 180;
    this.canvas = <HTMLCanvasElement> document.querySelector('#canvas');
    this.canvas.height = HEIGHT;
    this.canvas.width = WIDTH;
    this.ctx = this.canvas.getContext('2d');
    this.imageData = this.ctx.getImageData(0, 0, WIDTH, HEIGHT);
    this.ctx.putImageData(this.imageData, 0, 0);

    this.lightIntensity.initPoints(WIDTH, HEIGHT);
    this.lightIntensity.processImageData(this.imageData);

    this.ctx.putImageData(this.imageData, 0, 0);
  }
}
