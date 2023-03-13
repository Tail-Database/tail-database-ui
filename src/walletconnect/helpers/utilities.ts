export const LOCALSTORAGE_KEY_TESTNET = 'TESTNET';
export const INITIAL_STATE_TESTNET_DEFAULT = false;

export function ellipseAddress(address = '', width = 10): string {
    return `${address.slice(0, width)}...${address.slice(-width)}`;
}

export function setLocaleStorageTestnetFlag(value: boolean): void {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(LOCALSTORAGE_KEY_TESTNET, `${value}`);
    }
}

export function getLocalStorageTestnetFlag(): boolean {
    if (typeof window === 'undefined') return false;
    let value = INITIAL_STATE_TESTNET_DEFAULT;
    const persisted = window.localStorage.getItem(LOCALSTORAGE_KEY_TESTNET);
    if (!persisted) {
        setLocaleStorageTestnetFlag(value);
    } else {
        value = persisted === 'true' ? true : false;
    }
    return value;
}
