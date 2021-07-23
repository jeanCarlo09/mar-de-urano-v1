import React, { useEffect, useState } from 'react';

export const SocialMedia = () => {

    const [url, setUrl] = useState(null);
    useEffect(() => {
        setUrl(window.location.href);
    }, []);


    return (
        <div className="pro-details-social mt-0">
            <ul>
                <li>
                    <a href={`//facebook.com/sharer/sharer.php?u=${url}`} target="_blank">
                        <i className="fab fa-facebook" />
                    </a>
                </li>
                <li>
                    <a href={`//pinterest.com/pin/create/button/?url=${url}`} target="_blank">
                        <i className="fab fa-pinterest-p" />
                    </a>
                </li>
                <li>
                    <a href={`//twitter.com/intent/tweet?text=${url}`} target="_blank">
                        <i className="fab fa-twitter" />
                    </a>
                </li>
            </ul>
        </div>
    );
}
