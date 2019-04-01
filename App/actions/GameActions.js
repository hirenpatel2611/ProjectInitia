import {SET_TIMER,SET_SCORE} from './types';
import TimerMixin from 'react-timer-mixin';


export const setTimer = () => {
  // return (dispatch) => {
  //   var seconds = 120;
  //   interval = TimerMixin.setInterval(() => {
  //     seconds = seconds - 1;
  //
  //     if (seconds == 0) {
  //       clearInterval(interval);
  //     }
  //     dispatch({
  //       type: SET_TIMER,
  //       payload: seconds
  //     });
  //   }, 1000);
  // }
};



export const setScore = (score) => {
  return (dispatch) => {
    dispatch({
      type: SET_SCORE,
      payload: score+10
    });
  }
};
