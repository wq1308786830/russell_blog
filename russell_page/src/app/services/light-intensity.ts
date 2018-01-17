/**
 * 某点的光照强度计算
 */
export class LightIntensity {

  private N: number = 64;
  private sourceX: number;
  private sourceY: number;
  private points: number[] = [];

  constructor(sourceX: number, sourceY: number) {
    this.sourceX = sourceX;
    this.sourceY = sourceY;
  }

  initPoints(width, height) {
    for (let y = 0, i = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // x / W, y / H 其值被限制在 [0, 1] 之间
        this.points[i++] = Math.floor(Math.min(
          this.sample(x / width, y / height) * 255, 255)
        );
      }
    }
  }

  processImageData(imageData: ImageData) {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = this.points[i / 4];
      data[i + 1] = this.points[i / 4];
      data[i + 2] = this.points[i / 4];
      data[i + 3] = 255;
    }
  }


  sample(x: number, y: number) {
    let sum = 0;
    for (let i = 0; i < this.N; i++) {
      // 以下为三种不同的采样方式
      // const theta = Math.PI * 2 * Math.random();           // 随机采样
      // const theta = Math.PI * 2 * i / N;                   // 分层采样（stratified sampling）
      const theta = Math.PI * 2 * (i + Math.random()) / this.N;    // 抖动采样（jittered sampling）
      // trace() 所返回的值是点 (x, y) 从 theta 方向获取的光
      sum += this.trace(x, y, Math.cos(theta), Math.sin(theta));
    }
    return sum / this.N;
  }

  /**
   *
   * @param {number} ox
   * @param {number} oy
   * @param {number} dx
   * @param {number} dy
   * @returns {number}
   */
  trace(ox: number, oy: number, dx: number, dy: number) {
    const MAX_STEP = 10;
    const MAX_DISTANCE = 2;
    const EPSILON = 1e-6;
    let t = 0.0;
    for (let i = 0; i < MAX_STEP && t < MAX_DISTANCE; i++) {
      const sd = this.circleSDF(ox + dx * t, oy + dy * t, this.sourceX, this.sourceY, 0.1);
      // 此时已到达发光的圆形表面
      if (sd < EPSILON) {
        return 2.0;
      }
      // 继续增加步进的距离
      t += sd;
    }
    return 0.0;
  }

  /**
   * 带符号距离场（signed distance field, SDF）
   * @param {number} x
   * @param {number} y
   * @param {number} cx
   * @param {number} cy
   * @param {number} r
   * @returns {number}
   */
  circleSDF(x: number, y: number, cx: number, cy: number, r: number) {
    const ux = x - cx;
    const uy = y - cy;
    return Math.sqrt(ux * ux + uy * uy) - r;
  }

}
