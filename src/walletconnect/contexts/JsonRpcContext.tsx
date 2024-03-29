import { createContext, ReactNode, useContext, useState } from "react";
import { getLocalStorageTestnetFlag } from "../helpers";
import { useWalletConnectClient } from "./ClientContext";
import { DEFAULT_CHIA_METHODS } from "../constants";
import { useChainData } from "./ChainDataContext";


/**
 * Types
 */
interface IFormattedRpcResponse {
    method?: string;
    address?: string;
    valid: boolean;
    result: string;
}

type TRpcRequestCallback = (chainId: string, address: string) => Promise<void>;
type TSignRpcRequestCallback = (chainId: string, fingerprint: string, message: string, address: string) => Promise<void>;

interface IContext {
    ping: () => Promise<void>;
    chiaRpc: {
        testSendTransaction: TRpcRequestCallback,
        testNewAddress: TRpcRequestCallback,
        testLogIn: TRpcRequestCallback,
        signMessageByAddress: TSignRpcRequestCallback,
        testSignMessageById: TRpcRequestCallback,
        testGetWalletSyncStatus: TRpcRequestCallback,
    },
    rpcResult?: IFormattedRpcResponse | null;
    isRpcRequestPending: boolean;
    isTestnet: boolean;
    setIsTestnet: (isTestnet: boolean) => void;
}

/**
 * Context
 */
export const JsonRpcContext = createContext<IContext>({} as IContext);

/**
 * Provider
 */
export function JsonRpcContextProvider({
    children,
}: {
    children: ReactNode | ReactNode[];
}) {
    const [pending, setPending] = useState(false);
    const [result, setResult] = useState<IFormattedRpcResponse | null>();
    const [isTestnet, setIsTestnet] = useState(getLocalStorageTestnetFlag());

    const { client, session } =
        useWalletConnectClient();

    const { chainData } = useChainData();

    const _createJsonRpcRequestHandler =
        (
            rpcRequest: (
                chainId: string,
                fingerprint: string,
                message?: string,
                address?: string,
            ) => Promise<IFormattedRpcResponse>
        ) =>
            async (chainId: string, fingerprint: string, message?: string, address?: string) => {
                if (typeof client === "undefined") {
                    throw new Error("WalletConnect is not initialized");
                }
                if (typeof session === "undefined") {
                    throw new Error("Session is not connected");
                }

                try {
                    setPending(true);
                    const result = await rpcRequest(chainId, fingerprint, message, address);
                    setResult(result);
                } catch (err: any) {
                    console.error("RPC request failed: ", err);
                    setResult({
                        address: fingerprint,
                        valid: false,
                        result: err?.message ?? err,
                    });
                } finally {
                    setPending(false);
                }
            };

    const ping = async () => {
        if (typeof client === "undefined") {
            throw new Error("WalletConnect is not initialized");
        }
        if (typeof session === "undefined") {
            throw new Error("Session is not connected");
        }

        try {
            setPending(true);

            let valid = false;

            try {
                await client.ping({ topic: session.topic });
                valid = true;
            } catch (e) {
                valid = false;
            }

            // display result
            setResult({
                method: "ping",
                valid,
                result: valid ? "Ping succeeded" : "Ping failed",
            });
        } catch (e) {
            console.error(e);
            setResult(null);
        } finally {
            setPending(false);
        }
    };

    const chiaRpc = {
        testSendTransaction: _createJsonRpcRequestHandler(
            async (
                chainId: string,
                address: string
            ): Promise<IFormattedRpcResponse> => {
                const method = DEFAULT_CHIA_METHODS.CHIA_SEND_TRANSACTION;
                const result = await client!.request({
                    topic: session!.topic,
                    chainId,
                    request: {
                        method,
                        params: {
                            fingerprint: address,
                            address: 'txch1l8pwa9v3kphxr50vtgpc0dz2atvemryxzlngav9xnraxm39cxt2sxvpe3m',
                            amount: '10',
                            fee: '1',
                        },
                    },
                });

                return {
                    method,
                    address,
                    valid: true,
                    result: JSON.stringify(result),
                };
            }
        ),
        testNewAddress: _createJsonRpcRequestHandler(
            async (
                chainId: string,
                address: string
            ): Promise<IFormattedRpcResponse> => {
                const method = DEFAULT_CHIA_METHODS.CHIA_NEW_ADDRESS;
                const result = await client!.request({
                    topic: session!.topic,
                    chainId,
                    request: {
                        method,
                        params: {
                            fingerprint: address,
                        },
                    },
                });

                return {
                    method,
                    address,
                    valid: true,
                    result: JSON.stringify(result),
                };
            }
        ),
        testLogIn: _createJsonRpcRequestHandler(
            async (
                chainId: string,
                address: string
            ): Promise<IFormattedRpcResponse> => {
                const method = DEFAULT_CHIA_METHODS.CHIA_LOG_IN;
                const result = await client!.request({
                    topic: session!.topic,
                    chainId,
                    request: {
                        method,
                        params: {
                            fingerprint: address,
                        },
                    },
                });

                return {
                    method,
                    address,
                    valid: true,
                    result: JSON.stringify(result),
                };
            }
        ),
        signMessageByAddress: _createJsonRpcRequestHandler(
            async (
                chainId: string,
                fingerprint: string,
                message?: string,
                address?: string,
            ): Promise<IFormattedRpcResponse> => {
                const method = DEFAULT_CHIA_METHODS.CHIA_SIGN_MESSAGE_BY_ADDRESS;
                const result = await client!.request({
                    topic: session!.topic,
                    chainId,
                    request: {
                        method,
                        params: {
                            fingerprint,
                            message,
                            address,
                        },
                    },
                });

                return {
                    method,
                    address: fingerprint,
                    valid: true,
                    result: JSON.stringify(result),
                };
            }
        ),
        testSignMessageById: _createJsonRpcRequestHandler(
            async (
                chainId: string,
                address: string
            ): Promise<IFormattedRpcResponse> => {
                const method = DEFAULT_CHIA_METHODS.CHIA_SIGN_MESSAGE_BY_ID;
                const result = await client!.request({
                    topic: session!.topic,
                    chainId,
                    request: {
                        method,
                        params: {
                            fingerprint: address,
                            message: 'This is a test sign in message by id',
                            id: 'nft1049g9t9ts9qrc9nsd7ta0kez847le6wz59d28zrkrmhj8xu7ucgq7uqa7z',
                        },
                    },
                });

                return {
                    method,
                    address,
                    valid: true,
                    result: JSON.stringify(result),
                };
            }
        ),
        testGetWalletSyncStatus: _createJsonRpcRequestHandler(
            async (
                chainId: string,
                address: string
            ): Promise<IFormattedRpcResponse> => {
                const method = DEFAULT_CHIA_METHODS.CHIA_GET_WALLET_SYNC_STATUS
                const result = await client!.request({
                    topic: session!.topic,
                    chainId,
                    request: {
                        method,
                        params: {
                            fingerprint: address,
                        },
                    },
                });

                return {
                    method,
                    address,
                    valid: true,
                    result: JSON.stringify(result),
                };
            }
        ),
    };

    return (
        <JsonRpcContext.Provider
            value={{
                ping,
                chiaRpc,
                rpcResult: result,
                isRpcRequestPending: pending,
                isTestnet,
                setIsTestnet,
            }}
        >
            {children}
        </JsonRpcContext.Provider>
    );
}

export function useJsonRpc() {
    const context = useContext(JsonRpcContext);
    if (context === undefined) {
        throw new Error("useJsonRpc must be used within a JsonRpcContextProvider");
    }
    return context;
}
