import { UPDATE_FILM, REMOVE_FILM } from '@/app/admin/store/actionTypes';
import { updateFilmRequest, removeFilmRequest } from '@/app/admin/services/admin-service';
import { notify } from '@/helpers';

const state = {};
const getters = {};
const mutations = {};

const actions = {
  /**
   * Update film action.
   *
   * @param {string} id Film's id.
   * @param {object} data Film's new data.
   */
  [UPDATE_FILM]: async (context, { id, data }) => {
    try {
      await updateFilmRequest(id, data);

      notify('success', `Film "${data.title}" successfully updated.`);
    } catch (error) {
      notify('error', 'Server error.');
      throw new Error('Server error', error);
    }
  },

  /**
   * Remove film action.
   *
   * @param {string} id Film's id.
   */
  [REMOVE_FILM]: async (context, id) => {
    try {
      await removeFilmRequest(id);

      notify('success', `Film successfully removed.`);
    } catch (error) {
      notify('error', 'Server error.');
      throw new Error('Server error', error);
    }
  },
};

export default { namespaced: true, state, getters, mutations, actions };
