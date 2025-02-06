import type {} from '../.sst/platform/config'

export const secret = {
    LtApiKey: new sst.Secret('LtApiKey'),
}

export const allSecrets = Object.values(secret)
