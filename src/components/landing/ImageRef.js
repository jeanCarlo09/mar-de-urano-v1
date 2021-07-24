import React, { useEffect, useRef } from 'react';


export const ImageRef = ({ ...props }) => {

    const ref = useRef(null);

    useEffect(() => {
        ref.current.complete &&
            console.log('Cargado');
    }, []);

    return (
        <img
            {...props}
            ref={ref}
        />
    );

}
