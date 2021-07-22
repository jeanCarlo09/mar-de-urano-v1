import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { Modal } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import "../assets/scss/mardeurano.scss";

export default function Index() {
  const [show, setShow] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(true);

  const handleClose = () => setShow(false);

  const handleOnClick = (e) => {
    e.preventDefault();

    const randomNumber = Math.ceil(1 + Math.random() * (27 - 1));

    const image = require(`../assets/images/landingimages/image-${randomNumber}.jpg`);

    setCurrentImage(image);

    setShow(true);

    console.log(e);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return loading ? (
    <div className="d-flex justify-content-center align-items-center flex-column mt-5">
      <div className="loader">Loading...</div>
      <img
        width="200"
        src="https://images.ctfassets.net/ijlmja73rgg8/20NYXvslVeG3fMrkdB8VA/3f4f34345b97c6ed877cacbb274a0c6a/MDU_LOGOS_Mesa_de_trabajo_1.png?w=150&h=30&q=50&fit=fill&f=center"
        alt=""
      />
    </div>
  ) : (
    <div className="index">
      <div className="link">
        <Link to="/home">
          <img src="images/Shop.png" alt="" />
        </Link>
      </div>

      <div className="DIVGuacamaya">
        <a
          href="/"
          data-toggle="modal"
          data-target="#Guacamaya"
          onClick={handleOnClick}
        >
          <img
            className="Guacamaya"
            src={require("../assets/images/Guacamaya.gif")}
            alt="Guacamaya"
          />
        </a>
      </div>

      <div className="Diamante1">
        <a
          href="/"
          data-toggle="modal"
          data-target="#Diamante1"
          onClick={handleOnClick}
        >
          <img
            className="diamante1"
            src={require("../assets/images/cristaleslluvia01.png")}
            alt=""
          />
        </a>
      </div>

      <div className="Diamante2">
        <a
          href="/"
          data-toggle="modal"
          data-target="#Diamante2"
          onClick={handleOnClick}
        >
          <img
            className="diamante2"
            src={require("../assets/images/cristaleslluvia02.png")}
            alt=""
          />
        </a>
      </div>
      <div className="Diamante3">
        <a
          href="/"
          data-toggle="modal"
          data-target="#Diamante3"
          onClick={handleOnClick}
        >
          <img
            className="diamante3"
            src={require("../assets/images/cristaleslluvia03.png")}
            alt=""
          />
        </a>
      </div>
      <div className="Diamante4">
        <a
          href="/"
          data-toggle="modal"
          data-target="#Diamante4"
          onClick={handleOnClick}
        >
          <img
            className="diamante4"
            src={require("../assets/images/cristaleslluvia04.png")}
            alt=""
          />
        </a>
      </div>

      <div className="Diamante5">
        <a
          href="/"
          data-toggle="modal"
          data-target="#Diamante5"
          onClick={handleOnClick}
        >
          <img
            className="diamante5"
            src={require("../assets/images/cristaleslluvia05.png")}
            alt=""
          />
        </a>
      </div>

      <div className="contentBosque">
        <img
          className="bosque"
          src={require("../assets/images/bosque.png")}
          alt=""
        />
      </div>

      <div className="contentOlas">
        <img className="olas" src="images/olas.gif" alt="" />
      </div>
      <img
        className="splash1"
        src={require("../assets/images/Splash_GIF.gif")}
        alt=""
      />
      <img
        className="splash2"
        src={require("../assets/images/Splash_GIF.gif")}
        alt=""
      />

      <div className="contentTiburcio">
        <img
          className="tiburcio"
          src={require("../assets/images/tiburcio.png")}
          alt=""
        />
      </div>

      <Modal
        className="modal-landing"
        show={show}
        onHide={handleClose}
        size="sm"
      >
        <Modal.Body>
          {currentImage !== "" && (
            <div className="container-image">
              <Image fluid src={currentImage} alt="Mar de Urano" />
              <button className="btn-close" onClick={handleClose}>
                X
              </button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
