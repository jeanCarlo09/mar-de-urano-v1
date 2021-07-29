import React from 'react';
import PropTypes from 'prop-types';
import { ImageRef } from './ImageRef';


const Diamond = ({ selectDiamond, onLoadImgages, diamond }) => {
    console.log(diamond);

    async function WebpIsSupported() {
        // If the browser doesn't has the method createImageBitmap, you can't display webp format
        if (!window.createImageBitmap) return false;

        // Base64 representation of a white point image
        const webpData =
            "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=";

        // Retrieve the Image in Blob Format
        const blob = await fetch(webpData).then(r => r.blob());

        // If the createImageBitmap method succeeds, return true, otherwise false
        return createImageBitmap(blob).then(() => true, () => false);
    }

    WebpIsSupported() ? console.log('Supported') : console.log('No');
    return (
        <div className="diamond">
            <a href="/#" onClick={selectDiamond}>
                <ImageRef className="diamond-img" src={WebpIsSupported() ? diamond.imageWithWebP.webP.fluid.src : diamond.imageWithWebP.webP.fluid.src} alt="diamond" onLoad={onLoadImgages} onError={onLoadImgages} />
            </a>
        </div>
    )
}

export default Diamond;

Diamond.propTypes = {
    selectDiamond: PropTypes.func.isRequired,
    onLoadImgages: PropTypes.func.isRequired,
    diamond: PropTypes.object.isRequired
}