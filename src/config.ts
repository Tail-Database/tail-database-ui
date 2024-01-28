const config = {
    ADD_TAIL_URL: process.env.REACT_APP_ADD_TAIL_URL || 'https://mainnet-api.taildatabase.com/tail',
    API_URL: process.env.REACT_APP_API_URL || '',
    AUTH_URL: process.env.REACT_APP_AUTH_URL || 'https://mainnet-api.taildatabase.com/auth',
    GET_TAIL_URL: process.env.REACT_APP_GET_TAIL_URL || '',
    GET_TAILS_URL: process.env.REACT_APP_GET_TAILS_URL || '',
    GET_SEARCH_INDEX_URL: process.env.REACT_APP_GET_SEARCH_INDEX_URL || '',
    SPACESCAN_CAT_URL: process.env.REACT_APP_SPACESCAN_CAT_URL || 'https://api-fin.spacescan.io/cat/transactions/',
    REVEAL_URL: process.env.REACT_APP_REVEAL_URL || 'https://mainnet-api.taildatabase.com/reveal',
};

export default config;
