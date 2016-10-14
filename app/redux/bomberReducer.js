const defaultState = {
  players:  [],
  bombs:    [],
  boxes:    [],
  splashes: [],
  bonuses:  [],
  isPause:  false,
  isEnd:    false,
  message:  "",
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'RENDER_PLAYERS': {
      const { players } = action.payload;
      return { ...state, players };
    }

    case 'CREATE_BOX': {
      const { boxes } = action.payload;
      return { ...state, boxes };
    }

    case 'CREATE_BOMB': {
      const { players, bombs } = action.payload;
      return { ...state, players, bombs };
    }

    case 'RENDER_BONUSES': {
      const { bonuses } = action.payload;
      return { ...state, bonuses };
    }

    case 'EXPLODE_BOMB': {
      const { splashes, boxes, players, bonuses } = action.payload;
      return { ...state, splashes, boxes, players, bonuses };
    }

    case 'REMOVE_SPLASHES': {
      const { splashes } = action.payload;
      return { ...state, splashes };
    }

    case 'REMOVE_BOMB': {
      const { bombs } = action.payload;
      return { ...state, bombs };
    }

    case 'END_GAME': {
      const { message } = action.payload;
      return { ...state, isEnd: true, message };
    }

    case 'PAUSE_GAME': {
      const { isPause } = action.payload;
      return { ...state, isPause };
    }

    case 'CLEAR_ARENA': {
      return { ...defaultState };
    }

    case 'NOTHING': {
      return state;
    }

    default:
      return state;
  }
};
