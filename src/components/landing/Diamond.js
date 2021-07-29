import React from 'react';
import PropTypes from 'prop-types';
import { ImageRef } from './ImageRef';


const Diamond = ({ selectDiamond, onLoadImgages, diamond, WebpIsSupported = true }) => {

    return (
        <div className="diamond">
            <a href="/#" onClick={selectDiamond}>
                <ImageRef className="diamond-img" width="80" height="92" src={diamond.imageWithWebP.webP.fluid.src} alt="diamond" onLoad={onLoadImgages} onError={onLoadImgages} />
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