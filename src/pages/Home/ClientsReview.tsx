import { Col, Container, Row } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';

// images
import dexie from 'assets/images/logos/dexie.png';
import hashgreen from 'assets/images/logos/hashgreen.png';
import goby from 'assets/images/logos/goby.png';
import offerbin from 'assets/images/logos/offerbin.png';
import grant from 'assets/images/grant.svg';

const logos = [{
    image: dexie,
    url: 'https://dexie.space/'
}, {
    image: hashgreen,
    url: 'https://hash.green/'
}, {
    image: goby,
    url: 'https://www.goby.app/'
}, {
    image: offerbin,
    url: 'https://offerbin.io/'
}];

const ClientsReview = () => {
    return (
        <section className="pt-8 pt-sm-10 pb-lg-5 pb-4">
            <Container>
                <Row>
                    <Col lg={8}>
                        <h4 className="fw-medium pb-3 mt-0">Trusted by wallets, exchanges, and other applications in the Chia ecosystem</h4>
                        <ul className="list-inline mt-3 mb-4 mb-lg-0">
                            {(logos || []).map(({ image, url }, index) => {
                                return (
                                    <li className="list-inline-item me-4 mb-2" key={index.toString()}>
                                        <a href={url}><img src={image} alt="brand" height="42" /></a>
                                    </li>
                                );
                            })}
                        </ul>
                    </Col>
                    <Col lg={4} className="text-lg-end">
                        <a href="https://www.chia.net/grants/">
                            <img
                                src={grant}
                                alt="Chia Cultivation Grant"
                                className="img-fluid d-inline-block"
                            />
                        </a>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ClientsReview;
