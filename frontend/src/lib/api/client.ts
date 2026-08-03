const ApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!ApiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL not set");
}

export { ApiBaseUrl };

export async function handleResponse<T>(
    res: Response
): Promise<T> {

    if (!res.ok) {

        let message = "Request Failed";

        try {
            const err = await res.json();
            message = err.error || message;
        } catch {}

        throw new Error(message);
    }

    return res.json();
}