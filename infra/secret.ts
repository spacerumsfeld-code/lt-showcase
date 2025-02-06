import type {} from '../.sst/platform/config'

export const secret = {
    LtApiKey: new sst.Secret('LtApiKey'),
    LtApiUrl: new sst.Secret('LtApiUrl'),
}

export const allSecrets = Object.values(secret)
