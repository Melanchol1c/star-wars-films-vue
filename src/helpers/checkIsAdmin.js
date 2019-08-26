/**
 * Check admin sign of user by email.
 *
 * @param {string} email User email.
 * @returns {boolean} Returns admin permissions sign.
 */
const checkIsAdmin = email => process.env.VUE_APP_ADMIN_EMAIL === email;

export default checkIsAdmin;
