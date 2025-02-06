import type {} from '../.sst/platform/config'
import { table } from './dynamo'

export const websocket = new sst.aws.ApiGatewayWebSocket('WebsocketApi')

websocket.route('$connect', {
    handler: 'src/functions/connect.handler',
    link: [websocket, table],
})

websocket.route('$disconnect', {
    handler: 'src/functions/disconnect.handler',
    link: [websocket, table],
})
