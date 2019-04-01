import { combineReducers } from 'redux';
import GameReducer from './GameReducer';
import LoginReducer from './LoginReducer';
import RegisterReducer from './RegisterReducer';

export default combineReducers({
  game: GameReducer,
  login:LoginReducer,
  register:RegisterReducer
});
