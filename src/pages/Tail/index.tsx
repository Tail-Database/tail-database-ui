import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Navbar } from 'components/navbars';
import Hero from './Hero';
import Content from './Content';
import Footer from '../Home/Footer';
import { useEffect, useState } from 'react';
import { Tail } from './types';
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
            <div>
                <Navbar navClass="navbar-light" fixedWidth hideSearch buttonClass="btn-outline-secondary btn-sm" />
                <Hero tail={tail} />
            </div>

            <Content tail={tail} />

            <Footer />
        </>
    );
};
