import gameConfig from '../redux/gameConfig.js';
import SoundEffectManager from 'sound-effect-manager';

export default class SoundManager {
  construct() {
    const musicFileURL = gameConfig.current.musicFileURL;
    const soundFileURL = gameConfig.current.soundFileURL;

    this.soundEffectManager = new SoundEffectManager();
    this.soundEffectManager.loadFile(musicFileURL, 'music');
    this.soundEffectManager.loadFile(soundFileURL, 'sound');
  }

  playMusic() {
    this.soundEffectManager.play('music', true);
  }

  playBombSound() {
    this.soundEffectManager.play('sound');
  }

  stopMusic() {
    this.soundEffectManager.stop('music');
  }

  stopSound() {
    this.soundEffectManager.stop('sound');
  }
}
