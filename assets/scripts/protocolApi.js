let status = (data, textStatus, response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        console.log('Looks like there was a problem. Response: %o', response);
        return new Error(response.statusText)
    }
};

let request = (options) => {
    let ajaxSettings = {
        dataType: 'json',
        data: options.body
    };

    if (options.method) ajaxSettings.method = options.method;

    return jQuery.ajax(Backfeed.ajaxUrl, ajaxSettings)
        .then(status)
        .done(data => data)
        .fail((response, textStatus, errorThrown) => {
            console.log(textStatus, errorThrown);
            return new Error(textStatus);
        })
};

export default {
    getAllContributions() {
        return request({
            method: 'GET',
            body: {
                action: 'get_contributions'
            }
        });
    },
    evaluate(value) {
        return request({
            method: 'POST',
            body: {
                action: 'submit_evaluation',
                value: parseInt(value),
                contribution_id: Backfeed.currentContribution.id,
                evaluator_id: Backfeed.currentAgent.id
            }
        });
    }
}