import { assert, test } from 'vitest';
import api from '../src/cbf.mjs';

test('fetch schedule', async () => {
    const data = await api.getSchedule();

    assert.ok(data);
    assert.equal(data.premiere.codeName, 'cbf');
})

test('fetch shows', async () => {
    const data = await api.getShows();

    assert.ok(data);
    assert.equal(data[0].globalId, 1327);
})

test('fetch show (episodes)', async () => {
    const data = await api.getShow(1327);

    assert.ok(data);
    assert.equal(data.meta.title, 'Le 15-18');
    assert.equal(data.items.length, 25);
})

test('fetch episode (segments)', async () => {
    const data = await api.getMedias(706018);

    assert.ok(data);
    assert.equal(data[0], 8764331);
})

test('fetch media', async () => {
    const data = await api.getMedia(8764331);

    assert.ok(data);
    assert.equal(data['url'], 'https://rcavmedias-static.akamaized.net/mp4/33586e14-e82e-4969-a219-e201b348fd5c/2023-04-28_15_06_00_le1518_0000_128.mp4');
    assert.equal(data['type'], 'mp4');
})

test('fetch live', async () => {
    const data = await api.getLivestream('cbf');

    assert.ok(data);
    assert.equal(data['url'], 'https://rcavliveaudio.akamaized.net/hls/live/2006635/P-2QMTL0_MTL/master.m3u8');
    assert.equal(data['type'], 'hls');
})

