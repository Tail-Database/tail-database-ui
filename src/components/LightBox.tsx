import Lightbox from 'react-image-lightbox';

export type ImageType = {
    src: string;
    caption: string;
}

type LightBoxProps = {
    images: ImageType[];
    photoIndex: number;
    closeLightbox: () => void;
    moveNext: () => void;
    movePrev: () => void;
};

const LightBox = ({ images, photoIndex, closeLightbox, moveNext, movePrev }: LightBoxProps) => {
    return (
        <Lightbox
            mainSrc={images[photoIndex].src}
            nextSrc={images[(photoIndex + 1) % images.length].src}
            prevSrc={images[(photoIndex + images.length - 1) % images.length].src}
            onCloseRequest={closeLightbox}
            onMovePrevRequest={movePrev}
            onMoveNextRequest={moveNext}
            imageTitle={<p>{images[photoIndex].caption}</p>}
            mainSrcThumbnail={images[photoIndex].caption}
        />
    );
};

export { LightBox };
