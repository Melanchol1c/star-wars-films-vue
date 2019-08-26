import { update, remove } from '@/helpers';

/**
 * Make update api request.
 *
 * @param {string} id Film's id.
 * @param {object} data New film's data.
 */
export const updateFilmRequest = async (id, data) => await update(id, 'films', data);

/**
 *
 * @param {string} id Film's id.
 */
export const removeFilmRequest = async id => await remove('films', id);
