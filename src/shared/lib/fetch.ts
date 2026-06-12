/**
 * A wrapper around `fetch` that converts the response into JSON and casts it to the given type.
 *
 * @param resource the resource to fetch. can be a string or any other object that provides the URL of the resource
 * @param options an object containing the options to apply to the request
 */
export async function fetchJson<T>(resource: RequestInfo, options?: RequestInit): Promise<T> {
    return await fetch(resource, options)
        .then(async res => {
            const json = await res.json();
            if (res.ok) {
                return json
            } else {
                throw new Error(json.message)
            }
        }) as Promise<T>
}
