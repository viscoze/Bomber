export default {
  bombExplodeDelay:    3000,
  splashesRemoveDelay: 2000,
  bonusExpireDelay:    6000,
  maxUserBombNumber:   2,
  bombSound:           10,
  musicSound:          10,
  letterColor:         "rgba(255, 255, 255, 0.7)",
  defaultDelayValue:   0,
  musicFileURL:        "../assets/music/background_music.mp3",
  soundFileURL:        "../assets/music/blow_sound.mp3",

  colors: {
    colorOfFirstPlayer:   "rgba(255, 153, 20, 0.4)",
    colorOfSecondPlayer:  "rgba(20, 239, 255, 0.4)",
    colorOfSplash:        "rgba(250, 255, 10, 0.4)",
    colorOfBox:           "rgba(78, 94, 95, 0.4)",
    colorOfBonus:         "rgba(127, 0, 255, 0.4)",
    colorOfBomb:          "rgba(255, 14, 10, 0.4)",
    colorOfCell:          "rgba(255,255,255, 0.4)",
    colorOfColumn:        "rgba(255,255,255, 0.7)",
  },

  arenaData: {
    width:            734,
    height:           475,
    numberOfColumns:  11,
    numberOfRows:     7,
    sizeOfBlock:      65,
    sizeOfPlayer:     55,
    sizeOfBonus:      35,
    sizeOfBomb:       45,
    sizeOfBonusType:  25,
    deltaOfPlayer:    5,
    deltaOfBonus:     15,
    deltaOfBomb:      10,
    deltaOfBonusType: 20,
  }
};
