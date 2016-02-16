const apiKey = 'cU1pjBJDBP1KsHgbVBwO99F02DvWWR9S62kkFGzQ';

/* TODO: get from localize script */
const biddingId = 'c5d77b3d-a56b-43cb-9e99-99be32b822e8';

let protocolApi = {
    request: (endpoint, options, headers) => {
        let apiUrl = 'https://api.backfeed.cc/dev/',
            defaultHeaders = {
                'X-Api-Key': apiKey
            },
            defaultOptions = {
                headers: new Headers(_.extend(defaultHeaders, headers))
            };

        return fetch(apiUrl+endpoint, _.extend(defaultOptions, options))
            .then(res => res.json());
    },
    createUser: () => {
        return protocolApi.request('users', {method: 'POST'});
    },
    getUserById: (userId) => {
        return protocolApi.request('users/'+userId)
    },
    evaluate: (value, userId, contributionId) => {
        return protocolApi.request('evaluations/submit', {
            method: 'POST',
            body: JSON.stringify({
                userId,
                biddingId,
                evaluations: [{
                    contributionId,
                    value
                }]
            })
        });
    }

};

export default protocolApi;