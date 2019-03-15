import {  Actions } from 'react-native-router-flux';


class Api {
  static headers() {
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
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
        Logger.trace(responseJson, window.console.trace());
        return responseJson;
      })
      .catch((error) => {
        Logger.error(error, window.console.trace());
        return {
          status: 0,
          message: "something went wrong"
        };
      })
  }
}
export default Api;
