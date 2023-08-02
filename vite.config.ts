/// <reference types="vitest" />

import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { splitVendorChunkPlugin } from 'vite';
import istanbul from 'vite-plugin-istanbul';
import { defineConfig } from 'vitest/config';
import path = require('path');

let apiConfig;
if (process.env.BACKEND_ENABLED === 'true') {
  // Hot-reload and e2e: For using the gateway server, but also hot-reload via serve:
  // Start the package.json with "serve:be" command
  // Please start your BE microservices and make sure that after login to localhost:8080, you go to localhost:8079.
  apiConfig = {
    target: 'http://localhost:8080',
    changeOrigin: true,
  };
} else {
  // for json-mock-server:
  apiConfig = {
    target: 'http://localhost:3000',
    changeOrigin: true,
    rewrite: path => {
      return path.replace(/^\/api/, '');
    },
  };
}

let devServerProxyConfig = {
  '/api': apiConfig,
  '/oauth': {
    target: 'http://localhost:8080',
    changeOrigin: true,
  },
};

if (process.env.BACKEND_AUTH === 'true') {
  const byPassed = {
    '/api/user-info': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
    '/perform-logout': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  };
  devServerProxyConfig = { ...byPassed, ...devServerProxyConfig };
  // eslint-disable-next-line no-console
  console.warn('Authentication requests will go through the local backend, configuration is:');
  // eslint-disable-next-line no-console
  console.info(devServerProxyConfig);
}

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/theme/element-variables.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
    istanbul({
      include: ['src/*'],
      exclude: ['node_modules', 'test/'],
      extension: ['.js', '.ts', '.vue'],
      cypress: true,
      requireEnv: true,
      forceBuildInstrument: true,
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        { 'element-plus/es': ['ElMessage', 'ElMessageBox'] },
        'vue-i18n',
        {
          from: 'vue',
          imports: ['toValue'],
        },
        {
          from: 'vue',
          imports: ['DeepReadonly', 'WritableComputedRef', 'UnwrapNestedRefs', 'MaybeRef', 'MaybeRefOrGetter'],
          type: true,
        },
        {
          from: 'vue-router',
          imports: [
            'RouteLocationRaw',
            'RouteLocationNormalized',
            'RouteLocationNormalizedLoaded',
            'RouteRecordName',
            'NavigationGuardNext',
            'NavigationGuard',
            'NavigationFailureType',
            'RouteMeta',
          ],
          type: true,
        },
      ],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      // dirs: ['src/composables', 'src/stores'],
      dts: true,
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
      dirs: [],
      // globalNamespaces: ['Icons', 'UseForm'],
    }),
    VueI18nPlugin({
      include: path.resolve(__dirname, './src/locales/**'),
      compositionOnly: false,
      strictMessage: false,
    }),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@route-types': path.resolve(__dirname, './src/router/route-types.ts'),
      '@routes': path.resolve(__dirname, './src/router/routes.ts'),
    },
  },
  preview: {
    port: 8079,
  },
  server: {
    proxy: devServerProxyConfig,
  },
  build: {
    sourcemap: true,
  },
  test: {
    environment: 'jsdom',
    include: ['**/*.unit.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    typecheck: {
      checker: 'vue-tsc',
      ignoreSourceErrors: true,
    },
    reporters: ['default', 'junit'],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['lcov', 'html'],
      reportsDirectory: 'coverage-vitest',
    },
    outputFile: 'tests/vitest-junit.xml',
    deps: {
      inline: ['element-plus'],
    },
  },
});
