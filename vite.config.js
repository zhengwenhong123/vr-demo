import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // base:'./',
  plugins: [vue()],
  server: {
    //使用手机能够访问,使用默认路由
    host: '0.0.0.0'
  }
})
