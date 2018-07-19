import 'phaser';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import TitleScene from './scenes/TitleScene';

let debug = true;

const config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: false,
    backgroundColor: '#000',
    parent: 'content',
    width: 320,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            debug: debug
        }
    },
    pixelArt: true,
    scene: [
        BootScene,
        TitleScene,
        GameScene
    ]
};

const game = new Phaser.Game(config);
