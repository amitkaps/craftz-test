/** @prose
 * # The Worker
 *
 * What Cloudflare runs: its name, compatibility date, domain and how it serves the files. Keep
 * the name equal to the Worker connected to this repository in the dashboard. The build and
 * deploy commands are set on the Worker, as craftz's rules list. The site answers only on its
 * domain, so `workers.dev` and preview URLs are off.
 */

export default {
  worker: {
    name: "craftz-test",
    domains: ["craftz-test.amitkaps.com"],
    assets: {
      directory: "dist",
    },
    compatibilityDate: "2026-10-19",
    workersDev: false,
    previewUrls: false,
  },
};
