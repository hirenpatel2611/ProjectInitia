
import { Font } from 'expo';


export const LOAD_FONT_SUCCESS = 'ui/LOAD_FONT_SUCCESS';


export const loadFont = () => async dispatch => {
  await Font.loadAsync({
    'open-sans-italic': require('../../assets/fonts/OpenSans-Italic.ttf'),
    'open-sans-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-regular': require('../../assets/fonts/OpenSans-Regular.ttf')
  });

dispatch({
  type:LOAD_FONT_SUCCESS,
})

};
