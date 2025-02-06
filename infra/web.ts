import type {} from '../.sst/platform/config'

import { allSecrets } from './secret'
import { server } from './server'

const web = new sst.aws.Nextjs('Web', {
    link: [...allSecrets, server],
    dev: {
        autostart: true,
        command: 'pnpm run dev',
    },
    environment: {
        NEXT_PUBLIC_SERVER_URL: server.url,
    }
})

export const outputs = {
    webUrl: web.url,
}
