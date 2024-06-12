import type { Response } from 'express'
import type { ApiTypes } from '../../types/api-types'
import HTTP_STATUS from '../../constants/http-status'
import { refreshTokenCookieOptions } from '../../constants/misc'
import { ApiResponse } from '../../utils/api-response'
import {
	checkSecret,
	createAccessToken,
	createRefreshToken,
	createSecret,
	verifyRefreshToken
} from '../../utils/auth'
import ApiError from '../../utils/error'
import { User, UserCreatePublic } from './schemas'
import * as usersService from './service'

export async function singup(req: ApiTypes.Request): Promise<ApiResponse> {
	const { name, email } = req.body

	await usersService.userExists(name, email)

	const userCreatePublic: UserCreatePublic = req.body
	const userCreate = User.create(userCreatePublic)

	const user = await usersService.addUser(userCreate)

	return new ApiResponse(
		'User created successfully',
		User.public(user),
		HTTP_STATUS.CREATED_201
	)
}

export async function login(
	req: ApiTypes.Request,
	res: Response
): Promise<ApiResponse> {
	const user = req.body.user as User

	const refreshToken = createRefreshToken(user.id)
	const secret = createSecret(refreshToken)
	await usersService.updateSecret(user.id, secret)

	const accessToken = createAccessToken(user.id, secret)

	res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions)
	return new ApiResponse('User successfully logged in', { accessToken })
}

export async function refreshToken(
	req: ApiTypes.Request,
	res: Response
): Promise<ApiResponse> {
	// get refresh token
	const refreshToken = req.cookies.refreshToken
	if (!refreshToken) {
		throw new ApiError(HTTP_STATUS.BAD_REQUEST_400, 'No refresh token provided')
	}

	// verify refresh token
	let refreshTokenPayload: ApiTypes.RefreshTokenPayload
	try {
		refreshTokenPayload = verifyRefreshToken(refreshToken)
	} catch (error) {
		throw new ApiError(HTTP_STATUS.UNAUTHORIZED_401, 'Invalid refresh token')
	}

	const user = await usersService.getUser(refreshTokenPayload.user_id)
	if (!user) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND_404, 'User not found')
	}

	// check if the refresh token is valid
	if (!user.secret || !checkSecret(refreshToken, user.secret)) {
		throw new ApiError(HTTP_STATUS.UNAUTHORIZED_401, 'Invalid refresh token')
	}

	const newRefreshToken = createRefreshToken(user.id)
	const secret = createSecret(newRefreshToken)
	await usersService.updateSecret(user.id, secret)

	const newAccessToken = createAccessToken(user.id, secret)

	res.cookie('refreshToken', newRefreshToken, refreshTokenCookieOptions)
	return new ApiResponse('ok', { accessToken: newAccessToken })
}

export async function getMe(req: ApiTypes.Request): Promise<ApiResponse> {
	const userId = req.ctx!.decodedToken.user_id
	const user = await usersService.getUser(userId)
	return new ApiResponse('User retreived', User.public(user))
}
