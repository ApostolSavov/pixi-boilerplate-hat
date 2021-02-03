import { Container, Sprite, Text } from 'pixi.js'
import gsap from 'gsap'
import config from '../config'

export default class MagicHat extends Container {
    constructor() {
        super()
        this._item = null
        this._body = null
        this.name = 'magic-hat'

        this._tl = gsap.timeline()

        this._init()
    }

    /**
     * Handler for the hat click - generates a random emoji and aniamtes it and the hat
     * @private
     */
    _onClick() {
        this._item.text = config.emojis[Math.floor(Math.random() * config.emojis.length)]
        this._tl
            .seek(0)
            .clear()
            .to(this._body.scale,
                {
                    y: 1.1,
                    yoyo: true,
                    duration: 0.7,
                    ease: 'elastic'
                })
            .to(this._item,
                {
                    y: -200,
                    ease: 'elastic(1.5, 0.7)',
                    duration: 1
                }, '<')
    }

    /**
     * Creates and applies the mask to the emoji object
     * @private
     */
    _applyMask() {
        const mask = new Sprite.from('hatMask')
        mask.anchor.set(0.5)
        mask.y = -200
        mask.x = 0
        this._item.mask = mask
        this.addChild(mask)
    }

    /**
     * Creates the hat sprite and adds it to the scene
     * @private
     */
    _createHat() {
        this._body = new Sprite.from('hat')
        this._body.anchor.set(0.5, 1)
        this._body.x = 0
        this._body.y = 320
        this._body.interactive = true
        this._body.buttonMode = true
        this.addChild(this._body)

    }

    /**
     * Creates the emoji text object and adds it to the scene
     * @private
     */
    _createEmoji() {
        this._item = new Text('🍏', { fontSize: 180 })
        this._item.anchor.set(0.5)
        this._item.y = 200

        this.addChild(this._item)
    }


    /**
     * Initializes the class functionality and display objects
     * @private
     */
    _init() {
        this._createHat()
        this._createEmoji()
        this._applyMask()

        this._onClick()

        this._body.on('click', () => this._onClick())
    }
}