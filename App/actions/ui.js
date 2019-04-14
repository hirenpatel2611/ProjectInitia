
import { Font } from 'expo';


export const LOAD_FONT_SUCCESS = 'ui/LOAD_FONT_SUCCESS';


export const loadFont = () => async dispatch => {
  await Font.loadAsync({
    'open-sans-italic': require('../../assets/fonts/OpenSans-Italic.ttf'),
    'open-sans-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
    'circular-book':require('../../assets/fonts/CircularStd-Book.ttf'),
    'circular-bold':require('../../assets/fonts/CircularStd-Bold.ttf')

  });

dispatch({
  type:LOAD_FONT_SUCCESS,
})

};
