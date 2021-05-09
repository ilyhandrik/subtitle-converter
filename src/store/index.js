import Vue from 'vue';
import Vuex from 'vuex';

import parser from '@/parser';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    assFile: '',
    dialogs: [],
    characters: [],
    actors: [
      'Безруков',
      'Михалков',
      'Джонни Депп',
    ],
  },
  mutations: {
    SET_ASS_FILE(state, file) {
      state.assFile = file;
    },
    SET_DIALOGS(state, dialogs) {
      state.dialogs = dialogs;
    },
    SET_CHARACTERS(state, characters) {
      state.characters = characters;
    },
  },
  actions: {
    SET_ASS_FILE({ commit }, file) {
      const dialogs = parser.getDialogs(file);
      commit('SET_ASS_FILE', file);
      commit('SET_DIALOGS', dialogs);
      commit('SET_CHARACTERS', parser.getCharacters(dialogs));
    },
  },
  modules: {
  },
});
