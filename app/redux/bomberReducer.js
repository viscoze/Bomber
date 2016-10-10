const defaultState = {
  players:  [],
  bombs:    [],
  boxes:    [],
  splashes: [],
  isPause:  false,
  isEnd:    false,
  message:  "",
};

const bomberReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'RENDER_PLAYERS': {
      const { players } = action.payload;
      return Object.assign({}, state, { players });
    }

    case 'CREATE_BOX': {
      const { boxes } = action.payload;
      return Object.assign({}, state, { boxes });
    }

    case 'CREATE_BOMB': {
      const { players, bombs } = action.payload;
      return Object.assign({}, state, { players, bombs });
    }

    case 'EXPLODE_BOMB': {
      const { splashes, boxes, players } = action.payload;
      return Object.assign({}, state, { splashes, boxes, players });
    }

    case 'REMOVE_SPLASHES': {
      const { splashes } = action.payload;
      return Object.assign({}, state, { splashes });
    }

    case 'REMOVE_BOMB': {
      const { bombs } = action.payload;
      return Object.assign({}, state, { bombs });
    }

    case 'END_GAME': {
      const { message } = action.payload;
      return Object.assign({}, state, { isEnd: true, message });
    }

    case 'PAUSE_GAME': {
      const { isPause } = action.payload;
      return Object.assign({}, state, { isPause });
    }

    case 'CLEAR_ARENA': {
      return Object.assign({}, defaultState);
    }

    case 'NOTHING': {
      return state;
    }

    default:
      return state;
  }
};

export default bomberReducer;
