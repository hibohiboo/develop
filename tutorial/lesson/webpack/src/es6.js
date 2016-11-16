import 'babel-polyfill';

const sleep = (msec) => new Promise((resolve) => {
  setTimeout(resolve, msec);
});

(async () => {
  console.log('start');
  await sleep(2000);
  console.log('end');
})();