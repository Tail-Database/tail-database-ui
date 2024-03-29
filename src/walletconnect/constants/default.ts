export const DEFAULT_MAIN_CHAINS = [
    // mainnets
    'chia:mainnet',
];

export const DEFAULT_TEST_CHAINS = [
    // testnets
    'chia:testnet',
];

export const DEFAULT_CHAINS = [...DEFAULT_MAIN_CHAINS, ...DEFAULT_TEST_CHAINS];

export const DEFAULT_PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || '861949836c055b3e7f42beb3fc501b71';
export const DEFAULT_RELAY_URL = process.env.NEXT_PUBLIC_RELAY_URL || 'wss://relay.walletconnect.com';

export const DEFAULT_LOGGER = 'debug';

export const DEFAULT_APP_METADATA = {
    name: 'Tail Database',
    description: 'Chia Asset Token Database',
    url: 'https://www.taildatabase.com/',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export enum DEFAULT_CHIA_METHODS {
    CHIA_SEND_TRANSACTION = 'chia_sendTransaction',
    CHIA_NEW_ADDRESS = 'chia_getNextAddress',
    CHIA_LOG_IN = 'chia_logIn',
    CHIA_SIGN_MESSAGE_BY_ADDRESS = 'chia_signMessageByAddress',
    CHIA_SIGN_MESSAGE_BY_ID = 'chia_signMessageById',
    CHIA_GET_WALLET_SYNC_STATUS = 'chia_getSyncStatus',
}

export enum DEFAULT_CHIA_EVENTS {}

type RelayerType = {
    value: string | undefined;
    label: string;
};

export const REGIONALIZED_RELAYER_ENDPOINTS: RelayerType[] = [
    {
        value: DEFAULT_RELAY_URL,
        label: 'Default',
    },

    {
        value: 'wss://us-east-1.relay.walletconnect.com/',
        label: 'US',
    },
    {
        value: 'wss://eu-central-1.relay.walletconnect.com/',
        label: 'EU',
    },
    {
        value: 'wss://ap-southeast-1.relay.walletconnect.com/',
        label: 'Asia Pacific',
    },
];
