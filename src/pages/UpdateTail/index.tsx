import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from 'components/navbars';
import BackToTop from 'components/BackToTop';
import Footer from '../Home/Footer';
import Hero from './Hero';
import UpdateTail from './UpdateTail';
import { Tail } from '../Tail/types';
import config from '../../config';

export default () => {
    const { hash } = useParams();
    const [tail, setTail] = useState<Tail>({
        hash: '',
        name: '',
        category: '',
        code: '',
        description: '',
        eve_coin_id: '',
        launcher_id: '',
        nft_uri: '',
        tail_reveal: '',
    });

    useEffect(() => {
        axios
            .get(`${config.GET_TAIL_URL}/${hash}`)
            .then((response) => setTail(response.data))
            .catch(console.error);
    }, []);

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

            {tail.hash && <UpdateTail tail={tail} />}
            <Footer />

            <BackToTop />
        </>
    );
};
