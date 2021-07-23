import React from 'react'
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

const CollectionList = ({ collections }) => {

    return (
        <div className="shop-area pt-95 pb-100">
            <div className="container-fluid">
                <div className="row">
                    <div className="grid-mosaic col-12">

                        {collections.map(collection => (

                            <div key={collection.id} className="grid-mosaic-item">
                                <img className="grid-mosaic-item-img" src={(collection.image.localFile) ? collection.image.localFile.childImageSharp.fixed.src : ''} alt={collection.title} />
                                <Link className="grid-mosaic-item-title" key={collection.id} to={`/collections?${collection.handle}`}>
                                    <h4>{collection.title}</h4>
                                </Link>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

}

CollectionList.propTypes = {
    collections: PropTypes.array.isRequired
}

const mapStateToProps = state => {
    return {
        collections: state.collectionData.collections,
    };
};

export default connect(mapStateToProps)(CollectionList);