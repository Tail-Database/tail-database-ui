import { Badge, Col, Container, Row } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
import taildb from 'assets/images/hero/taildb2.png';
import api from 'assets/images/hero/api.png';

const Feature1 = () => {
    return (
        <section className="position-relative overflow-hidden py-6 features-3">
            <Container>
                <Row className="align-items-center">
                    <Col lg={5}>
                        <div className="mb-lg-0 mb-4" data-aos="fade-right" data-aos-duration="600">
                            <Badge pill bg="" className="badge-soft-success px-2 py-1">
                                Consumer tool
                            </Badge>
                            <h1 className="display-5 fw-medium mb-2">Asset issuer information</h1>
                            <h5 className="fw-normal text-muted mx-auto mt-0 mb-4 pb-3">
                                Description, website, and social media links
                            </h5>

                            <div className="d-flex mb-3">
                                <div className="list-inline-item me-3 flex-shrink-0">
                                    <span className="bg-soft-primary avatar avatar-sm rounded-lg icon icon-with-bg icon-xs text-primary">
                                        <FeatherIcon icon="lock" className="icon-dual-primary" />
                                    </span>
                                </div>
                                <div className="fw-medium fs-16 align-self-center flex-grow-1">
                                    Check authenticity of tokens
                                </div>
                            </div>

                            <div className="d-flex mb-3">
                                <div className="list-inline-item me-3 flex-shrink-0">
                                    <span className="bg-soft-primary avatar avatar-sm rounded-lg icon icon-with-bg icon-xs text-primary">
                                        <FeatherIcon icon="git-merge" className="icon-dual-primary" />
                                    </span>
                                </div>
                                <div className="fw-medium fs-16 align-self-center flex-grow-1">
                                    View TAIL program mint and melt rules
                                </div>
                            </div>

                            <div className="d-flex mb-3">
                                <div className="list-inline-item me-3 flex-shrink-0">
                                    <span className="bg-soft-primary avatar avatar-sm rounded-lg icon icon-with-bg icon-xs text-primary">
                                        <FeatherIcon icon="mail" className="icon-dual-primary" />
                                    </span>
                                </div>
                                <div className="fw-medium fs-16 align-self-center flex-grow-1">
                                    Find contact details of issuer
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={{ span: 6, offset: 1 }}>
                        <img
                            src={taildb}
                            alt="desktop1"
                            className="img-fluid"
                            data-aos="fade-left"
                            data-aos-duration="700"
                        />
                    </Col>
                </Row>

                <Row className="align-items-center pt-9">
                    <Col lg={6}>
                        <div
                            className="bg-white p-2 rounded border shadow"
                            data-aos="fade-right"
                            data-aos-duration="600"
                        >
                            <img src={api} alt="desktop" className="img-fluid" />
                        </div>
                    </Col>
                    <Col lg={{ span: 5, offset: 1 }}>
                        <div className="mt-4 mt-lg-0" data-aos="fade-left" data-aos-duration="700">
                            <Badge pill bg="" className="badge-soft-warning px-2 py-1">
                                Enterprise tool
                            </Badge>
                            <h1 className="display-5 fw-medium mb-2">REST API</h1>
                            <h5 className="fw-normal text-muted mx-auto mt-0 mb-4 pb-3">
                                REST API docker container for wallets, exchanges, and other applications
                            </h5>

                            <div className="d-flex mb-3">
                                <div className="list-inline-item me-3 flex-shrink-0">
                                    <span className="bg-soft-primary avatar avatar-sm rounded-lg icon icon-with-bg icon-xs text-primary">
                                        <FeatherIcon icon="database" className="icon-dual-primary" />
                                    </span>
                                </div>
                                <div className="fw-medium fs-16 align-self-center flex-grow-1">
                                    Read Tail Database data directly in JSON
                                </div>
                            </div>

                            <div className="d-flex mb-3">
                                <div className="list-inline-item me-3 flex-shrink-0">
                                    <span className="bg-soft-primary avatar avatar-sm rounded-lg icon icon-with-bg icon-xs text-primary">
                                        <FeatherIcon icon="git-branch" className="icon-dual-primary" />
                                    </span>
                                </div>
                                <div className="fw-medium fs-16 align-self-center flex-grow-1">
                                    Run against your own DataLayer node
                                </div>
                            </div>

                            <div className="d-flex mb-3">
                                <div className="list-inline-item me-3 flex-shrink-0">
                                    <span className="bg-soft-primary avatar avatar-sm rounded-lg icon icon-with-bg icon-xs text-primary">
                                        <FeatherIcon icon="github" className="icon-dual-primary" />
                                    </span>
                                </div>
                                <div className="fw-medium fs-16 align-self-center flex-grow-1">Open source</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Feature1;
