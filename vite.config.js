import {defineConfig} from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJSX from '@vitejs/plugin-vue-jsx';
import styleImport from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
    alias: {
        // 配置路径别名
        '@': path.resolve(__dirname, 'src'),
        'components': path.resolve(__dirname, 'src/components'),
        'view': path.resolve(__dirname, 'src/view'),
        'api': path.resolve(__dirname, 'src/api'),
        'utils': path.resolve(__dirname, 'src/utils'),
        'constants': path.resolve(__dirname, 'src/constants'),
        'directive': path.resolve(__dirname, 'src/directive'),
    },
    plugins: [
        vue(),
        styleImport({
            libs: [
                {
                    libraryName: 'vant',
                    esModule: true,
                    resolveStyle: name => `vant/es/${name}/style`,
                },
            ],
        }),
        vueJSX({
            optimize: true,
        }),
    ],
    server: {
        open: true,
        port: 8888,
        proxy: {
            '/tuling': {
                target: 'http://openapi.turingapi.com/openapi/',
                changeOrigin: true,
                ws: true,
                rewrite: path => path.replace(/^\/tuling/, ''),
            },
        },
    },
});
