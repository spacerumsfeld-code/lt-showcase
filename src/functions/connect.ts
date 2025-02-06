import { APIGatewayProxyHandler } from 'aws-lambda'
import { addConnection } from '~/clients/table.client'

export const handler: APIGatewayProxyHandler = async (event) => {
    const connectionId = event.requestContext.connectionId
    await addConnection(connectionId!)

    return { statusCode: 200, body: 'Websocket Connected' }
}
