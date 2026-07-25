import Phaser from 'phaser';
/** Scéna bojových efektů; pravidla zůstávají v čisté doménové vrstvě. */
export class BattleScene extends Phaser.Scene {constructor(){super('BattleScene');}create(){this.events.emit('ready');}}
