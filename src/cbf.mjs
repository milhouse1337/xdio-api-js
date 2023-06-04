import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const apiUrl = process.env.XDIO_API_URL
const apiToken = process.env.XDIO_API_TOKEN

let apiOptions = {
    headers: {
        'Accept': 'application/json',
        'Authorization': (apiToken ? 'Bearer ' + apiToken : null)
    }
}

const apiFetch = async function (url) {

    return await fetch(url, apiOptions)
        .then((response) => {
            if (response.status === 401) {
                console.log('Invalid API Token.');
                return [];
            }
            return response.json();
        })
        .catch((error) => console.log('Error.', JSON.stringify(error)));
        // .then((error) => console.log('Error.', JSON.stringify(error)));
}

export const getSchedule = async function (region = 8) {

    return await apiFetch(apiUrl + '/v1/schedule?region=' + region);
}

export const getShows = async function (key = 'premiere', region = '8') {

    return await apiFetch(apiUrl + '/v1/shows?key=' + key + '&region=' + region);
}

export const getShow = async function (id, page = 1) {

    return await apiFetch(apiUrl + '/v1/episodes?id=' + id + '&page=' + page);
}

export const getMedias = async function (id) {

    return await apiFetch(apiUrl + '/v1/segments?id=' + id + '&unique=1');
}

export const getMedia = async function (id = 0) {

    return await apiFetch(apiUrl + '/v1/media?id=' + id);
}

export const getLivestream = async function (id = 0) {

    return await apiFetch(apiUrl + '/v1/livestream?id=' + id);
}

export const getRss = async function () {

    return await apiFetch(apiUrl + '/v2/rss');
}

export const getRssExtra = async function () {

    return await apiFetch(apiUrl + '/v2/rss?extra=1');
}

export const getRssShow = async function (id) {

    return await apiFetch(apiUrl + '/v2/rss/show/' + id);
}

export const getStats = async function () {

    return await apiFetch(apiUrl + '/v2/stats');
}

// Todo: Migrate to axios.
async function f(url, options) {
    try {
        const response = await axios.get(url, options);
        return await response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
    // const data = await response.data;
    // return data;
}

export default {
    getSchedule,
    getShows,
    getShow,
    getMedias,
    getMedia,
    getLivestream,
    getRss,
    getRssExtra,
    getRssShow,
    getStats,
};
