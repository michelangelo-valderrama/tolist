import 'dotenv/config'
import { get } from 'env-var'

const envs = {
	PORT: get('PORT').required().asPortNumber(),
	DB_URL: get('DB_URL').required().asUrlString(),
	DB_NAME: get('DB_NAME').required().asString(),
	DB_USERNAME: get('DB_USERNAME').required().asString(),
	DB_PASSWORD: get('DB_PASSWORD').required().asString(),
	MODE: get('MODE').required().asEnum(['development', 'production']),
	TOKEN_ALGORITHM: get('TOKEN_ALGORITHM').required().asEnum(['HS256']),
	ACCESS_TOKEN_SECRET: get('ACCESS_TOKEN_SECRET').required().asString(),
	ACCESS_TOKEN_EXPIRES_IN: get('ACCESS_TOKEN_EXPIRES_IN').required().asString(),
	REFRESH_TOKEN_SECRET: get('REFRESH_TOKEN_SECRET').required().asString(),
	REFRESH_TOKEN_EXPIRES_IN: get('REFRESH_TOKEN_EXPIRES_IN')
		.required()
		.asString()
}

export default envs
