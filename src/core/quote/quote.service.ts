import { restClient } from "~/clients/rest.client"
import { IQuote } from "./quote.model"
import { Resource } from "sst"

const baseArgs = {
    url: Resource.ZenQuoteApiUrl.value,
    headers: {},
}

const getRandomQuote = async () => {
    const quote = await restClient.get<IQuote[]>({
        ...baseArgs,
        url: `${baseArgs.url}/random`
    })
    return {
        quote: quote![0]!.q,
        author: quote![0]!.a
    }
}

const quoteService = {
    getRandomQuote
}

export { quoteService }