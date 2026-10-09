import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  { ignores: ['dist/', 'test/legacy.cjs'] },
  js.configs.recommended,
  ...vue.configs['flat/essential'],
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  // eslint-plugin-vue 不解析 pug 模板，看不到模板裡用到的變數
  { files: ['**/*.vue'], rules: { 'no-unused-vars': 'off' } }
]
