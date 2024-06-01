import pino from 'pino'

const customLevels = {
	error: 40,
	warn: 30,
	info: 20,
	success: 10
}

const logger = pino({
	customLevels,
	level: 'success',
	useOnlyCustomLevels: true,
	formatters: {
		bindings: (b) => ({ pid: b.pid }),
		level: (l) => ({ level: l.toUpperCase() })
	},
	timestamp: pino.stdTimeFunctions.isoTime,
	transport: {
		target: 'pino-pretty'
	}
})

const Logger = {
	error: (err: unknown, message: string) => logger.error(err, message),
	warn: (message: string) => logger.warn(message),
	info: (message: string) => logger.info(message),
	success: (message: string) => logger.success(message),
	db: (event: string, message: string, id?: string) =>
		logger.info({ event, id }, message)
}

export default Logger
