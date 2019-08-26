import NProgress from 'nprogress';

/** Start loader method. */
const startLoader = () => NProgress.start();

/** Finish loader method. */
const finishLoader = () => NProgress.done();

export { startLoader, finishLoader };
