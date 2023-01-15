import { useEffect } from 'react';

import AOS from 'aos';

// routes
import Routes from './routes/Routes';

// Themes
//  For Default import Theme.scss
import './assets/scss/theme.scss';

const App = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return <Routes />;
};

export default App;
