let protocolApi = {
    request: (options) => {
        /*let defaultHeaders = {},
            defaultOptions = {
                headers: new Headers(_.extend(defaultHeaders, headers))
            };

        return fetch(Backfeed.ajaxUrl, _.extend(defaultOptions, options))
            .then(res => res.json())
            .catch(console.log.bind(console));*/
        
        return jQuery.ajax({
            url: Backfeed.ajaxUrl,
            type: options.type,
            dataType: "json",
            data: options.body,
            success: function(response) {
                debugger;
            },
            error: function(response) {
                debugger;
            }
        });
    },
    evaluate: (value) => {
        return protocolApi.request({
            type: 'post',
            body: {
                action: 'submit_evaluation',
                value: parseInt(value),
                contributionId: Backfeed.currentContribution.id,
                agentId: Backfeed.currentAgent.id
            }
        });
    }
};

export default protocolApi;