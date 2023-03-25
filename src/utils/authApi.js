class AuthApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  checkToken(token){
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(res => this._checkResponce(res));
  }

  registerUser(email, password){
    return fetch(this._url + '/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    }).then(res => this._checkResponce(res));
  }

  loginUser(email, password){
    return fetch(this._url + '/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    }).then(res => this._checkResponce(res));
  }

  _checkResponce(res) {
    if (res.ok)
      return res.json();

    return Promise.reject(`Ошибка Auth: ${res.status}`);
  }
}

const authApi = new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co',
});

export default authApi;
