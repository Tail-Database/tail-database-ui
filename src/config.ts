const config = {
    ADD_TAIL_URL: process.env.REACT_APP_ADD_TAIL_URL || 'https://mainnet-api.taildatabase.com/tail',
    API_URL: process.env.REACT_APP_API_URL || '',
    AUTH_URL: process.env.REACT_APP_ADD_TAIL_URL || 'http://mainframe.taildatabase.com:8080/auth',
    GET_TAIL_URL: process.env.REACT_APP_GET_TAIL_URL || '',
    GET_TAILS_URL: process.env.REACT_APP_GET_TAILS_URL || '',
    GET_SEARCH_INDEX_URL: process.env.REACT_APP_GET_SEARCH_INDEX_URL || '',
};

export default config;
