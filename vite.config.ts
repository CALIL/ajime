import { defineConfig } from 'vite'
import pugPlugin from "vite-plugin-pug"
import reactRefresh from '@vitejs/plugin-react-refresh'

const options = { pretty: true } // FIXME: pug pretty is deprecated!
const locals = { name: "My Pug" }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), pugPlugin(options, locals)]
})
