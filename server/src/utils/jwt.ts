import jwt from 'jsonwebtoken'

const Jwt = {
	sign: (payload: object, secret: string, options: jwt.SignOptions) => {
		return jwt.sign(payload, secret, options)
	},
	verify: <T extends jwt.JwtPayload>(token: string, secret: string) =>
		jwt.verify(token, secret) as T,
	decode: (token: string) => jwt.decode(token)
}

export default Jwt
