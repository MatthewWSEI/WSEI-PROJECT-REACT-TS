export const callApi = async (
    url: string,
    data: unknown,
    headers?: unknown,
    method: string = "POST"
) => {
    const response = await fetch(`${url}`, {
        method,
        headers: headers
            ? { ...headers, "Content-Type": "application/json" }
            : { "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : null
    });

    if (response.ok) {
        const responseData = await response.json();
        return responseData;
    } else {
        const errorData = await response.json();
        throw new Error(
            `Request failed with status: ${response.status}, message: ${errorData.message}`
        );
    }
};
