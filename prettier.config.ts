import { config } from '@erwanjugand/prettier-config'
import type { Config } from 'prettier'

const localPlugins: Config['plugins'] = ['@prettier/plugin-oxc']
const localConfig: Config = { ...config, plugins: [...(config.plugins ?? []), ...localPlugins] }

export default localConfig
