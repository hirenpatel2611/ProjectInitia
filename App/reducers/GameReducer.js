import {
  SET_TIMER,
  SET_SCORE
} from '../actions/types'

const INITIAL_STATE = {
  time: 120,
  score: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SET_TIMER:
      return { ...state,time:action.payload}
      break;

    case SET_SCORE:
      return { ...state,score:action.payload}
      break;

    default:
      return INITIAL_STATE;
      break;

  }


}
