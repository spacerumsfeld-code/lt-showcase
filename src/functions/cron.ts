import { APIGatewayProxyHandler } from 'aws-lambda'
import { getAllConnections, deleteConnection } from '~/clients/table.client'
import { sendMessage } from '~/clients/ws.client'
import { quoteService } from '~/core/quote/quote.service'
import { handleAsync } from '~/utils/async'

export const handler: APIGatewayProxyHandler = async () => {
    const [connections, getConnectionsError] = await handleAsync(getAllConnections())
    if (getConnectionsError) {
        console.error('Error fetching connections:', getConnectionsError)
        return { statusCode: 500, body: 'Error fetching connections' }
    }

    const [quote, quoteError] = await handleAsync(quoteService.getRandomQuote())
    if (quoteError) {
        console.error('Error fetching quote:', quoteError)
        return { statusCode: 500, body: 'Error fetching quote' }
    }

   await Promise.allSettled(connections!.map(async (connectionId) => {
        try {
            await sendMessage(connectionId, JSON.stringify({ type: 'quote.received', payload: { message: `${quote!.quote} - ${quote!.author}` } }))
            return { success: true, connectionId }
        } catch (error) {
            if (error instanceof Error && error.name === 'GoneException') {
                await deleteConnection(connectionId)
            }
            return { success: false, connectionId, error }
        }
    }))

    return { statusCode: 200, body: 'Cron Job Executed' }
}
