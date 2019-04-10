import { combineReducers } from 'redux';
import GameReducer from './GameReducer';
import LoginReducer from './LoginReducer';
import RegisterReducer from './RegisterReducer';
import UIReducer from './UIReducer'

export default combineReducers({
  game: GameReducer,
  login:LoginReducer,
  register:RegisterReducer,
  ui:UIReducer
});
