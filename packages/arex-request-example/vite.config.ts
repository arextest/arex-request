import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import Icons from 'unplugin-icons/vite';
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/arex-request-runtime/lib/index.js',
          dest: '',
          rename: 'arex-request-runtime.js',
        },
      ],
    }),
    Icons({ compiler: 'jsx', jsx: 'react' }),
  ],
  resolve: {
    alias: {
      'arex-request-core': path.resolve('../arex-request-core/src'),
    },
  },
  base: 'arex-request',
  server: {
    port: 16868,
    proxy: {
      '/report': {
        target: 'http://10.5.153.1:8090',
        changeOrigin: true,
        rewrite: (path) => path.replace('/report', '/api'),
      },
    },
  },
});
