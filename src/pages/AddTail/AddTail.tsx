import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FeatherIcon from 'feather-icons-react';

// components
import { FormInput } from 'components/form';

const AddTail = () => {
    // form validation schema
    const schemaResolver = yupResolver(
        yup.object().shape({
            fname: yup.string().required('Please enter first name'),
            lname: yup.string().required('Please enter last name'),
            email: yup.string().required('Please enter Email').email('Please enter valid Email'),
            message: yup.string().required('Please enter Message'),
        })
    );

    // form method
    const methods = useForm({ resolver: schemaResolver });
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = methods;

    // handle form submission
    const onSubmit = () => { };

    return (
        <section className="section pb-lg-7 py-4 position-relative">
            <Container>
                <Row className="align-items-center">
                    <Col lg={6}>
                        <Card className="shadow-none">
                            <Card.Body className="p-xl-5 p-0">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Row>
                                        <Col lg={12}>
                                            <FormInput
                                                type="hash"
                                                name="hash"
                                                label="Hash"
                                                placeholder="Hash"
                                                containerClass={'mb-3'}
                                                register={register}
                                                errors={errors}
                                                control={control}
                                            />
                                        </Col>
                                        <Col lg={12}>
                                            <FormInput
                                                type="name"
                                                name="name"
                                                label="Name"
                                                placeholder="Name"
                                                containerClass={'mb-3'}
                                                register={register}
                                                errors={errors}
                                                control={control}
                                            />
                                        </Col>
                                        <Col lg={12}>
                                            <FormInput
                                                type="code"
                                                name="code"
                                                label="Code"
                                                placeholder="Code"
                                                containerClass={'mb-3'}
                                                register={register}
                                                errors={errors}
                                                control={control}
                                            />
                                        </Col>
                                        <Col lg={12}>
                                            <FormInput
                                                type="logo"
                                                name="logo"
                                                label="Logo NFT ID"
                                                placeholder="Logo NFT ID"
                                                containerClass={'mb-3'}
                                                register={register}
                                                errors={errors}
                                                control={control}
                                            />
                                        </Col>
                                        <Col lg={12}>
                                            <FormInput
                                                type="coin"
                                                name="coin"
                                                label="CAT Coin ID"
                                                placeholder="CAT Coin ID"
                                                containerClass={'mb-3'}
                                                register={register}
                                                errors={errors}
                                                control={control}
                                            />
                                        </Col>
                                        <Col lg={12}>
                                            <FormInput
                                                type="website_url"
                                                name="website_url"
                                                label="Website URL"
                                                placeholder="Website URL"
                                                containerClass={'mb-3'}
                                                register={register}
                                                errors={errors}
                                                control={control}
                                            />
                                        </Col>
                                        <Col lg={12}>
                                            <FormInput
                                                type="twitter_url"
                                                name="twitter_url"
                                                label="Twitter URL"
                                                placeholder="Twitter URL"
                                                containerClass={'mb-3'}
                                                register={register}
                                                errors={errors}
                                                control={control}
                                            />
                                        </Col>
                                        <Col lg={12}>
                                            <FormInput
                                                type="discord_url"
                                                name="discord_url"
                                                label="Discord URL"
                                                placeholder="Discord URL"
                                                containerClass={'mb-3'}
                                                register={register}
                                                errors={errors}
                                                control={control}
                                            />
                                        </Col>
                                        <Col lg={12}>
                                            <select className="form-select">
                                                <option value="option_select0">Category</option>
                                                <option value="option_select1">Option select name</option>
                                                <option value="option_select2">Option select name</option>
                                                <option value="option_select2">Option select name</option>
                                                <option value="option_select2">Option select name</option>
                                            </select>
                                        </Col>

                                        <Col lg={12}>
                                            <FormInput
                                                type="textarea"
                                                name="description"
                                                label="Description"
                                                placeholder="Type Your description..."
                                                rows={5}
                                                containerClass={'mb-3'}
                                                register={register}
                                                errors={errors}
                                                control={control}
                                            />
                                        </Col>
                                        <Col lg="auto" className="mb-0">
                                            <Button type="submit">
                                                Add
                                                <span className="icon icon-xs text-white ms-1">
                                                    <FeatherIcon icon="plus-circle" />
                                                </span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={{ offset: 1, span: 5 }}>
                        <div style={{ height: '520px' }}>
                            Display logo here
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default AddTail;
