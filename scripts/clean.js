import { pico, run } from './utils.js';

(async () => {
  const res = await run('rimraf', ['-g', '**/dist', '**/node_modules']);
  console.log(
    pico.bgRed(pico.white(`${res.durationMs}ms`)),
    pico.blue(`${res.escapedCommand}`),
  );
})();
