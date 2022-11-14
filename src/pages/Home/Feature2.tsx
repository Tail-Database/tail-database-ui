import { Col, Container, Row } from 'react-bootstrap';

// types
import { Feature } from './types';

type FeatureProps = {
    features: Feature[];
};

const Feature2 = ({ features }: FeatureProps) => {
    return (
        <section className="py-4">
            <Container className="bg-soft-warning p-5 rounded-lg" data-aos="fade-up" data-aos-duration="700">
                <h4 className="display-5 fw-medium mb-2">Tail Database DAO coming soon™</h4>
                <Row className="align-items-center">
                    <Col lg={8}>
                        Governance of Tail Database will be migrated to a DAO once the primitive is released*
                        <p className="text=muted mt-2 fs-12">
                                * Depends on integration between DAOs and DataLayer which may not be available at DAO release
                            </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Feature2;
