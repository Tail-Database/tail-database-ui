import Client from '@walletconnect/sign-client';
import { PairingTypes, SessionTypes } from '@walletconnect/types';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState, useRef } from 'react';

import { DEFAULT_APP_METADATA, DEFAULT_LOGGER, DEFAULT_PROJECT_ID, DEFAULT_RELAY_URL } from '../constants';
import { getSdkError } from '@walletconnect/utils';

import { getRequiredNamespaces } from '../helpers/namespaces';

/**
 * Types
 */
interface IContext {
    client: Client | undefined;
    session: SessionTypes.Struct | undefined;
    connect: (pairing?: { topic: string }) => Promise<void>;
    disconnect: () => Promise<void>;
    isInitializing: boolean;
    chains: string[];
    relayerRegion: string;
    pairings: PairingTypes.Struct[];
    accounts: string[];
    setChains: any;
    setRelayerRegion: any;
}

/**
 * Context
 */
export const ClientContext = createContext<IContext>({} as IContext);

/**
 * Provider
 */
export function ClientContextProvider({ children }: { children: ReactNode | ReactNode[] }) {
    const [client, setClient] = useState<Client>();
    const [pairings, setPairings] = useState<PairingTypes.Struct[]>([]);
    const [session, setSession] = useState<SessionTypes.Struct>();

    const [isInitializing, setIsInitializing] = useState(false);
    const prevRelayerValue = useRef<string>('');

    const [accounts, setAccounts] = useState<string[]>([]);

    const [chains, setChains] = useState<string[]>([]);
    const [relayerRegion, setRelayerRegion] = useState<string>(DEFAULT_RELAY_URL!);

    const reset = () => {
        setSession(undefined);
        setAccounts([]);
        setChains([]);
        setRelayerRegion(DEFAULT_RELAY_URL!);
    };

    const onSessionConnected = useCallback(async (_session: SessionTypes.Struct) => {
        console.log('in onSessionConnected')
        const allNamespaceAccounts = Object.values(_session.namespaces)
            .map((namespace) => namespace.accounts)
            .flat();
        const allNamespaceChains = Object.keys(_session.namespaces);

        setSession(_session);
        setChains(allNamespaceChains);
        setAccounts(allNamespaceAccounts);
    }, []);

    const connect = useCallback(
        async (pairing: any) => {
            console.log('in connect')
            if (typeof client === 'undefined') {
                throw new Error('WalletConnect is not initialized');
            }
            console.log('connect, pairing topic is:', pairing?.topic);
            try {
                const requiredNamespaces = getRequiredNamespaces(chains);
                console.log('requiredNamespaces config for connect:', requiredNamespaces);

                const { uri, approval } = await client.connect({
                    pairingTopic: pairing?.topic,
                    requiredNamespaces,
                });

                // Open QRCode modal if a URI was returned (i.e. we're not connecting an existing pairing).
                if (uri) {
                    QRCodeModal.open(uri, () => {
                        console.log('EVENT', 'QR Code Modal closed');
                    });
                }

                const session = await approval();
                console.log('Established session:', session);
                await onSessionConnected(session);
                // Update known pairings after session is connected.
                setPairings(client.pairing.getAll({ active: true }));
            } catch (e) {
                console.error(e);
                // ignore rejection
            } finally {
                // close modal in case it was open
                QRCodeModal.close();
            }
        },
        [chains, client, onSessionConnected]
    );

    const disconnect = useCallback(async () => {
        if (typeof client === 'undefined') {
            throw new Error('WalletConnect is not initialized');
        }
        if (typeof session === 'undefined') {
            throw new Error('Session is not connected');
        }
        await client.disconnect({
            topic: session.topic,
            reason: getSdkError('USER_DISCONNECTED'),
        });
        // Reset app state after disconnect.
        reset();
    }, [client, session]);

    const _subscribeToEvents = useCallback(
        async (_client: Client) => {
            console.log('subbing to events')
            if (typeof _client === 'undefined') {
                throw new Error('WalletConnect is not initialized');
            }

            _client.on('session_ping', (args) => {
                console.log('EVENT', 'session_ping', args);
            });

            _client.on('session_event', (args) => {
                console.log('EVENT', 'session_event', args);
            });

            _client.on('session_update', ({ topic, params }) => {
                console.log('EVENT', 'session_update', { topic, params });
                const { namespaces } = params;
                const _session = _client.session.get(topic);
                const updatedSession = { ..._session, namespaces };
                onSessionConnected(updatedSession);
            });

            _client.on('session_delete', () => {
                console.log('EVENT', 'session_delete');
                reset();
            });
        },
        [onSessionConnected]
    );

    const _checkPersistedState = useCallback(
        async (_client: Client) => {
            if (typeof _client === 'undefined') {
                throw new Error('WalletConnect is not initialized');
            }
            // populates existing pairings to state
            setPairings(_client.pairing.getAll({ active: true }));
            console.log('RESTORED PAIRINGS: ', _client.pairing.getAll({ active: true }));

            console.log('sess', session)
            console.log('_client.session.length', _client.session.length)

            if (typeof session !== 'undefined') return;
            // populates (the last) existing session to state
            if (_client.session.length) {
                const lastKeyIndex = _client.session.keys.length - 1;
                const _session = _client.session.get(_client.session.keys[lastKeyIndex]);
                console.log('RESTORED SESSION:', _session);
                await onSessionConnected(_session);
                return _session;
            }
        },
        [session, onSessionConnected]
    );

    const createClient = useCallback(async () => {
        try {
            setIsInitializing(true);

            const _client = await Client.init({
                logger: DEFAULT_LOGGER,
                relayUrl: relayerRegion,
                projectId: DEFAULT_PROJECT_ID,
                metadata: DEFAULT_APP_METADATA,
            });

            console.log('CREATED CLIENT: ', _client);
            console.log('relayerRegion ', relayerRegion);
            setClient(_client);
            prevRelayerValue.current = relayerRegion;
            await _subscribeToEvents(_client);
            await _checkPersistedState(_client);
        } catch (err) {
            throw err;
        } finally {
            setIsInitializing(false);
        }
    }, [_checkPersistedState, _subscribeToEvents, relayerRegion]);

    useEffect(() => {
        if (!client || prevRelayerValue.current !== relayerRegion) {
            console.log('here1')
            createClient();
        }
    }, [client, createClient, relayerRegion]);

    const value = useMemo(
        () => ({
            pairings,
            isInitializing,
            accounts,
            chains,
            relayerRegion,
            client,
            session,
            connect,
            disconnect,
            setChains,
            setRelayerRegion,
        }),
        [
            pairings,
            isInitializing,
            accounts,
            chains,
            relayerRegion,
            client,
            session,
            connect,
            disconnect,
            setChains,
            setRelayerRegion,
        ]
    );

    return (
        <ClientContext.Provider
            value={{
                ...value,
            }}
        >
            {children}
        </ClientContext.Provider>
    );
}

export function useWalletConnectClient() {
    const context = useContext(ClientContext);
    if (context === undefined) {
        throw new Error('useWalletConnectClient must be used within a ClientContextProvider');
    }
    return context;
}
