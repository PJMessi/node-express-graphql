import axios from 'axios';

const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user')) || {},
};

const getters = {
  isLoggedIn: (state) => !!state.token,
  authStatus: (state) => state.status,
  authUser: (state) => state.user,
};

const actions = {
  login({ commit }, credential) {
    return new Promise((resolve, reject) => {
      commit('auth_request');

      const requestBody = {
        query: `
                query {
                    login(email: "${credential.email}", password: "${credential.password}") {
                    token, user {_id, email}
                    }
                }
            `,
      };

      axios({
        url: 'http://localhost:3000/graphql',
        data: requestBody,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => {
          localStorage.setItem('token', res.data.data.login.token);
          localStorage.setItem(
            'user',
            JSON.stringify(res.data.data.login.user)
          );

          axios.defaults.headers.common = {
            "Authorization": res.data.data.login.token
          };

          commit('auth_success', res.data.data.login);

          resolve(res);
        })
        .catch((err) => {
          commit('auth_error');
          reject(err);
        });
    });
  },

  logout({ commit }) {
    // Removing token from local storage and Vuex.
    commit('logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  },
};

const mutations = {
  auth_request(state) {
    state.status = 'loading';
  },

  auth_success(state, data) {
    state.status = 'success';
    state.token = data.token;
    state.user = data.user;
  },

  auth_error(state) {
    state.status = 'failed';
  },

  logout(state) {
    state.status = '';
    state.token = '';
    state.user = '';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
