import { ApiGatewayManagementApi, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi'
import { Resource } from 'sst'

const client = new ApiGatewayManagementApi({
    endpoint: Resource.WebsocketApi.managementEndpoint,
})

export const sendMessage = async (connectionId: string, message: string) => {
    try {
        const command = new PostToConnectionCommand({
            Data: message,
            ConnectionId: connectionId
        })

        await client.send(command)
    } catch (error) {
        console.error('Error sending message', error)
    }
}