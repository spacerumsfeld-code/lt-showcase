import type {} from '../.sst/platform/config'

import { allSecrets } from './secret'
import { server } from './server'
import { websocket } from './websocket'

const web = new sst.aws.Nextjs('Web', {
    link: [...allSecrets, websocket, server],
    dev: {
        autostart: true,
        command: 'pnpm run dev',
    },
    environment: {
        NEXT_PUBLIC_SERVER_URL: server.url,
        NEXT_PUBLIC_WEBSOCKET_URL: websocket.url,
    }
})

export const outputs = {
    webUrl: web.url,
}
