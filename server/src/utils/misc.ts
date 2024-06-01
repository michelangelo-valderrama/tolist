import envs from '../config/envs'

export function isDev(): boolean {
	return envs.MODE === 'development'
}
