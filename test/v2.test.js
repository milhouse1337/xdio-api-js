import { assert, expect, test } from 'vitest';
import api from '../src/cbf.js';

test('fetch rss', async () => {
    const data = await api.getRss();

    assert.ok(data);
    assert.equal(data[0], 33);
    // assert.equal(data[0], 'À la semaine prochaine');
})

test('fetch rss extra', async () => {
    const data = await api.getRssExtra();

    assert.ok(data);
    assert.equal(data[0].id, 33);
    assert.equal(data[0].title, 'Le Radiojournal');
})

test('fetch stats', async () => {
    const data = await api.getStats();
    
    assert.ok(data);
    expect(data.shows).toBeGreaterThan(488);
}, 20000)

