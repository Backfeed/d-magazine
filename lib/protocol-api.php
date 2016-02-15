<?php
function call_protocol_api($method = 'get', $endpoint, $data = [], $headers = []) {
    $api_url = 'https://api.backfeed.cc/dev/';

    $default_headers = [
        'x-api-key' => 'cU1pjBJDBP1KsHgbVBwO99F02DvWWR9S62kkFGzQ'
    ];
    $headers = array_merge($default_headers, $headers);

    $data = json_encode($data);
    $response = Requests::$method($api_url.$endpoint, $headers, $data);

//    if (!$response->success) throw new Exception('Backfeed Backend returned error');
    return json_decode($response->body);
}