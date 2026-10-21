/** @prose
 * # The build
 *
 * One Vite+ config packs the package, builds the site and checks it. `craftz()` sets the format,
 * lint and build the rules ask for, so this config holds only what's its own. `vp pack` writes ESM
 * with its types, and runs publint, which fails the build on a package npm would serve badly. The
 * Cloudflare plugin writes an assets-only Build Output, which `cf deploy --prebuilt` uploads as it
 * is. The Worker itself is in [cloudflare.config.ts](cloudflare.config.ts).
 */
import { defineConfig } from "vite-plus";
import { craftz } from "@amitkaps/craftz";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [craftz(), cloudflare({ assetsOnly: true })],

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
});
