import 'dotenv/config'
import { get } from 'env-var'

const envs = {
	PORT: get('PORT').required().asPortNumber(),
	DB_URL: get('DB_URL').required().asUrlString(),
	DB_NAME: get('DB_NAME').required().asString(),
	DB_USERNAME: get('DB_USERNAME').required().asString(),
	DB_PASSWORD: get('DB_PASSWORD').required().asString(),
	MODE: get('MODE').required().asEnum(['development', 'production'])
}

export default envs
