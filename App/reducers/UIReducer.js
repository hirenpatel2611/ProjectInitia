import {
LOAD_FONT_SUCCESS
} from '../actions/ui'

const INITIAL_STATE = {
  fontLoaded:false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case LOAD_FONT_SUCCESS:
      return { ...state,fontLoaded:true}
      break;

      default:
        return state;
        break;
  


  }


}
