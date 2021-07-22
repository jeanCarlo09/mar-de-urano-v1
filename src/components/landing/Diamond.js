import React from 'react';
import PropTypes from 'prop-types';

const Diamond = ({ img, selectDiamond, onLoadImgages }) => {

    return (
        <div className="diamond">
            <a href="/#" onClick={selectDiamond}>
                <img
                    className="diamond-img"
                    src={img}
                    alt="diamond"
                    onLoad={onLoadImgages}
                />
            </a>
        </div>
    )
}

export default Diamond;

Diamond.propTypes = {
    img: PropTypes.string.isRequired,
    selectDiamond: PropTypes.func.isRequired,
    onLoadImgages: PropTypes.func.isRequired
}