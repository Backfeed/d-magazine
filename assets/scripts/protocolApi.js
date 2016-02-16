let protocolApi = {
    request: (endpoint, options, headers) => {
        let apiUrl = 'https://api.backfeed.cc/dev/',
            defaultHeaders = {
                'X-Api-Key': 'cU1pjBJDBP1KsHgbVBwO99F02DvWWR9S62kkFGzQ'
            },
            defaultOptions = {
                headers: new Headers(_.extend(defaultHeaders, headers))
            };

        return fetch(apiUrl + endpoint, _.extend(defaultOptions, options))
            .then(res => res.json());
    },
    createUser: () => {
        return protocolApi.request('users', {method: 'POST'});
    },
    getUserById: (userId) => {
        return protocolApi.request('users/'+userId)
    }

};

export default protocolApi;