import envs from '../config/envs'

export const isDev = ((): boolean => {
  return envs.MODE === 'dev'
})()
