import React, { useState, useEffect, useMemo, useRef } from 'react';
import { graphql, Link } from 'gatsby';
import get from "lodash/get";

import Diamond from '../components/landing/Diamond';
import ModalDiamond from '../components/landing/ModalDiamond';
import Splash from '../components/landing/Splash';

import "../assets/scss/mardeurano.scss";
import { ImageRef } from '../components/landing/ImageRef';
import { WebpIsSupported } from '../helpers/landing';

export default function Index({ data }) {


  const landingPage = useMemo(() => get(data, 'allContentfulLandingPage.nodes')[0]);
  const diamonds = useMemo(() => get(landingPage, 'imageDiamonds.diamonds'));
  const imagesDiamonds = useMemo(() => get(landingPage, 'imageLandingArtDiamonds.images'));

  // const supportedWebp = WebpIsSupported().then();
  const [supportedWebp, setSupportedWebp] = useState(false);

  const countImages = useRef(0);

  const [bitmap, setBitmap] = useState(null);

  const [show, setShow] = useState(false); //hook state to show modal with images art
  const [loading, setLoading] = useState(false); //state while image is charging in modal
  const [loadingImages, setloadingImages] = useState(true); //state while images in landing is charging
  const [promotion, setPromotion] = useState(true); // state for instructions click on diamonds and shop
  const handleClose = () => setShow(false); // set sate to close modal
  const [currentImage, setCurrentImage] = useState("");

  const handleOnClick = () => {  // set sate to open modal and load image to show in modal
    setCurrentImage(imagesDiamonds[countImages.current].image.fixed.src);
    setLoading(true);
    setShow(true);

    (countImages.current + 1 === imagesDiamonds.length) ? countImages.current = 0 : countImages.current++;
  };

  const loadingImg = () => { // set te state to landing when image in modal is charge
    setLoading(false);
  }

  const images = {
    landingLogo: supportedWebp ? landingPage.landingLogoWithWebP.webP.fluid.src : landingPage.landingLogoWithWebP.originalImage.fluid.src,
    shopImg: supportedWebp ? landingPage.shopImgWithWebP.webP.fluid.src : landingPage.shopImgWithWebP.originalImage.fluid.src,
    olasImg: supportedWebp ? landingPage.wavesWithWebP.webP.fluid.src : landingPage.wavesWithWebP.originalImage.fluid.src,
    splash: supportedWebp ? landingPage.splashWithWebP.webP.fluid.src : landingPage.splashWithWebP.originalImage.fluid.src,
    forest: supportedWebp ? landingPage.forestWithWebP.webP.fluid.src : landingPage.forestWithWebP.originalImage.fluid.src,
    macaw: supportedWebp ? landingPage.macawWithWebP.webP.fluid.src : landingPage.macawWithWebP.originalImage.fluid.src,
    shark: supportedWebp ? landingPage.sharkWithWebP.webP.fluid.src : landingPage.sharkWithWebP.originalImage.fluid.src,
    promotion: supportedWebp ? landingPage.promotionWithWebP.webP.fluid.src : landingPage.promotionWithWebP.originalImage.fluid.src,
  }

  const imagesLength = useRef(Object.keys(images).length + diamonds.length);
  // const [imagesLength, setImagesLength] = useState(Object.keys(images).length);

  const onLoadImgages = () => { // when images in landing is charged, set state to stop charging in landing
    (imagesLength.current <= 0) ? setTimeout(() => { setloadingImages(false); }, 2000) : imagesLength.current--;
    // count of images in landing (+1 is because splash is two)
  }

  const changeStatePromotion = () => { // set the state to hide the instructions of diamonds and bottom shop
    setPromotion(true);
  }


  useEffect(() => {
    setBitmap(!window.createImageBitmap);
    WebpIsSupported(bitmap, setSupportedWebp);
  }, []);

  useEffect(() => { // hook to show the instructions of diamonds and bottom shop
    (promotion) && setTimeout(() => { setPromotion(false) }, 45000);

  }, [promotion]);

  return (
    <div className="index">
      {
        diamonds.map((diamond, key) => (
          <Diamond key={key} selectDiamond={handleOnClick} onLoadImgages={onLoadImgages} diamond={diamond} />
        ))
      }

      <Splash img={images.splash} onLoadImgages={onLoadImgages} />
      <Splash img={images.splash} onLoadImgages={onLoadImgages} />

      <div className="landing-logo">
        <ImageRef src={images.landingLogo} alt="logo mar de urano" className="landing-logo-img" onLoad={onLoadImgages} onError={onLoadImgages} />
      </div>


      <div className="link">
        {(promotion) &&
          <div className="promotion">
            <ImageRef src={images.promotion} alt="instructions" className="promotion-img" onLoad={onLoadImgages} onError={onLoadImgages} />
            <div className="arrow bounce">
              <i className="fa fa-arrow-down fa-2x"></i>
            </div>
          </div>
        }

        <Link to="/home">
          <ImageRef src={images.shopImg} alt="img" className="link-img" onLoad={onLoadImgages} onError={onLoadImgages} />
        </Link>
      </div>

      <div className="contentOlas">
        <ImageRef className="olas" src={images.olasImg} alt="waves" onLoad={onLoadImgages} onError={onLoadImgages} />
      </div>


      <div className="contentBosque">
        <ImageRef className="bosque" src={images.forest} alt="bosque" onLoad={onLoadImgages} onError={onLoadImgages} />
      </div>

      <div className="DIVGuacamaya">
        <ImageRef className="Guacamaya" src={images.macaw} alt="Guacamaya" onLoad={onLoadImgages} onError={onLoadImgages} />
      </div>

      <div className="contentTiburcio">
        <ImageRef className="tiburcio" src={images.shark} alt="shark" onLoad={onLoadImgages} onError={onLoadImgages} />
      </div>


      {(!promotion) && <button className="helper-landing" onClick={changeStatePromotion}><i className="fa fa-question"></i></button>}
      {(loadingImages || loading) &&
        <div className={`loader ${loadingImages ? 'loader-content-images' : 'loader-content-diamonds'}`}>
          <div className="loader-box"></div>
          <div className="loader-shadow"></div>
          {(loadingImages) ? <img className="loader-logo" src={images.landingLogo} alt='MarDeUrano' /> : <div className="loader-text"></div>}
        </div>
      }

      <ModalDiamond handleClose={handleClose} show={show} loadingImg={loadingImg} loading={loading} currentImage={currentImage} />
    </div >

  )
}

