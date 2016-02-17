let protocolApi = {
    request: (endpoint, options, headers) => {
        let defaultHeaders = {
                'X-Api-Key': Backfeed.apiKey
            },
            defaultOptions = {
                headers: new Headers(_.extend(defaultHeaders, headers))
            };

        return fetch(Backfeed.apiUrl + endpoint, _.extend(defaultOptions, options))
            .then(res => res.json());
    },
    createUser: () => {
        return protocolApi.request('users', {method: 'POST'});
    },
    getUserById: (userId) => {
        return protocolApi.request('users/'+userId)
    },
    evaluate: (value) => {
        return protocolApi.request('evaluations/submit', {
            method: 'POST',
            body: JSON.stringify({
                userId: Backfeed.userId,
                biddingId: Backfeed.biddingId,
                evaluations: [{
                    contributionId: Backfeed.contributionId,
                    value
                }]
            })
        });
    }

};

export default protocolApi;