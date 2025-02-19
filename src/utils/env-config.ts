import dotenv from 'dotenv'
import process from 'process'
import { container, singleton } from 'tsyringe'

dotenv.config();

@singleton()
export default class EnvConfiguration{
public readonly PORT: number = parseInt(process.env.PORT || '3000')
public readonly MONGO_URI: string = process.env.MONGO_URI
}

export const registerEnvConfigurationDI = () => {
    container.register(EnvConfiguration.name, { useClass: EnvConfiguration})
}