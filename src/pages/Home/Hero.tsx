import { Button, ButtonGroup, Col, Container, Dropdown, Row } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';

// images
import desktop from 'assets/images/hero/taildb.png';

const Hero8 = () => {
    return (
        <section className="position-relative overflow-hidden hero-7 pt-6 pb-4">
            <Container>
                <Row className="align-items-center text-center text-sm-start">
                    <Col lg={6}>
                        <h1 className="hero-title">
                            <span className="highlight highlight-warning d-inline-block">Decentralized</span> asset
                            token database
                        </h1>
                        <p className="fs-16 mt-3 text-muted">
                            Powered by DataLayer, Tail Database provides asset token metadata with no central authority.
                        </p>

                        <div className="py-5">
                            <Dropdown as={ButtonGroup}>
                                <a href="https://github.com/Tail-Database/tail-database-app" target="_blank">
                                    <Button>
                                        <FeatherIcon icon="github" className="icon-xs me-2" />
                                        Application source code
                                    </Button>
                                </a>
                            </Dropdown>
                        </div>
                    </Col>
                    <Col lg={{ span: 5, offset: 1 }} className="hero-right">
                        <div className="img-container" data-aos="fade-left" data-aos-duration="600">
                            <img src={desktop} alt="desktop" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Hero8;
