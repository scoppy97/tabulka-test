import Phaser from 'phaser';
/** Phaser adaptér připravený pro samostatný renderer města. Prototyp používá úsporný DOM izometrický renderer. */
export class CityScene extends Phaser.Scene {constructor(){super('CityScene');}create(){this.events.emit('ready');}}
