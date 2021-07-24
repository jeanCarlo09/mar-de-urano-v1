import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Diamond = ({ selectDiamond, onLoadImgages, diamond }) => {

    const ref = useRef(null);

    useEffect(() => {
        ref.current.complete &&
            console.log('Cargado');
    }, []);

    return (
        <div className="diamond">
            <a href="/#" onClick={selectDiamond}>
                <img
                    className="diamond-img"
                    src={diamond.image.fluid.src}
                    alt="diamond"
                    onLoad={onLoadImgages}
                    ref={ref}
                />

            </a>
        </div>
    )
}

export default Diamond;

Diamond.propTypes = {
    selectDiamond: PropTypes.func.isRequired,
    onLoadImgages: PropTypes.func.isRequired
}