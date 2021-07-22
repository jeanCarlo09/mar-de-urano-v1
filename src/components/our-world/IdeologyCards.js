import React from 'react';
import parse from 'html-react-parser';

const IdeologyCards = ({ card }) => {

    return (
        <div className="col-md-6  col-sm-12 ideology-cards-item">
            <article className="ideology-cards-item-content">
                <div className="ideology-cards-item-content-title">
                    <h2>{card.title}</h2>
                </div>
                <div className="ideology-cards-item-content-description">
                    {parse(`${card.description.childMarkdownRemark.html}`)}
                </div>
            </article>
        </div>
    );
}

export default IdeologyCards;