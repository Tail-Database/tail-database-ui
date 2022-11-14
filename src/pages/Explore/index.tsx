import { Container } from 'react-bootstrap';

// component
import { Navbar } from 'components/navbars';
import BackToTop from 'components/BackToTop';
import Footer from '../Home/Footer';

import Hero from './Hero';
import Gallery from './Gallery';

// dummy data
import { galleryItems } from './data';

const Explore = () => {
    return (
        <>
            {/* header */}
            <div>
                <Navbar navClass="navbar-light" fixedWidth hideSearch buttonClass="btn-outline-secondary btn-sm" />
                <Hero />
            </div>

            {/* gallery */}
            <section className="overflow-hidden py-5 py-md-6 py-lg-7">
                <Container>
                    <Gallery galleryItems={galleryItems} />
                </Container>
            </section>

            {/* footer */}
            <Footer />

            <BackToTop />
        </>
    );
};

export default Explore;
