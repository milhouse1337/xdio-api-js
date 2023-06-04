import dotenv from 'dotenv'
import axios from 'axios'

let apiUrl = '';
let apiToken = '';

const getApiHeaders = function() {
    return {
        headers: {
            'Accept': 'application/json',
            'Authorization': (apiToken ? 'Bearer ' + apiToken : null)
        }
    };
}

const setApiUrl = function(url) {

    return apiUrl = url;
}

const setApiToken = function (token) {

    return apiToken = token;
}

const apiFetch = async function (url) {

    return await fetch(url, getApiHeaders())
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

const getSchedule = async function (region = 8) {

    return await apiFetch(apiUrl + '/v1/schedule?region=' + region);
}

const getShows = async function (key = 'premiere', region = '8') {

    return await apiFetch(apiUrl + '/v1/shows?key=' + key + '&region=' + region);
}

const getShow = async function (id, page = 1) {

    return await apiFetch(apiUrl + '/v1/episodes?id=' + id + '&page=' + page);
}

const getMedias = async function (id) {

    return await apiFetch(apiUrl + '/v1/segments?id=' + id + '&unique=1');
}

const getMedia = async function (id = 0) {

    return await apiFetch(apiUrl + '/v1/media?id=' + id);
}

const getLivestream = async function (id = 0) {

    return await apiFetch(apiUrl + '/v1/livestream?id=' + id);
}

const getRss = async function () {

    return await apiFetch(apiUrl + '/v2/rss');
}

const getRssExtra = async function () {

    return await apiFetch(apiUrl + '/v2/rss?extra=1');
}

const getRssShow = async function (id) {

    return await apiFetch(apiUrl + '/v2/rss/show/' + id);
}

const getStats = async function () {

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

// Load dotenv by default if available.
if (typeof process === 'object') {
    dotenv.config();
    setApiUrl(process.env.XDIO_API_URL);
    setApiToken(process.env.XDIO_API_TOKEN);
}

export default {
    setApiUrl,
    setApiToken,
    apiFetch,
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
