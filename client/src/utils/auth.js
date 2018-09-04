import { isEmpty } from "lodash";
import jwt from "jsonwebtoken";

const TOKEN_KEY = "jwtToken";
const USER_ID = "userId";
const ROLE_KEY = "userRole";

const parse = JSON.parse;
const stringify = JSON.stringify;

const auth = {
  async authenticate(email, password) {
    try {
      const response = await fetch(`http://localhost:5000/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ email, password }) // body data type must match "Content-Type" header
      });
      const { success, token } = await response.json();

      if (!success || !token) {
        return false;
      }

      auth.setToken(token, true);
      const { userId, userRole } = jwt.decode(token);

      auth.setUserId(userId, true);
      auth.setUserRole(userRole, true);

      return true;
    } catch (error) {
      console.log(error);
    }
  },

  isAuthenticated() {
    return !!auth.getToken();
  },

  isAllowed(allowedRoles) {
    if (auth.getUserRole()) return allowedRoles.includes(auth.getUserRole());
  },

  signout() {
    auth.clearAppStorage();
  },

  async authFetch(url, opts = null) {
    if (auth.getToken()) {
      let response;
      if (opts) {
        response = await fetch(url, {
          ...opts,
          headers: {
            ...opts.headers,
            Authorization: `Bearer ${auth.getToken()}`
          }
        });
      } else {
        response = await fetch(url, {
          ...opts,
          headers: { Authorization: `Bearer ${auth.getToken()}` }
        });
      }

      if (response.status === 401) {
        auth.clearAppStorage();
      }
      return response;
    } else {
      if (opts) {
        return fetch(url, opts);
      } else {
        return fetch(url);
      }
    }
  },

  /**
   * Remove an item from the used storage
   * @param  {String} key [description]
   */
  clear(key) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }

    return null;
  },

  /**
   * Clear all app storage
   */
  clearAppStorage() {
    if (localStorage) {
      localStorage.clear();
    }

    if (sessionStorage) {
      sessionStorage.clear();
    }
  },

  clearToken(tokenKey = TOKEN_KEY) {
    return auth.clear(tokenKey);
  },

  clearUserRole(roleKey = ROLE_KEY) {
    return auth.clear(roleKey);
  },

  clearUserId(userId = USER_ID) {
    return auth.clear(userId);
  },

  /**
   * Returns data from storage
   * @param  {String} key Item to get from the storage
   * @return {String|Object}     Data from the storage
   */
  get(key) {
    if (localStorage && localStorage.getItem(key)) {
      return parse(localStorage.getItem(key)) || null;
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return parse(sessionStorage.getItem(key)) || null;
    }

    return null;
  },

  getToken(tokenKey = TOKEN_KEY) {
    return auth.get(tokenKey);
  },

  getUserRole(roleKey = ROLE_KEY) {
    return auth.get(roleKey);
  },

  getUserId(userId = USER_ID) {
    return auth.get(userId);
  },

  /**
   * Set data in storage
   * @param {String|Object}  value    The data to store
   * @param {String}  key
   * @param {Boolean} isLocalStorage  Defines if we need to store in localStorage or sessionStorage
   */
  set(value, key, isLocalStorage) {
    if (!value) {
      return null;
    }

    if (isLocalStorage && localStorage) {
      return localStorage.setItem(key, stringify(value));
    }

    if (sessionStorage) {
      return sessionStorage.setItem(key, stringify(value));
    }

    return null;
  },

  setToken(value = "", isLocalStorage = false, tokenKey = TOKEN_KEY) {
    return auth.set(value, tokenKey, isLocalStorage);
  },

  setUserRole(value = "", isLocalStorage = false, roleKey = ROLE_KEY) {
    return auth.set(value, roleKey, isLocalStorage);
  },

  setUserId(value = "", isLocalStorage = false, userId = USER_ID) {
    return auth.set(value, userId, isLocalStorage);
  }
};

export default auth;

const fakeAuth = {
  isAuthenticated: false,
  role: "user",
  authenticate() {
    this.isAuthenticated = true;
    this.role = "user";
    setTimeout(() => {
      console.log(
        "Fake authentication success came in from imaginary backend!"
      );
    }, 100); // fake async
  },
  signout() {
    this.isAuthenticated = false;
    setTimeout(() => {
      console.log("Fake signout success!");
    }, 100);
  },
  isAllowed(allowedRoles) {
    return allowedRoles.includes(this.role);
  }
};

export { fakeAuth };
