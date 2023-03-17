import * as react from 'react';
import { useWalletConnectClient } from 'walletconnect/contexts/ClientContext';
import Blockchain from 'walletconnect/components/Blockchain';
import Toggle from 'walletconnect/components/Toggle';
import { useChainData } from 'walletconnect/contexts/ChainDataContext';
import { setLocaleStorageTestnetFlag } from 'walletconnect/helpers';
import { useJsonRpc } from 'walletconnect/contexts/JsonRpcContext';
import { DEFAULT_TEST_CHAINS, DEFAULT_MAIN_CHAINS } from 'walletconnect/constants';
import {
    SButtonContainer,
    SConnectButton,
    SContent,
    SLanding,
    SToggleContainer,
} from 'walletconnect/app';

const WalletConnect = () => {
    const openPairingModal = () => console.log("no op pairing modal")
    const {
        accounts,
        chains,
        client,
        connect,
        isInitializing,
        pairings,
        setChains,
    } = useWalletConnectClient();

    const { isTestnet, setIsTestnet } = useJsonRpc();
    const { chainData } = useChainData();

    const onConnect = () => {
        if (typeof client === "undefined") {
            throw new Error("WalletConnect is not initialized");
        }
        // Suggest existing pairings (if any).
        if (pairings.length) {
            openPairingModal();
        } else {
            // If no existing pairings are available, trigger `WalletConnectClient.connect`.
            connect();
        }
    };

    // Toggle between displaying testnet or mainnet chains as selection options.
    const toggleTestnets = () => {
        const nextIsTestnetState = !isTestnet;
        setIsTestnet(nextIsTestnetState);
        setLocaleStorageTestnetFlag(nextIsTestnetState);
    };

    const handleChainSelectionClick = (chainId: string) => {
        if (chains.includes(chainId)) {
            setChains(chains.filter((chain) => chain !== chainId));
        } else {
            setChains([...chains, chainId]);
        }
    };

    const renderContent = () => {
        const chainOptions = isTestnet ? DEFAULT_TEST_CHAINS : DEFAULT_MAIN_CHAINS;

        return !accounts.length ? (
            <SLanding center>
                <SButtonContainer>
                    <h6>Select chain:</h6>

                    {chainOptions.map((chainId) => (
                        <Blockchain
                            key={chainId}
                            chainId={chainId}
                            chainData={chainData}
                            onClick={handleChainSelectionClick}
                            active={chains.includes(chainId)}
                        />
                    ))}
                    <SConnectButton left onClick={onConnect} disabled={!chains.length}>
                        {"Connect"}
                    </SConnectButton>
                </SButtonContainer>
            </SLanding>
        ) : null;
    };

    return (
        <>
            <SContent>{isInitializing ? "Loading..." : renderContent()}</SContent>
            {accounts.map((account) => {
                const [namespace, reference, address] = account.split(":");
                const chainId = `${namespace}:${reference}`;

                return (
                    <Blockchain
                        key={account}
                        active={true}
                        chainData={chainData}
                        address={address}
                        chainId={chainId}
                        actions={[]}
                    />
                );
            })}
        </>
    );
};

export default WalletConnect;
