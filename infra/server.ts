import type {} from '../.sst/platform/config'

import { allSecrets } from './secret'

export const server = new sst.aws.Function("Server", {
    url: true,
    handler: "src/clients/api.client",
    link: [...allSecrets]
  });

  export const outputs = {
    serverUrl: server.url,
}