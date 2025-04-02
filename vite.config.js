import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// import fs from 'fs';

// Use Node.js utilities to resolve paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'), // Fix: Ensure './src' matches root folder structure
        },
    },
    // server: {
    //     https: {
    //         key: fs.readFileSync('./localhost-key.pem'),
    //         cert: fs.readFileSync('./localhost-cert.pem'),
    //     },
    // },
});
