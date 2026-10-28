/** @prose
 * # The build
 *
 * One Vite+ config packs the package, builds the site and checks it. `vp pack` writes ESM with
 * its types, and runs publint, which fails the build on a package npm would serve badly.
 *
 * `vp build` builds the site from `index.html` into `dist/`, which
 * [cloudflare.config.ts](cloudflare.config.ts) names, and `pnpm ship` uploads it. The format,
 * lint and browsers are the ones [craftz's rules](https://craftz.amitkaps.com/docs/rules.md) ask
 * every config to write out.
 */
import { defineConfig } from "vite-plus";

export default defineConfig({
  // The site is the folder `prose build` writes.
  publicDir: ".prose",

  pack: {
    entry: ["src/index.ts"],
    format: ["esm"],
    platform: "node",
    // Oxc writes the types, so there's no typescript dependency, and fails on an export
    // whose type isn't written out.
    dts: { generator: "oxc" },
    clean: true,
    fixedExtension: false,
    publint: { strict: true },
  },

  test: {
    expect: { requireAssertions: true },
    include: ["tests/**/*.test.ts"],
  },

  lint: {
    plugins: ["typescript", "unicorn", "import"],
    categories: { correctness: "error" },
    options: { typeAware: true, typeCheck: true },
  },

  fmt: { proseWrap: "never" },

  build: { target: ["chrome142", "edge142", "firefox153", "safari18.6", "ios18.6"] },

  /** @prose
   * # Verify
   *
   * `verify` runs `all`, whose tasks run side by side, as
   * [craftz's rules](https://craftz.amitkaps.com/docs/rules.md#scripts-verify) say. The site's
   * build empties `dist/`, where `vp pack` writes too, so it's the `web` task, which waits for
   * `build`. The site is what's left in `dist/`.
   */
  run: {
    cache: false,
    tasks: {
      web: { command: "vp build", dependsOn: ["build"] },
      all: { command: "true", dependsOn: ["check", "test", "build", "web"] },
    },
  },
});
