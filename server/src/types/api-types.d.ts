type ExpressRequest = import('express').Request

export namespace ApiTypes {
	type Request = ExpressRequest & {
		ctx?: { decodedToken: AccessTokenPayload }
	}
	interface AccessTokenPayload {
		user_id: string
		secret: string
		iat: number
		exp: number
	}

	interface RefreshTokenPayload {
		user_id: string
		iat: number
		exp: number
	}
}
