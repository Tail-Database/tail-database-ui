// components
import { Navbar } from 'components/navbars';
import BackToTop from 'components/BackToTop';
import Footer from '../Home/Footer';

import Hero from './Hero';
import AddTail from './AddTail';

export default () => {
    return (
        <>
            <div className="header-7 bg-gradient2">
                <Navbar
                    hideSearch
                    fixedWidth
                    navClass="navbar-light zindex-10"
                    buttonClass="btn-outline-secondary btn-sm"
                />

                <Hero />
            </div>

            <AddTail />
            <Footer />

            <BackToTop />
        </>
    );
};
