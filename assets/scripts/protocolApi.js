let protocolApi = {
    request: (endpoint, options, headers) => {
        let defaultHeaders = {
                'X-Api-Key': Backfeed.apiKey
            },
            defaultOptions = {
                headers: new Headers(_.extend(defaultHeaders, headers))
            };

        return fetch(Backfeed.apiUrl + endpoint, _.extend(defaultOptions, options))
            .then(res => res.json())
            .catch(console.log.bind(console));
    },
    evaluate: (value) => {
        var options = {
            method: 'POST',
            body: JSON.stringify({
                userId: Backfeed.currentAgent.id,
                biddingId: Backfeed.biddingId,
                evaluations: [{
                    contributionId: Backfeed.currentContribution.id,
                    value: value
                }]
            })
        };
        return protocolApi.request('evaluations/submit', options);
    }
};

export default protocolApi;