export const query = graphql`
query ImagesLanding {

  allContentfulLandingPage {
    nodes {
      imageDiamonds {
        diamonds {
          order
          imageWithWebP {
            originalImage {
              fluid {
                src
              }
            }
            webP {
              fluid {
                src
              }
            }
          }

        }
      }
      imageLandingArtDiamonds {
        id
        images {
          image {
            fixed(width: 700, height: 700) {
              src
            }
          }
        }
      }

      landingLogoWithWebP{
        originalImage {
          fluid(maxWidth: 600, quality: 80) {
            src
          }
        }
        webP {
          fluid(maxWidth: 600, quality: 80) {
            src
          }
        }
      }

      wavesWithWebP {
        webP {
          fluid(maxWidth: 1300) {
            src
          }
        }
        originalImage {
          fluid(maxWidth: 1300) {
            src
          }
        }
      }

      forestWithWebP {
        originalImage {
          fluid {
            src
          }
        }
        webP {
          fluid {
            src
          }
        }
      }

      macawWithWebP {
        webP {
          fluid(maxWidth: 500, quality: 80) {
            src
          }
        }
        originalImage {
          fluid(maxWidth: 500, quality: 80) {
            src
          }
        }
      }

      promotionWithWebP {
        webP {
          fluid(maxWidth: 500, quality: 80) {
            src
          }
        }
        originalImage {
          fluid(maxWidth: 500, quality: 80) {
            src
          }
        }
      }

      sharkWithWebP {
        originalImage {
          fluid {
            src
          }
        }
        webP {
          fluid {
            src
          }
        }
      }

      shopImgWithWebP{
        originalImage {
          fluid(maxWidth: 99, quality: 100) {
            src
          }
        }
        webP {
          fluid(maxWidth: 99, quality: 100) {
            src
          }
        }
      }

      splashWithWebP{
        originalImage {
          fluid(maxWidth: 500, quality: 100) {
            src
          }
        }
        webP {
          fluid(maxWidth: 500, quality: 100) {
            src
          }
        }
      }

    }
  }
}
`;