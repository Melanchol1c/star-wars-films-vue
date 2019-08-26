import {
  GET_FILM_CHARACTERS,
  RESET_FILM_CHARACTERS,
  GET_CHARACTER_BY_ID,
  RESET_SELECTED_CHARACTER,
} from '@/app/characters/store/actionTypes';
import {
  SET_FILM_CHARACTERS,
  SET_FILM_CHARACTERS_TO_NULL,
  SET_SELECTED_CHARACTER_TO_NULL,
  SET_SELECTED_CHARACTER,
} from '@/app/characters/store/mutationTypes';
import {
  fetchFilmCharacters,
  fetchCharacterById,
} from '@/app/characters/services/characters-service';
import { notify } from '@/helpers';

const state = { filmCharacters: [], selectedCharacter: {} };
const getters = {
  filmCharacters: state => state.filmCharacters,

  selectedCharacter: state => state.selectedCharacter,
};

const mutations = {
  [SET_FILM_CHARACTERS]: (state, payload) => (state.filmCharacters = payload),

  [SET_FILM_CHARACTERS_TO_NULL]: state => (state.filmCharacters = []),

  [SET_SELECTED_CHARACTER]: (state, payload) => (state.selectedCharacter = payload),

  [SET_SELECTED_CHARACTER_TO_NULL]: state => (state.selectedCharacter = {}),
};

const actions = {
  /** Make request to api, get film's characters data and set it to state. */
  [GET_FILM_CHARACTERS]: async (context, id) => {
    try {
      const characters = await fetchFilmCharacters(id);

      context.commit(SET_FILM_CHARACTERS, characters);
    } catch (error) {
      notify('error', 'Server error.');
      throw new Error('Server error', error);
    }
  },

  /** Remove data about characters form state. */
  [RESET_FILM_CHARACTERS]: context => {
    context.commit(SET_FILM_CHARACTERS_TO_NULL);
  },

  /** Make request to api, get character's data and set it to state. */
  [GET_CHARACTER_BY_ID]: async (context, id) => {
    try {
      const character = await fetchCharacterById(id);

      context.commit(SET_SELECTED_CHARACTER, character);
    } catch (error) {
      notify('error', 'Server error.');
      throw new Error('Server error', error);
    }
  },

  /** Remove data about selected character form state. */
  [RESET_SELECTED_CHARACTER]: context => {
    context.commit(SET_SELECTED_CHARACTER_TO_NULL);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
