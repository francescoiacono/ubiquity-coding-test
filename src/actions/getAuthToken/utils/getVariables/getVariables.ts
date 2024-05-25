interface EnvVariables {
  API_URL: string;
  API_USERNAME: string;
  API_PASSWORD: string;
}

/**
 * Retrieves the required environment variables for authentication.
 * @returns An object containing the `API_URL`, `API_USERNAME`, and
 * `API_PASSWORD` environment variables.
 * @throws If any of the required environment variables are not set.
 */
export const getVariables = (): EnvVariables => {
  const { API_URL, API_USERNAME, API_PASSWORD } = process.env;

  if (!API_URL) {
    throw new Error('API_URL env var is not set');
  }

  if (!API_USERNAME) {
    throw new Error('API_USERNAME env var is not set');
  }

  if (!API_PASSWORD) {
    throw new Error('API_PASSWORD env var is not set');
  }

  return {
    API_URL,
    API_USERNAME,
    API_PASSWORD,
  };
};
