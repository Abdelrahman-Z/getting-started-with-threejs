import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // Set the root directory to `src`
  build: {
    outDir: '../dist', // Output built files to `dist` outside `src`
  },
  server: {
    open: true, // Automatically open the app in the browser
  },
});
