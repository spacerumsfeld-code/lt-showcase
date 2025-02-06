import { Resource } from 'sst'
import { restClient} from '~/clients/rest.client'
import { IAlbum } from './photo.model'

const baseArgs = {
    url: Resource.LtApiUrl.value,
    headers: {
        'lt_api_key': Resource.LtApiKey.value
    }
}

export const getAlbums = async () => {
    const albums = await restClient.get<IAlbum[]>({
        ...baseArgs,
        url: `${baseArgs.url}/albums`
    })
    return albums
}

const photoService = {
    getAlbums
}

export { photoService}