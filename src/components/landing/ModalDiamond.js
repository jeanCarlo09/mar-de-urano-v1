import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

const ModalDiamond = ({ handleClose, show, loadingImg, loading, currentImage }) => {

    return (
        <>
            < Modal
                dialogClassName="modal-landing"
                show={show}
                onHide={handleClose}
                size="sm"
                centered
            >
                <Modal.Body>
                    {currentImage !== '' && (
                        <div className="container-image">
                            <Image onLoad={loadingImg} fluid src={currentImage} alt="Image art" />
                            {(!loading) &&
                                <button className="btn-close" onClick={handleClose}>
                                    <i className="fa fa-remove btn-close-icon"></i>
                                </button>
                            }
                        </div>
                    )}

                </Modal.Body>
            </Modal >
        </>
    );
}

export default ModalDiamond;


ModalDiamond.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    loadingImg: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    currentImage: PropTypes.string.isRequired
}
