import React from 'react';
import PropTypes from 'prop-types';

const Splash = ({ img, onLoadImgages }) => {
    return (
        <img
            className="splash"
            src={img}
            alt="splash"
            onLoad={onLoadImgages(img)}
        />
    );
}

export default Splash;

Splash.propTypes = {
    img: PropTypes.string.isRequired,
    onLoadImgages: PropTypes.func.isRequired
}