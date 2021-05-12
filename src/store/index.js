import Vue from 'vue';
import Vuex from 'vuex';

import parser from '@/parser';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentView: '/',
    assFile: '',
    fileName: '',
    dialogs: [],
    characters: [],
    actors: [],
    characterToActorMap: {},
  },
  mutations: {
    SET_ASS_FILE(state, data) {
      state.assFile = data;
    },
    SET_ASS_FILE_NAME(state, name) {
      state.fileName = name.replace('.ass', '');
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
    ASSIGN_CHARACTERS_TO_ACTOR(state, { character, actor }) {
      if (state.characterToActorMap[character] === actor) {
        state.characterToActorMap[character] = null;
      } else {
        state.characterToActorMap[character] = actor;
      }
    },
    ASSIGN_ALL_CHARACTERS_TO_ACTOR(state, actor) {
      Object.keys(state.characterToActorMap).forEach((character) => {
        if (!state.characterToActorMap[character]) {
          state.characterToActorMap[character] = actor;
        }
      });
    },
    REMOVE_ALL_CHARACTERS_TO_ACTOR(state, actor) {
      Object.keys(state.characterToActorMap).forEach((character) => {
        if (state.characterToActorMap[character] === actor) {
          state.characterToActorMap[character] = null;
        }
      });
    },
    SET_CHARACTER_TO_ACTOR_MAP(state, map) {
      state.characterToActorMap = map;
    },
  },
  actions: {
    SET_ASS_FILE({ commit, state }, { data, fileName }) {
      const dialogs = parser.getDialogs(data)
        .sort((a, b) => (parser.getTime(a.start) - parser.getTime(b.start)));
      const map = {};
      commit('SET_ASS_FILE', data);
      commit('SET_ASS_FILE_NAME', fileName);
      commit('SET_DIALOGS', dialogs);
      commit('SET_CHARACTERS', parser.getCharacters(dialogs));
      state.characters.forEach((character) => {
        map[character] = null;
      });
      commit('SET_CHARACTER_TO_ACTOR_MAP', map);
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
    FILL_FROM_JSON({ commit, state }, data) {
      const map = {};
      const actors = {};
      data.forEach((row) => {
        if (({}).hasOwnProperty.call(state.characterToActorMap, row.character)) {
          map[row.character] = row.actor;
          actors[row.actor] = row.actor;
        }
      });
      commit('SET_ACTORS', Object.keys(actors).map((key) => (key)));
      commit('SET_CHARACTER_TO_ACTOR_MAP', { ...state.characterToActorMap, ...map });
    },
  },
  getters: {
    actorToCharacters(state) {
      const actors = {};
      state.actors.forEach((actor) => {
        actors[actor] = [];
      });
      Object.keys(state.characterToActorMap).forEach((key) => {
        if (state.characterToActorMap[key]) {
          actors[state.characterToActorMap[key]].push(key);
        }
      });
      return Object.keys(actors).map((actor) => ({
        actor,
        characters: actors[actor],
      }));
    },
    characterToActor(state) {
      return Object.keys(state.characterToActorMap)
        .map((key) => ({
          character: key,
          actor: state.characterToActorMap[key],
        }))
        .reduce((acc, curr) => {
          if (curr.actor) {
            acc.push(curr);
          }
          return acc;
        }, []);
    },
  },
  modules: {
  },
});
