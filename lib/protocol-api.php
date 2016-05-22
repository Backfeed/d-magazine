<?php
namespace Backfeed;

class Api {
    private static function request($method = 'GET', $endpoint, $data = [], $headers = []) {
        $default_headers = [];
        $headers = array_merge($default_headers, $headers);

        if (empty($data)) $data = null;

        $url = BACKFEED_API_URL.$endpoint;

        try {
            $response = \Requests::request($url, $headers, $data, $method);
        } catch (Exception $e) {
            error_log('Backfeed API failed: ' . $e->getMessage() . '\n');
        }

        if (!$response->success) {
            error_log('Backfeed API returned meh: ' . json_encode($response) . '\n');
            //TODO: set up proper error handling
            //throw new \Exception('Backfeed Backend returned error');
            return false;
        }

        return json_decode($response->body);
    }

    public static function create_agent($referrer_id = null, $reputation = null, $tokens = null) {
        $request_parameters = [];
        if (!is_null($referrer_id)) $request_parameters['referrer_id'] = (int) $referrer_id;
        if (!is_null($reputation)) $request_parameters['reputation'] = (float) $reputation;
        if (!is_null($tokens)) $request_parameters['tokens'] = (float) $tokens;
        return self::request('POST', 'users', $request_parameters);
    }

    public static function get_agent($agent_id) {
        return self::request('GET', 'users/'.$agent_id);
    }

    public static function create_contribution($agent_id) {
        return self::request('POST', 'contributions', [
            "contributor_id" => (int) $agent_id
        ]);
    }

    public static function create_evaluation($vote, $contribution_id, $agent_id) {
        //if (!$contribution_id) get_config('currentContribution')->id;
        //if (!$agent_id) get_config('currentAgent')->id;

        return self::request('POST', 'evaluations', [
            "evaluator_id" => intval($agent_id),
            "contribution_id" => intval($contribution_id),
            "value" => intval($vote)
        ]);
    }

    public static function get_contributions($start = null, $limit = null) {
        $data = [];
        if (!empty($start)) $data['start'] = intval($start);
        if (!empty($limit)) $data['limit'] = intval($limit);
        return self::request('GET', 'contributions', $data);
    }

    public static function get_contribution($contribution_id, $field = '') {
        $response = self::request('GET', 'contributions/' . $contribution_id);
        return empty($field) ? $response : $response->$field;
    }

    public static function get_evaluations($contribution_id = null, $evaluator_id = null) {
        $data = [];
        if (!empty($contribution_id)) $data['contribution_id'] = (int) $contribution_id;
        if (!empty($evaluator_id)) $data['evaluator_id'] = (int) $evaluator_id;
        return self::request('GET', 'evaluations', $data);
    }
}