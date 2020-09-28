import { resolve } from "path";

export default {
    /**
     * Function that mutates the original webpack config.
     * Supports asynchronous changes when a promise is returned (or it's an async function).
     *
     * @param {object} config - original webpack config.
     * @param {object} env - options passed to the CLI.
     * @param {WebpackConfigHelpers} helpers - object with useful helpers for working with the webpack config.
     * @param {object} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
     **/
    webpack(config, env, helpers, options) {
        // Switch css-loader for typings-for-css-modules-loader, which is a wrapper
        // that automatically generates .d.ts files for loaded CSS
        helpers.getLoadersByName(config, "css-loader").forEach(({ loader }) => {
            loader.loader = "typings-for-css-modules-loader";
            loader.options = Object.assign(loader.options, {
                camelCase: true,
                banner:
                    "// This file is automatically generated from your CSS. Any edits will be overwritten.",
                namedExport: true,
                silent: true
            });
        });

        // Use any `index` file, not just index.js
        config.resolve.alias["preact-cli-entrypoint"] = resolve(
            process.cwd(),
            "src",
            "index"
        );

        // TODO: THIS SHOULD BE COMMENTED OUT ON COMMIT, which sucks :D
        if (config.devServer) {
            config.devServer.proxy = [
                {
                    // proxy requests matching a pattern:
                    path: "/api/**",

                    // where to proxy to:
                    target: "http://localhost:3000/api",

                    // optionally change Origin: and Host: headers to match target:
                    changeOrigin: true,
                    changeHost: true,

                    // optionally mutate request before proxying:
                    pathRewrite: function(path, request) {
                        // you can modify the outbound proxy request here:
                        // delete req.headers.referer;

                        // common: remove first path segment: (/api/**)
                        return "/" + path.replace(/^\/[^\/]+\//, "");
                    },

                    // optionally mutate proxy response:
                    onProxyRes: function(proxyRes, req, res) {
                        // you can modify the response here:
                        proxyRes.headers.connection = "keep-alive";
                        proxyRes.headers["cache-control"] = "no-cache";
                    }
                }
            ];
        }

    }
};
