import {URL_BASE} from '../config'

import {Alert} from 'react-native';
import {  Actions } from 'react-native-router-flux';

class Api {
  static headers() {
    let headers = {
      'Content-Type': 'multipart/form-data'
    }
    return headers;
  }

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT')
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST')
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE')
  }

  static xhr(route, params, verb) {
    const host = URL_BASE;
    const url = `${host}${route}`

    // let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    let options = Object.assign({
      method: verb
    }, params ? {
      body: params
    } : null);
    options.headers = Api.headers();

    return fetch(url, options)
      .then((response) => response.json())
      .then((responseJson) => {

        return responseJson;
      })
      .catch((error) => {

        return {
          status: 0,
          message: "something went wrong"
        };
      })
  }
}
export default Api;
