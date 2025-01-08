import { resolve } from 'path';
import { generateApi } from 'swagger-typescript-api';

const environments = {
  dev: {
    url: 'https://petstore.swagger.io/v2/swagger.json',
    output: './apis',
  },
};

const generateApiForEnv = async (env = 'dev') => {
  const config = environments[env];
  if (!config) {
    throw new Error(`Unknown environment: ${env}`);
  }

  const baseConfig = {
    name: 'Api.ts',
    httpClientType: 'fetch',
    generateClient: true,
    generateRouteTypes: true,
    prettier: {
      printWidth: 120,
      tabWidth: 2,
      trailingComma: 'all',
      parser: 'typescript',
    },
  };

  try {
    await generateApi({
      ...baseConfig,
      url: config.url,
      output: resolve(process.cwd(), config.output),
    });
    console.log(`API generated successfully for ${env} environment!`);
  } catch (error) {
    console.error(`Error generating API for ${env}:`, error);
    process.exit(1);
  }
};

(async function main() {
  await generateApiForEnv('dev');
})();
