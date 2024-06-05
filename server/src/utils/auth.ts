import bcrypt from 'bcrypt'
import Jwt from './jwt'
import envs from '../config/envs'
import { ApiTypes } from '../types/api-types'

/**
 * Create an access token
 *
 * @param {string} userId - The user ID
 * @returns {string} The access token
 */
function createAccessToken(userId: string): string {
	return Jwt.sign({ user_id: userId }, envs.ACCESS_TOKEN_SECRET, {
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
function verifyAccessToken(token: string) {
	return Jwt.verify<ApiTypes.AccessTokenPayload>(
		token,
		envs.ACCESS_TOKEN_SECRET
	)
}

function hashPassword(password: string): string {
	return bcrypt.hashSync(password, 10)
}

function comparePassword(password: string, hashedPassword: string): boolean {
	return bcrypt.compareSync(password, hashedPassword)
}

export { createAccessToken, verifyAccessToken, hashPassword, comparePassword }
