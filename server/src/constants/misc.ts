import type { CookieOptions } from 'express'

export const refreshTokenCookieOptions: CookieOptions = {
	sameSite: 'strict',
	httpOnly: true,
	secure: true
}
