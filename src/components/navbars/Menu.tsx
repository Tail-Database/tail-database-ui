import { useEffect } from 'react';
import { Nav, Dropdown } from 'react-bootstrap';
import { NavLink, Link, useLocation } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import classNames from 'classnames';
import { useWalletConnectClient } from 'walletconnect/contexts/ClientContext';
import Blockchain from 'walletconnect/components/Blockchain';
import Toggle from 'walletconnect/components/Toggle';
import { useChainData } from 'walletconnect/contexts/ChainDataContext';
import { AccountAction, setLocaleStorageTestnetFlag } from 'walletconnect/helpers';
import { useJsonRpc } from 'walletconnect/contexts/JsonRpcContext';
import { DEFAULT_CHIA_METHODS, DEFAULT_TEST_CHAINS, DEFAULT_MAIN_CHAINS } from 'walletconnect/constants';
import {
    SButtonContainer,
    SConnectButton,
    SContent,
    SLanding,
    SLayout,
    SToggleContainer,
} from 'walletconnect/app';

// Normal import does not work here
const { version } = require("@walletconnect/sign-client/package.json");

type MenuProps = {
    showDownload?: boolean;
    navClass?: string;
    buttonClass?: string;
    loggedInUser?: {};
};

const Menu = ({ navClass, buttonClass, showDownload, loggedInUser }: MenuProps) => {
    const openPairingModal = () => console.log("no op pairing modal")
    const {
        accounts,
        chains,
        client,
        connect,
        isInitializing,
        pairings,
        setChains,
        setRelayerRegion
    } = useWalletConnectClient();

    console.log('acc', accounts)
    const { chiaRpc, isTestnet, setIsTestnet } = useJsonRpc();
    const { chainData } = useChainData();

    console.log('chainData222', chainData)

    const getChiaActions = (): AccountAction[] => {
        const onSignMessageByAddress = async (chainId: string, fingerprint: string) => {
            // openRequestModal();
            console.log('chainId', chainId)
            console.log('fingerprint', fingerprint)
            await chiaRpc.signMessageByAddress(chainId, fingerprint, 'test message 123', 'txch1l8pwa9v3kphxr50vtgpc0dz2atvemryxzlngav9xnraxm39cxt2sxvpe3m');
          };

        return [
            {
                method: DEFAULT_CHIA_METHODS.CHIA_SIGN_MESSAGE_BY_ADDRESS,
                callback: onSignMessageByAddress,
            },
        ];
    };

    let location = useLocation();

    const isActiveRoute = (path: string) => {
        if (location.pathname) {
            return location.pathname.includes(path);
        }
        return false;
    };

    useEffect(() => {
        console.log('accounts', accounts)
    }, [accounts]);

    const onConnect = () => {
        if (typeof client === "undefined") {
          throw new Error("WalletConnect is not initialized");
        }
        console.log('onConnect pairings', pairings)
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
        console.log('chains', chains)
        return !accounts.length ? (
            <SLanding center>
                {/* <Banner />
                <h6>{`Using v${version || "2.0.0-beta"}`}</h6> */}
                <SButtonContainer>
                    <h6>Select chains:</h6>
                    
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
                    <SToggleContainer>
                        <p>Testnets Only?</p>
                        <Toggle active={isTestnet} onClick={toggleTestnets} />
                    </SToggleContainer>
                </SButtonContainer>
            </SLanding>
        ) : null;
    };



    return (
        <Nav as="ul" className={classNames('align-items-lg-center', navClass)}>
            <Nav.Item as="li">
                <NavLink to="/" end className={classNames('nav-link', ({ ...isActive }) => isActive && 'active')}>
                    Home
                </NavLink>
            </Nav.Item>

            <Nav.Item as="li">
                <NavLink to="/explore" className="nav-link btn me-2 shadow-none">
                    Explore
                </NavLink>
            </Nav.Item>

            <Nav.Item as="li">
                <NavLink to="/addTail" className="nav-link btn me-2 shadow-none">
                    Add TAIL
                </NavLink>
            </Nav.Item>

            <Nav.Item as="li">
                <a
                    href="https://github.com/Tail-Database/tail-database-app"
                    target="_blank"
                    className="btn btn-primary btn-sm"
                >
                    Download
                </a>
            </Nav.Item>
            <SContent>{isInitializing ? "Loading..." : renderContent()}</SContent>
            {(accounts || ['chia:mainnet:2028126270']).map((account) => {
                const [namespace, reference, address] = account.split(":");
                const chainId = `${namespace}:${reference}`;
                console.log('account', account)
                return (
                    <Blockchain
                        key={account}
                        active={true}
                        chainData={chainData}
                        address={address}
                        chainId={chainId}
                        actions={getChiaActions()}
                    />
                );
            })}
        </Nav>
    );
};

export default Menu;
