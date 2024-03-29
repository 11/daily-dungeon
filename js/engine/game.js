import Keyboard from './io/keyboard.js'
import Mouse from './io/mouse.js'
import SceneManager from './scenes/scene-manager.js'
import AssetManager from './assets/asset-manager.js'
import Viewport from './gfx/viewport.js'

export default class Game {
  debug = false
  canvas = null
  ctx = null
  viewport = null

  inputManager = null
  mouse = null
  keyboard = null

  sceneManager = null
  assetManager = null

  /**
   * 
   * @param {String} canvasId 
   */
  constructor(canvasId = 'canvas') {
    try {
      this.canvas = document.querySelector(canvasId)
      this.ctx = this.canvas.getContext('2d')
    } catch (error) {
      console.error(`Could not find canvas with id: ${canvasId}`)
    }

    // screen details
    this.viewport = new Viewport(this.canvas)

    // managing inputs
    this.inputManager = null 
    this.keyboard = new Keyboard(this.canvas)
    this.keyboard.create()
    this.mouse = new Mouse(this.canvas, null)
    this.mouse.create()

    // manage different screens
    this.sceneManager = new SceneManager()

    // manage game
    this.assetManager = new AssetManager()
  }

  /**
   * 
   * @param {String} id 
   * @param {String} image 
   */
  addImage(id, image) {
    this.assetManager.add(id, image)
  }

  /**
   * 
   * @param {String} id 
   * @param {String} screen 
   */
  addScene(id, screen) {
    if (typeof id !== 'string') {
      console.error('Scene id must be a string')
    }

    this.sceneManager.addScreen(id, screen)
  }

  setScene(id) {
    if (!this.sceneManager.hasScreen(id)) {
      console.error(`Scene with id ${id} does not exist`)
    }

    this.sceneManager.setScreen(id)
    this.sceneManager.initialize()
  }

  #update() {
    this.sceneManager.update()
  }

  #draw() {
    this.sceneManager.draw(this.ctx)
  }

  start() {
    this.#update()
    this.#draw()

    requestAnimationFrame(this.start.bind(this))
  }

  end() {
    this.keyboard.destroy()
    this.mouse.destroy()
  }

  /**
   * @param {InputProcessor} value
   */
  set InputManager(value) {
    if (!value) {
      console.error('Input Processor cannot be null')
    }

    this.inputManager = value  
    this.mouse.InputManager = value
  }

  get SceneManager() {
    return this.sceneManager
  }
  
  get AssetManager() {
    return this.assetManager
  }

  get RenderContext() {
    return this.ctx
  }

  get Viewport() {
    return this.viewport
  }

  get Debug() {
    return this.debug
  }

  /**
   * @param {Boolean} value
   */
  set Debug(value) {
    this.debug = value
  }
}
