import SpriteRenderer  from '../gfx/sprite-renderer.js'
import OrthographicCamera from '../gfx/orthographic-camera.js'

export default class Actor {
  x = 0
  y = 0
  width = 0
  height = 0
  imageId = null

  /**
   * 
   * @param {Number} x 
   * @param {Number} y 
   * @param {Number} width 
   * @param {Number} height 
   * @param {String} imageId 
   */
  constructor(x, y, width, height, imageId) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.imageId = imageId
  }

  initialize() {
    console.log('Actor initialize')
  }

  update() {
    console.log('Actor update')
  }

  /**
   * 
   * @param {SpriteRenderer} spriteRenderer 
   * @param {OrthographicCamera} camera 
   */
  draw(spriteRenderer, camera) {
    console.log('Actor draw')
  }
}
