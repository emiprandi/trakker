export default class Api {
  constructor() {
    this.token = '';
    this.apiUri = 'https://www.toggl.com/api/v8';
  }

  base64Encode (string) {
    return btoa(string);
  }

  setToken (key) {
    console.log('token setted:', key);
    this.token = this.base64Encode(key + ':api_token');
  }

  request (endpoint, options = {}) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + this.token
    });

    return fetch(this.apiUri + endpoint, {
      headers: headers
    }).then((response) => {
      return response.json();
    });
  }

  login (user, pass) {
    // sets initial token based on user and password
    this.token = this.base64Encode(user + ':' + pass);

    return this.request('/me').then((response) => {
      const r = response.data;
      // don't really need the full response
      return {
        id: r.id,
        api_token: r.api_token,
        fullname: r.fullname,
        email: r.email,
        image_url: r.image_url,
        default_wid: r.default_wid,
        timezone: r.timezone
      };
    });
  }
}
