import { Col, Container, Row } from 'react-bootstrap';
import { Tail } from './types';

type HeroProps = {
    tail: Tail;
};

const Hero = ({ tail }: HeroProps) => {
    return (
        <section className="hero-4 pb-5 pt-7 py-sm-7">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={7} className="text-center">
                        <h1 className="hero-title">{tail.name}</h1>
                    </Col>
                </Row>

                <Row className="border-top border-bottom py-4 align-items-center mt-5">
                    <Col>
                        <span className="fs-14">Code</span>
                        <h4 className="mt-1 fw-medium">{tail.code}</h4>
                    </Col>
                    <Col>
                        <span className="fs-14">Category</span>
                        <h4 className="mt-1 fw-medium">{tail.category}</h4>
                    </Col>
                    <Col>
                        <span className="fs-14">Asset ID</span>
                        <h4 className="mt-1 fw-medium">{tail.hash}</h4>
                    </Col>
                    {tail.website_url && (
                        <Col>
                            <span className="fs-14">Website</span>
                            <h4 className="mt-1 fw-medium">
                                <a href={tail.website_url} target="_blank">
                                    {tail.website_url}
                                </a>
                            </h4>
                        </Col>
                    )}
                    {tail.twitter_url && (
                        <Col>
                            <span className="fs-14">Twitter</span>
                            <h4 className="mt-1 fw-medium">
                                <a href={tail.twitter_url} target="_blank">
                                    {tail.twitter_url}
                                </a>
                            </h4>
                        </Col>
                    )}
                    {tail.discord_url && (
                        <Col>
                            <span className="fs-14">Discord</span>
                            <h4 className="mt-1 fw-medium">
                                <a href={tail.discord_url} target="_blank">
                                    {tail.discord_url}
                                </a>
                            </h4>
                        </Col>
                    )}
                </Row>
            </Container>
        </section>
    );
};

export default Hero;
