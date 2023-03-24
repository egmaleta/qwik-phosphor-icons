import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';

export default defineConfig(() => {
  return {
    build: {
      target: 'es2020',
      lib: {
        entry: [
          'index',
          'thin',
          'light',
          'regular',
          'bold',
          'fill',
          'duotone',
        ].map((entry) => `./src/${entry}.ts`),
        formats: ['es', 'cjs'],
        fileName: (format, name) =>
          `${name}.qwik.${format === 'es' ? 'mjs' : 'cjs'}`,
      },
    },
    plugins: [qwikVite()],
  };
});
