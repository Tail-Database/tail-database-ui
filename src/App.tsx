import { useEffect } from 'react';

import AOS from 'aos';

import Routes from './routes/Routes';

import './assets/scss/theme.scss';
import { ChainDataContextProvider } from 'walletconnect/contexts/ChainDataContext';
import { ClientContextProvider } from 'walletconnect/contexts/ClientContext';
import { JsonRpcContextProvider } from 'walletconnect/contexts/JsonRpcContext';

const App = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <ChainDataContextProvider>
        <ClientContextProvider>
          <JsonRpcContextProvider>
            <Routes />
          </JsonRpcContextProvider>
        </ClientContextProvider>
      </ChainDataContextProvider>
    );
};

export default App;
