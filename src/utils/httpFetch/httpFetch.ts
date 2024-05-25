/**
 * Performs an HTTP fetch request.
 *
 * @param url - The URL to fetch.
 * @param options - The fetch options.
 * @returns A Promise that resolves to the response.
 * @throws An error if the response is not successful.
 */
export const httpFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  return fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  });
};
