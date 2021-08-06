import React from 'react';
import PropTypes from 'prop-types';
import { ImageRef } from './ImageRef';


const Diamond = ({ selectDiamond, onLoadImgages, diamond, WebpIsSupported = false }) => {

    return (
        <div className="diamond">
            <a href="/#" onClick={selectDiamond}>
                <ImageRef className="diamond-img" src={/*WebpIsSupported ?*/  diamond.imageWithWebP.webP.fluid.src /*: diamond.imageWithWebP.originalImage.fluid.src*/} alt="diamond" onLoad={onLoadImgages} onError={onLoadImgages} />
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