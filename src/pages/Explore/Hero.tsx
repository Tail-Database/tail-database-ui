import { Col, Container, Row } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';

const Hero = () => {
    return (
        <section className="hero-4 pb-5 pt-7 py-sm-7 bg-gradient2">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={7} className="text-center">
                        <h1 className="hero-title">Explore</h1>
                        <p className="fs-17 text-muted">
                            Search by Asset ID, Name, or Code
                        </p>

                        <div className="mt-5">
                            <div className="form-control-with-hint">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="query"
                                    name="query"
                                    placeholder="Search..."
                                />
                                <span className="form-control-feedback">
                                    <FeatherIcon className="icon-xs" icon="search" />
                                </span>
                            </div>
                        </div>

                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Hero;
