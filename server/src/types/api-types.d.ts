type ExpressRequest = import('express').Request

export namespace ApiTypes {
  type Request = ExpressRequest & {
    ctx?: { decodedToken: RefreshTokenPayload }
  }

  interface AccessTokenPayload {
    user_id: string
    secret: string
    iat: number
  }

  interface RefreshTokenPayload {
    user_id: string
    iat: number
  }

  type Db = {
    connect: () => void
    close: () => void
  }
}
