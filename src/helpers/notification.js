import Vue from 'vue';

/**
 * Push notification method.
 * @param {string} type Notification type (warn, success, error).
 * @param {string} text Notification text.
 * @param {string} title Notification title.
 */
const notify = (type, text, title = '') => {
  Vue.notify({
    title,
    text,
    type,
  });
};

export default notify;
