import typescript from 'rollup-plugin-typescript2'
import pluginJson from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
const path =require('path')
const customResolver = resolve({
    extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss']
  });
const projectRootDir = path.resolve(__dirname);
console.log(path.resolve(projectRootDir, 'src'))
export default {
    input: 'src/index.ts',
    // external:['vue','vue-router'],
    output: [
        {
            file: 'dist/index.umd.js',
            name: 'Lury',
            format: 'umd' ,
            globals: {
                vue: 'Vue',
                'vue-router':'VueRouter'
            }
        },
        {
            file:'dist/index.esm.js',
            format:'es'
        }
    ],
    plugins: [ alias({
        entries: [
          {
            find: '@',
            replacement: path.resolve(projectRootDir, './src')
            // OR place `customResolver` here. See explanation below.
          }
        ],
        customResolver
      }),
      resolve(), commonjs(),pluginJson(), typescript({ useTsconfigDeclarationDir: true, clean: true })]
};