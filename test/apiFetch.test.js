import { afterEach, expect, test, vi } from 'vitest';
import api from '../src/cbf.mjs';

afterEach(() => vi.unstubAllGlobals());

const mockFetch = (status, body) =>
    vi.stubGlobal('fetch', vi.fn(async () => new Response(body, { status })));

test('apiFetch returns parsed JSON on success', async () => {
    mockFetch(200, '{"meta":{"title":"Le 15-18"}}');

    const data = await api.apiFetch('/v2/rss/show/1327');

    expect(data.meta.title).toBe('Le 15-18');
});

test('apiFetch throws on a non-2xx response (e.g. 429)', async () => {
    mockFetch(429, '{"message":"Too Many Attempts."}');

    await expect(api.apiFetch('/v2/rss/show/1327')).rejects.toThrow('HTTP 429');
});
