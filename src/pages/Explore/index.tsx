import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Navbar } from 'components/navbars';
import BackToTop from 'components/BackToTop';
import Footer from '../Home/Footer';
import Hero from './Hero';
import Gallery from './Gallery';
import config from '../../config';

const Explore = () => {
    const [tails, setTails] = useState([]);

    useEffect(() => {
        axios.get(config.GET_TAILS_URL)
            .then(response => setTails(response.data))
            .catch(console.error);
    });

    return (
        <>
            <div>
                <Navbar navClass="navbar-light" fixedWidth hideSearch buttonClass="btn-outline-secondary btn-sm" />
                <Hero />
            </div>

            <section className="overflow-hidden py-5 py-md-6 py-lg-7">
                <Container>
                    <Gallery tails={tails}/>
                </Container>
            </section>

            <Footer />

            <BackToTop />
        </>
    );
};

export default Explore;
