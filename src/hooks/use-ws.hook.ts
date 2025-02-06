import { useEffect, useRef, useCallback } from 'react'
import { toast } from 'sonner'

export const useWebsocket = () => {
    const socketRef = useRef<WebSocket | null>(null)

    const handleMessage = useCallback(
        (event: MessageEvent) => {
            const message: {
                type: string
                payload: { message: string }
            } = JSON.parse(event.data)
            console.info('Message received:', message)

            const allowedNotifications = new Set<string>([
                'quote.received',
            ])
            if (allowedNotifications.has(message.type)) {
                switch (message.type) {
                    case 'quote.received':
                        toast(
                            message.payload.message,
                        )
                        break
                }
            }
        },
        []
    )

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!)
        }

        socketRef.current.onmessage = handleMessage

        return () => {
            if (socketRef.current) {
                socketRef.current.close()
            }
        }
    }, [handleMessage])
}
