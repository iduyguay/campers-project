import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        postcssPresetEnv({
          features: {
            'image-set-function': true,
          },
        }),
      ],
    },
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
});
