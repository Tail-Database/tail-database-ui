import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import classNames from 'classnames';
import { Tail } from 'pages/Tail/types';

type GalleryProps = {
    tails: Tail[];
};

const Gallery = ({ tails }: GalleryProps) => {
    const [filteredTails, setFilteredTails] = useState(tails);
    const [category, setCategory] = useState<string>('all');

    const filterTails = (category: string) => {
        setCategory(category);
        setTimeout(
            () =>
                setFilteredTails(category === 'all' ? tails : tails.filter((tail) => tail.category.includes(category))),
            300
        );
    };

    useEffect(() => {
        filterTails(category);
    }, [tails]);

    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="text-center filter-menu">
                        <Link
                            to="#"
                            className={classNames('filter-menu-item', 'me-1', {
                                active: category === 'all',
                            })}
                            onClick={() => filterTails('all')}
                        >
                            All
                        </Link>
                        <Link
                            to="#"
                            className={classNames('filter-menu-item', 'me-1', {
                                active: category === 'gaming',
                            })}
                            onClick={() => filterTails('gaming')}
                        >
                            Gaming
                        </Link>
                        <Link
                            to="#"
                            className={classNames('filter-menu-item', 'me-1', {
                                active: category === 'event',
                            })}
                            onClick={() => filterTails('event')}
                        >
                            Event
                        </Link>
                        <Link
                            to="#"
                            className={classNames('filter-menu-item', 'me-1', {
                                active: category === 'education',
                            })}
                            onClick={() => filterTails('education')}
                        >
                            Education
                        </Link>
                        <Link
                            to="#"
                            className={classNames('filter-menu-item', 'me-1', {
                                active: category === 'meme',
                            })}
                            onClick={() => filterTails('meme')}
                        >
                            Meme
                        </Link>
                        <Link
                            to="#"
                            className={classNames('filter-menu-item', 'me-1', {
                                active: category === 'stablecoin',
                            })}
                            onClick={() => filterTails('stablecoin')}
                        >
                            Stablecoin
                        </Link>
                        <Link
                            to="#"
                            className={classNames('filter-menu-item', 'me-1', {
                                active: category === 'wrapped',
                            })}
                            onClick={() => filterTails('wrapped')}
                        >
                            Wrapped
                        </Link>
                        <Link
                            to="#"
                            className={classNames('filter-menu-item', 'me-1', {
                                active: category === 'platform',
                            })}
                            onClick={() => filterTails('platform')}
                        >
                            Platform
                        </Link>
                    </div>
                </Col>
            </Row>

            <Row className="grid-portfolio mt-5 justify-content-center">
                {filteredTails.map((tail, index) => {
                    return (
                        <Col xl={4} sm={6} className="filter-item all" key={index.toString()}>
                            <Card className="card-portfolio-item shadow border all">
                                <div className="p-2">
                                    <div className="card-zoom">
                                        <Link to={`/tail/${tail.hash}`} className="image-popup" title={tail.name}>
                                            <img src={tail.nft_uri} alt="galleryImage" className="img-fluid" />
                                        </Link>
                                    </div>
                                </div>
                                <Card.Body className="p-2">
                                    <div className="mt-2">
                                        <h5 className="mt-0">
                                            <Link to={`/tail/${tail.hash}`}>{tail.name}</Link>
                                        </h5>
                                        <p className="text-muted mb-1">{tail.description}</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </>
    );
};

export default Gallery;
