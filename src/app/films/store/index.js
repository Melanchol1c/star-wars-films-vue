import { notify } from '@/helpers';
import { GET_FILM_BY_ID, GET_ALL_FILMS, RESET_SELECTED_FILM } from '@/app/films/store/actionTypes';
import {
  SET_FILMS,
  SET_SELECTED_FILM,
  SET_SELECTED_FILM_TO_NULL,
} from '@/app/films/store/mutationTypes';
import { fetchAllFilms, fetchFilmById } from '@/app/films/services/films-service';

const state = { films: [], selectedFilm: {} };

const getters = {
  films: state => state.films,

  selectedFilm: state => state.selectedFilm,
};

const mutations = {
  [SET_FILMS]: (state, payload) => (state.films = payload),

  [SET_SELECTED_FILM]: (state, payload) => (state.selectedFilm = payload),

  [SET_SELECTED_FILM_TO_NULL]: state => (state.selectedFilm = {}),
};

const actions = {
  /** Get all films action. */
  [GET_ALL_FILMS]: async context => {
    try {
      const films = await fetchAllFilms();

      context.commit(SET_FILMS, films);
    } catch (error) {
      notify('error', 'Server error.');
      throw new Error('Server error', error);
    }
  },

  /** Get single film by id action.
   *
   * @param {string} id Film id.
   */
  [GET_FILM_BY_ID]: async (context, id) => {
    try {
      const film = await fetchFilmById(id);

      context.commit(SET_SELECTED_FILM, film);
    } catch (error) {
      notify('error', 'Server error.');
      throw new Error('Server error', error);
    }
  },

  /** Reset selected film state action. */
  [RESET_SELECTED_FILM]: async context => {
    context.commit(SET_SELECTED_FILM_TO_NULL);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
