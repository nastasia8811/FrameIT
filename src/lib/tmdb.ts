const BASE = "https://api.themoviedb.org/3";

export async function fetcher<T>(path: string, init?: RequestInit): Promise<T> {
    const isMovieDetails = /^\/movie\/\d+$/.test(path);

    const params = new URLSearchParams();
    if (isMovieDetails) params.append("append_to_response", "videos,credits");

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    if (!apiKey) throw new Error("Missing NEXT_PUBLIC_TMDB_API_KEY");
    params.append("api_key", apiKey);

    const sep = path.includes("?") ? "&" : "?";
    const url = `${BASE}${path}${sep}${params.toString()}`;

    const res = await fetch(url, init);
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`TMDB fetch error (${res.status}): ${res.statusText}. ${text}`);
    }
    return res.json() as Promise<T>;
}
