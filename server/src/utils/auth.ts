import bcrypt from 'bcrypt'
import Jwt from './jwt'
import type { ApiTypes } from '../types/api-types'
import envs from '../config/envs'

/**
 * Create an access token
 *
 * @param {string} userId - The user ID
 * @returns {string} The access token
 */
export function createAccessToken(userId: string, secret: string): string {
	return Jwt.sign({ user_id: userId, secret }, envs.ACCESS_TOKEN_SECRET, {
		expiresIn: envs.ACCESS_TOKEN_EXPIRES_IN,
		algorithm: envs.TOKEN_ALGORITHM
	})
}

/**
 * Verify an access token
 *
 * @param {string} token - The access token
 * @returns The decoded token
 */
export function verifyAccessToken(token: string) {
	return Jwt.verify<ApiTypes.AccessTokenPayload>(
		token,
		envs.ACCESS_TOKEN_SECRET
	)
}

export function createRefreshToken(userId: string): string {
	return Jwt.sign({ user_id: userId }, envs.REFRESH_TOKEN_SECRET, {
		expiresIn: envs.REFRESH_TOKEN_EXPIRES_IN,
		algorithm: envs.TOKEN_ALGORITHM
	})
}

export function verifyRefreshToken(token: string) {
	return Jwt.verify<ApiTypes.RefreshTokenPayload>(
		token,
		envs.REFRESH_TOKEN_SECRET
	)
}

export function hashPassword(password: string): string {
	return bcrypt.hashSync(password, 10)
}

export function comparePassword(
	password: string,
	hashedPassword: string
): boolean {
	return bcrypt.compareSync(password, hashedPassword)
}

export function createSecret(token: string): string {
	return bcrypt.hashSync(token, 10)
}

export function checkSecret(token: string, secret: string): boolean {
	return bcrypt.compareSync(token, secret)
}
