import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000, // You can specify a port if needed
    https: {
      key: fs.readFileSync('./ssl/etc/live/somezing.me/privkey.pem'),
      cert: fs.readFileSync('./ssl/etc/live/somezing.me/fullchain.pem')
    }
  },
})
