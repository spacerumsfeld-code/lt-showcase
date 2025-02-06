import { APIGatewayProxyHandler } from 'aws-lambda'
import { deleteConnection } from '~/clients/table.client'

export const handler: APIGatewayProxyHandler = async (event) => {
    const connectionId = event.requestContext.connectionId
    await deleteConnection(connectionId!)

    return { statusCode: 200, body: 'Disconnected' }
} 