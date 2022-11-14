// component
import { Navbar } from '../../components/navbars';
import Hero from './Hero';
import BackToTop from '../../components/BackToTop';

import ClientsReview from './ClientsReview';
import Feature1 from './Feature1';
import Feature2 from './Feature2';
import Footer from './Footer';

// dummy data
import { features } from './data';

const Home = () => {
    return (
        <>
            {/* header and hero */}
            <div className="header-2">
                <Navbar navClass="navbar-light" fixedWidth hideSearch buttonClass="btn-primary btn-sm" />
                <Hero />
            </div>

            {/* clients review */}
            <ClientsReview />

            {/* feature 1 */}
            <Feature1 />

            {/* feature 2 */}
            <Feature2 features={features} />

            {/* testimonila */}
            {/* <Testimonial /> */}

            {/* CTA + Footer */}
            <Footer />

            <BackToTop />
        </>
    );
};

export default Home;
