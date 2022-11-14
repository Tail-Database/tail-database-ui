import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import classNames from 'classnames';
import FeatherIcon from 'feather-icons-react';

import { LightBox, ImageType } from 'components/LightBox';
import { GalleryItem } from './types';

type GalleryProps = {
    galleryItems: GalleryItem[];
};

const Gallery = ({ galleryItems }: GalleryProps) => {
    const [gallery, setGallery] = useState<GalleryItem[]>(galleryItems);
    const [category, setCategory] = useState<string>('all');

    const [galleryImages, setGalleryImages] = useState<ImageType[]>(
        (galleryItems || []).map((album) => {
            return album.image;
        })
    );

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [photoIndex, setPhotoIndex] = useState<number>(0);

    // filter image by category
    const filterImages = (category: string) => {
        setCategory(category);
        setTimeout(() => {
            const galleryAlbums =
                category === 'all' ? galleryItems : galleryItems.filter((album) => album.category?.includes(category));
            setGallery(galleryAlbums);
            setGalleryImages(
                (galleryAlbums || []).map((album) => {
                    return album.image;
                })
            );
        }, 300);
    };

    // handle lightbox event
    const openLightbox = (index: number) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

    const closeLightbox = () => {
        setIsOpen(false);
    };

    const moveNext = () => {
        setPhotoIndex((prevState) => (prevState + 1) % galleryImages.length);
    };

    const movePrev = () => {
        setPhotoIndex((prevState) => (prevState + galleryImages.length - 1) % galleryImages.length);
    };

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
                            onClick={() => filterImages('all')}
                        >
                            All
                        </Link>
                        <Link
                            to="#"
                            className={classNames('filter-menu-item', 'me-1', {
                                active: category === 'web',
                            })}
                            onClick={() => filterImages('web')}
                        >
                            Web Design
                        </Link>
                        <Link
                            to="#"
                            className={classNames('filter-menu-item', 'me-1', {
                                active: category === 'graphic',
                            })}
                            onClick={() => filterImages('graphic')}
                        >
                            Graphic Design
                        </Link>
                        <Link
                            to="#"
                            className={classNames('filter-menu-item', 'me-1', {
                                active: category === 'illustrator',
                            })}
                            onClick={() => filterImages('illustrator')}
                        >
                            Illustrator
                        </Link>
                        <Link
                            to="#"
                            className={classNames('filter-menu-item', 'me-1', {
                                active: category === 'photography',
                            })}
                            onClick={() => filterImages('photography')}
                        >
                            Photography
                        </Link>
                    </div>
                </Col>
            </Row>

            <Row className="grid-portfolio mt-5 justify-content-center">
                {(gallery || []).map((galleryItem, index) => {
                    return (
                        <Col xl={4} sm={6} className="filter-item all" key={index.toString()}>
                            <Card className="card-portfolio-item shadow border all">
                                <div className="p-2">
                                    <div className="card-zoom">
                                        <Link
                                            to="#"
                                            className="image-popup"
                                            title={galleryItem.image!.caption}
                                            onClick={() => openLightbox(index)}
                                        >
                                            <img
                                                src={galleryItem.image!.src}
                                                alt="galleryImage"
                                                className="img-fluid"
                                            />
                                        </Link>
                                    </div>
                                </div>
                                <Card.Body className="p-2">
                                    <div className="mt-2">
                                        <h5 className="mt-0">{galleryItem.title}</h5>
                                        <p className="text-muted mb-1">{galleryItem.description}</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>

            <div className="text-center mt-5 pb-md-0">
                <Link to="#" className="btn btn-primary">
                    <FeatherIcon icon="refresh-ccw" className="icon-xxs me-2" />
                    Load More
                </Link>
            </div>

            {/* image lightbox */}
            {isOpen && (
                <LightBox
                    images={galleryImages}
                    photoIndex={photoIndex}
                    closeLightbox={closeLightbox}
                    moveNext={moveNext}
                    movePrev={movePrev}
                />
            )}
        </>
    );
};

export default Gallery;
