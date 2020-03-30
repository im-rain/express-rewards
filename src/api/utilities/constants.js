var constants = {
    //Default server port
    SERVER_PORT: 8081,
    //Json extension where data is stored
    JSON_FILE_EX: '.json',
    //ISO format without seconds
    ISO_DATE_FORMAT: 'YYYY-MM-DDThh:mm:ssZ',
    //Date ONLY
    DATE_ONLY_FORMAT: 'YYYY-MM-DD',
    //ISO format regex
    ISO_DATE_REGEX: /^(20|19)\d\d-([0][1-9]|[1][0-2])-([0][1-9]|[1-2][0-9]|[3][0-1])T([0-1][0-9]|[2][0-3]):[0-5][0-9]:[0-5][0-9]Z$/i,

    //Error messages
    NOT_FOUND: 'Not found',
    INVALID_PARAMETER: 'Invalid request parameter',
    REWARD_EXPIRED: 'This reward is already expired',
    SYSTEM_ERROR: 'System error has occured',

    //HTTP status code
    STAT_BAD_REQ: 400,
    STAT_NOT_FOUND: 404,
    STAT_SYS_ERROR: 500,
}

module.exports = constants;