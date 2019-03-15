

import Base64 from './Base64'

class Helper {
  static decodeJWTToken(token) {
    var user = {};
    if (typeof token !== 'undefined') {
        var encoded = token.split('.')[1];
        user = JSON.parse(this.urlBase64Decode(encoded));
    }
    return user;
  }


  static urlBase64Decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'Illegal base64url string!';
    }
    return Base64.atob(output);
  }
}

export default Helper
