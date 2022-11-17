import { Col, Container, Row } from 'react-bootstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Tail } from './types';

type ContentProps = {
    tail: Tail;
};

const Content = ({ tail }: ContentProps) => {
    return (
        <section className="position-relative">
            <Container>
                <Row>
                    <Col lg={12} style={{textAlign: 'center'}}>
                        <figure className="figure">
                            <img
                                src={tail.nft_uri}
                                alt="contentImage"
                                className="figure-img rounded"
                                height="350"
                            />
                        </figure>
                    </Col>
                </Row>

                <Row className="mt-5" data-aos="fade-up" data-aos-duration="300">
                    <Col lg={6}>
                        <div className="pe-4">
                            <h3>Description</h3>
                            <p>
                                {tail.description}
                            </p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="ps-4">
                            <h3>TAIL reveal</h3>
                            <p>
                                <SyntaxHighlighter language="lisp" style={docco} wrapLongLines>
                                {tail.tail_reveal}
                                </SyntaxHighlighter>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Content;
