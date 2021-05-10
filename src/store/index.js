import Vue from 'vue';
import Vuex from 'vuex';

import parser from '@/parser';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentView: '/',
    assFile: '',
    dialogs: [],
    characters: [],
    actors: [
      'Депп',
      'Безруков',
      'Михалков',
      'Боярский',
    ],
  },
  mutations: {
    SET_ASS_FILE(state, file) {
      state.assFile = file;
    },
    SET_ACTORS(state, actors) {
      state.actors = actors;
    },
    SET_DIALOGS(state, dialogs) {
      state.dialogs = dialogs;
    },
    SET_CHARACTERS(state, characters) {
      state.characters = characters;
    },
    SET_CURRENT_VIEW(state, key) {
      state.currentView = key;
    },
    ADD_ACTOR(state, name) {
      state.actors.push(name);
    },
    EDIT_ACTOR(state, { index, newName }) {
      state.actors.splice(index, 1, newName);
    },
  },
  actions: {
    SET_ASS_FILE({ commit }, file) {
      const dialogs = parser.getDialogs(file);
      commit('SET_ASS_FILE', file);
      commit('SET_DIALOGS', dialogs);
      commit('SET_CHARACTERS', parser.getCharacters(dialogs));
    },
    ADD_ACTOR({ commit, state }, actor) {
      if (!(state.actors.indexOf(actor) + 1)) {
        commit('ADD_ACTOR', actor);
      }
    },
    EDIT_ACTOR({ commit, state }, { oldName, newName }) {
      const index = state.actors.indexOf(oldName);
      if (index + 1) {
        commit('EDIT_ACTOR', { index, newName });
      }
    },
  },
  modules: {
  },
});
