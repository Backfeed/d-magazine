let protocolApi = {
    request: (options, headers) => {
        let defaultHeaders = {},
            defaultOptions = {
                headers: new Headers(_.extend(defaultHeaders, headers))
            };

        return fetch(Backfeed.ajaxUrl, _.extend(defaultOptions, options))
            .then(res => res.json())
            .catch(console.log.bind(console));
    },
    evaluate: (value) => {
        return protocolApi.request({
            method: 'POST',
            body: JSON.stringify({
                action: 'submit_evaluation',
                value: value
            })
        });
    }
};

export default protocolApi;