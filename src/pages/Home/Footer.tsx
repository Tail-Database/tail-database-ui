import { Badge, Button, Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
    return (
        <section className="pt-4 pt-sm-6 pb-5 desktop-5">
            {/* <Container>
                <Row className="justify-content-center">
                    <Col>
                        <div className="text-center">
                            <h1 className="text-dark">Be the first to know!</h1>
                            <p>We'll inform you about new updates, features, but no spam, we promise.</p>
                        </div>
                        <div className="my-4 my-sm-5 pt-0 d-flex align-items-center justify-content-center">
                            <Row className="g-2">
                                <Col sm={8}>
                                    <FormInput
                                        type="email"
                                        className="form-control mb-2 me-sm-2 shadow-sm"
                                        name="email"
                                        id="email"
                                        placeholder="Your Email"
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Button type="submit" className="mb-2">
                                        Sign Up
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container> */}

            <hr className="my-4" />

            <Container>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <div className="text-center mt-5">
                            <h5 className="fw-normal">
                                {new Date().getFullYear()} © Copyright Tail Database.
                            </h5>
                            {/* <ul className="list-inline mt-4">
                                <li className="list-inline-item mx-4 mb-3">
                                    <Link to="#" className="text-dark">
                                        Changelog
                                    </Link>
                                </li>
                                <li className="list-inline-item mx-4 mb-3">
                                    <Link to="#" className="text-dark">
                                        FAQ
                                    </Link>
                                </li>
                                <li className="list-inline-item mx-4 mb-3">
                                    <Link to="#" className="text-dark">
                                        Press kit
                                    </Link>
                                </li>
                                <li className="list-inline-item mx-4 mb-3">
                                    <Link to="#" className="text-dark">
                                        Contact us
                                    </Link>
                                </li>
                                <li className="list-inline-item mx-4 mb-3">
                                    <Link to="#" className="text-dark">
                                        Careers
                                        <Badge
                                            pill
                                            bg=""
                                            className="align-middle badge-soft-info fw-normal fs-11 px-2 py-1 ms-1"
                                        >
                                            We're hiring
                                        </Badge>
                                    </Link>
                                </li>
                            </ul> */}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Footer;
