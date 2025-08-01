
const BASE = 'https://api.themoviedb.org/3';

export async function fetcher<T>(path: string): Promise<T> {
    // 1) Розбираємо query‑параметри
    const params = new URLSearchParams();
    // якщо це деталізація фільму — підтягуємо videos та credits
    if (path.startsWith('/movie/')) {
        params.append('append_to_response', 'videos,credits');
    }
    // 2) Додаємо обовʼязковий ключ
    params.append('api_key', process.env.NEXT_PUBLIC_TMDB_API_KEY!);

    // 3) Складаємо повний URL
    // Якщо в path вже є “?”, то ставимо &, інакше “?”
    const separator = path.includes('?') ? '&' : '?';
    const url = `${BASE}${path}${separator}${params.toString()}`;

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`TMDB fetch error (${res.status}): ${res.statusText}`);
    }
    return res.json();
}
