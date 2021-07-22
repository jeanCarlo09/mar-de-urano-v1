import React, { useState, useEffect } from "react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { composeWithDevTools } from "redux-devtools-extension";

import { Tab, Row, Col, ListGroup, Table } from "react-bootstrap";

import rootReducer from "../redux/reducers/rootReducer";

import MarDeUranoApp from "../components/MarDeUranoApp";
import ShopLayout from "../components/layouts/ShopLayout";

const Faq = ({ data, location }) => {
  const [key, setKey] = useState("#size");

  let hashes = [
    "#size",
    "#shipping",
    "#returns",
    "#contact",
    "#privacy",
    "#stock",
  ];

  let store;

  if (typeof window !== `undefined`) {
    store = createStore(
      rootReducer,
      load(),
      composeWithDevTools(applyMiddleware(thunk, save()))
    );
  } else {
    store = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(thunk))
    );
  }

  useEffect(() => {
    if (location.hash !== "" && hashes.some((h) => h === location.hash)) {
      setKey(location.hash);
    }
  });

  return (
    <Provider store={store}>
      <MarDeUranoApp>
        <ShopLayout headerTop="visible">
          <div className="shop-area pt-95 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <Tab.Container
                    id="list-group-tabs-example"
                    defaultActiveKey="#size"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                  >
                    <Row>
                      <Col sm={4}>
                        <ListGroup
                          bsPrefix="tabs-faq"
                          as="ul"
                          variant="transparent"
                        >
                          <ListGroup.Item action href="#size">
                            Size chart
                          </ListGroup.Item>
                          <ListGroup.Item action href="#shipping">
                            Shipping
                          </ListGroup.Item>
                          <ListGroup.Item action href="#returns">
                            Returns
                          </ListGroup.Item>
                          <ListGroup.Item action href="#contact">
                            Contact
                          </ListGroup.Item>
                          <ListGroup.Item action href="#privacy">
                            Privacy
                          </ListGroup.Item>
                          <ListGroup.Item action href="#stock">
                            Stockists
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                      <Col sm={8}>
                        <Tab.Content>
                          <Tab.Pane eventKey="#returns">
                            <h3>Returns</h3>
                            <br />
                            <p>
                              We have a 3-day return policy, which means you
                              have 3 days after receiving your item to request a
                              return.
                            </p>
                            <p>
                              To be eligible for a return, your item must be in
                              the same condition that you received it, unworn or
                              unused, with tags, and in its original packaging.
                              You’ll also need the receipt or proof of purchase.
                            </p>
                            <p>
                              To start a return, you can contact us at
                              customerservice@mardeurano.com. If your return is
                              accepted, we’ll send you a return shipping label,
                              as well as instructions on how and where to send
                              your package. Items sent back to us without first
                              requesting a return will not be accepted.
                            </p>
                            <p>
                              You can always contact us for any return question
                              at customerservice@mardeurano.com.
                            </p>
                            <br />
                            <h4>Damages and issues</h4>
                            <br />
                            <p>
                              Please inspect your order upon reception and
                              contact us immediately if the item is defective,
                              damaged or if you receive the wrong item, so that
                              we can evaluate the issue and make it right.
                            </p>
                            <br />
                            <h4>Exceptions /non-returnable items</h4>
                            <br />
                            <p>
                              Unfortunately, we cannot accept returns on sale
                              items or gift cards.
                            </p>
                            <br />
                            <h4>Exchanges</h4>
                            <br />
                            <p>
                              The fastest way to ensure you get what you want is
                              to return the item you have, and once the return
                              is accepted, make a separate purchase for the new
                              item.
                            </p>
                            <br />
                            <h4>Refunds</h4>
                            <br />
                            <p>
                              We will notify you once we’ve received and
                              inspected your return, and let you know if the
                              refund was approved or not. If approved, you’ll be
                              automatically refunded on your original payment
                              method. Please remember it can take some time for
                              your bank or credit card company to process and
                              post the refund too.
                            </p>
                          </Tab.Pane>
                          <Tab.Pane eventKey="#size">
                            <h3>Size Chart</h3>
                            <br />
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Size-cm</th>
                                  <th>XS</th>
                                  <th>S</th>
                                  <th>M</th>
                                  <th>L</th>
                                  <th>XL</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Bust</td>
                                  <td>84-89</td>
                                  <td>89-94</td>
                                  <td>94-99</td>
                                  <td>99-104</td>
                                  <td>104-109</td>
                                </tr>
                                <tr>
                                  <td>Waist</td>
                                  <td>61-63.5</td>
                                  <td>66-68.5</td>
                                  <td>71-73.5</td>
                                  <td>77.5-81</td>
                                  <td>86.5</td>
                                </tr>
                                <tr>
                                  <td>Hip</td>
                                  <td>87-90</td>
                                  <td>92.5-95</td>
                                  <td>98-100</td>
                                  <td>104-108</td>
                                  <td>113</td>
                                </tr>
                              </tbody>
                            </Table>
                          </Tab.Pane>
                          <Tab.Pane eventKey="#privacy">
                            <h3>Privacy Police</h3>
                            <br />
                            <p>
                              This Privacy Policy describes how your personal
                              information is collected, used, and shared when
                              you visit or make a purchase from
                              mardeurano.myshopify.com (the “Site”).
                            </p>
                            <br />
                            <h4>Personal information we collect</h4>
                            <br />
                            <p>
                              When you visit the Site, we automatically collect
                              certain information about your device, including
                              information about your web browser, IP address,
                              time zone, and some of the cookies that are
                              installed on your device. Additionally, as you
                              browse the Site, we collect information about the
                              individual web pages or products that you view,
                              what websites or search terms referred you to the
                              Site, and information about how you interact with
                              the Site. We refer to this automatically-collected
                              information as “Device Information”.
                            </p>
                            <h5>
                              We collect Device Information using the following
                              technologies:
                            </h5>
                            <br />
                            <ul>
                              <li>
                                - “Cookies” are data files that are placed on
                                your device or computer and often include an
                                anonymous unique identifier. For more
                                information about cookies, and how to disable
                                cookies, visit http://www.allaboutcookies.org.
                              </li>
                              <li>
                                - “Log files” track actions occurring on the
                                Site, and collect data including your IP
                                address, browser type, Internet service
                                provider, referring/exit pages, and date/time
                                stamps.
                              </li>
                              <li>
                                - “Web beacons”, “tags”, and “pixels” are
                                electronic files used to record information
                                about how you browse the Site.
                              </li>
                            </ul>
                            <br />
                            <p>
                              Additionally when you make a purchase or attempt
                              to make a purchase through the Site, we collect
                              certain information from you, including your name,
                              billing address, shipping address, payment
                              information (including credit card numbers
                              [[INSERT ANY OTHER PAYMENT TYPES ACCEPTED]]),
                              email address, and phone number. We refer to this
                              information as “Order Information”.
                            </p>
                            <p>
                              When we talk about “Personal Information” in this
                              Privacy Policy, we are talking both about Device
                              Information and Order Information.
                            </p>
                            <br />
                            <h4>How do we use your personal information?</h4>
                            <br />
                            <p>
                              We use the Order Information that we collect
                              generally to fulfill any orders placed through the
                              Site (including processing your payment
                              information, arranging for shipping, and providing
                              you with invoices and/or order confirmations).
                              Additionally, we use this Order Information to:
                            </p>
                            <ul>
                              <li>- Communicate with you;</li>
                              <li>
                                - Screen our orders for potential risk or fraud;
                                and
                              </li>
                              <li>
                                - When in line with the preferences you have
                                shared with us, provide you with information or
                                advertising relating to our products or
                                services.
                              </li>
                            </ul>
                            <br />
                            <p>
                              We use the Device Information that we collect to
                              help us screen for potential risk and fraud (in
                              particular, your IP address), and more generally
                              to improve and optimize our Site (for example, by
                              generating analytics about how our customers
                              browse and interact with the Site, and to assess
                              the success of our marketing and advertising
                              campaigns).
                            </p>
                            <br />
                            <h4>Sharing you personal Information</h4>
                            <br />
                            <p>
                              We share your Personal Information with third
                              parties to help us use your Personal Information,
                              as described above. For example, we use Shopify to
                              power our online store--you can read more about
                              how Shopify uses your Personal Information here:
                              https://www.shopify.com/legal/privacy. We also use
                              Google Analytics to help us understand how our
                              customers use the Site -- you can read more about
                              how Google uses your Personal Information here:
                              https://www.google.com/intl/en/policies/privacy/.
                              You can also opt-out of Google Analytics here:
                              https://tools.google.com/dlpage/gaoptout.
                            </p>
                            <p>
                              Finally, we may also share your Personal
                              Information to comply with applicable laws and
                              regulations, to respond to a subpoena, search
                              warrant or other lawful request for information we
                              receive, or to otherwise protect our rights.
                            </p>
                            <br />
                            <h4>Behavioural advertising</h4>
                            <br />
                            <p>
                              As described above, we use your Personal
                              Information to provide you with targeted
                              advertisements or marketing communications we
                              believe may be of interest to you. For more
                              information about how targeted advertising works,
                              you can visit the Network Advertising Initiative’s
                              (“NAI”) educational page at
                              http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
                            </p>
                            <p>
                              You can opt out of targeted advertising by using
                              the links below:
                            </p>
                            <ul>
                              <li>
                                - Facebook:{" "}
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href="https://www.facebook.com/settings/?tab=ads"
                                >
                                  https://www.facebook.com/settings/?tab=ads
                                </a>
                              </li>
                              <li>
                                - Google:{" "}
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href="https://www.google.com/settings/ads/anonymous -"
                                >
                                  https://www.google.com/settings/ads/anonymous
                                </a>
                              </li>
                              <li>
                                - Bing:{" "}
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads"
                                >
                                  https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
                                </a>
                              </li>
                            </ul>
                            <br />
                            <p>
                              Additionally, you can opt out of some of these
                              services by visiting the Digital Advertising
                              Alliance’s opt-out portal at:{" "}
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href="http://optout.aboutads.info/"
                              >
                                http://optout.aboutads.info/
                              </a>
                              .
                            </p>
                            <br />
                            <h4>Do not track </h4>
                            <br />
                            <p>
                              Please note that we do not alter our Site’s data
                              collection and use practices when we see a Do Not
                              Track signal from your browser.
                            </p>
                            <br />
                            <h4>Your rights </h4>
                            <br />
                            <p>
                              If you are a European resident, you have the right
                              to access personal information we hold about you
                              and to ask that your personal information be
                              corrected, updated, or deleted. If you would like
                              to exercise this right, please contact us through
                              the contact information below.
                            </p>
                            <p>
                              Additionally, if you are a European resident we
                              note that we are processing your information in
                              order to fulfill contracts we might have with you
                              (for example if you make an order through the
                              Site), or otherwise to pursue our legitimate
                              business interests listed above. Additionally,
                              please note that your information will be
                              transferred outside of Europe, including to Canada
                              and the United States.
                            </p>
                            <br />
                            <h4>Data retention</h4>
                            <br />
                            <p>
                              When you place an order through the Site, we will
                              maintain your Order Information for our records
                              unless and until you ask us to delete this
                              information.
                            </p>
                            <br />
                            <h4>Changes</h4>
                            <br />
                            <p>
                              We may update this privacy policy from time to
                              time in order to reflect, for example, changes to
                              our practices or for other operational, legal or
                              regulatory reasons.
                            </p>
                            <br />
                            <h4>Minors</h4>
                            <br />
                            <p>
                              The Site is not intended for individuals under the
                              age of [[INSERT AGE]].
                            </p>
                            <br />
                            <h4>Contact us </h4>
                            <br />
                            <p>
                              For more information about our privacy practices,
                              if you have questions, or if you would like to
                              make a complaint, please contact us by e‑mail at{" "}
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href="mailto:mardeurano.cr@gmail.com?subject=Re: Privacy Compliance Officer"
                              >
                                mardeurano.cr@gmail.com
                              </a>{" "}
                              or by mail using the details provided below:
                            </p>
                            <p>mardeurano </p>
                            <p>[Re: Privacy Compliance Officer]</p>
                            <p>Mar De Urano 10803 San Jose , Costa Rica</p>
                          </Tab.Pane>
                          <Tab.Pane eventKey="#shipping">
                            <h3>Shipping & payment</h3>
                            <br />
                            <h4>Payment </h4>
                            <br />
                            <p>Mar De Urano accepts payment in the form of:</p>
                            <p>
                              Visa, MasterCard, Discover, American Express, and
                              PayPal. A sales tax is applicable to all orders.
                            </p>{" "}
                            <p>
                              Promotional discount codes cannot be combined.
                            </p>
                            <br />
                            <h4>Shipping & Handling</h4>
                            <br />
                            <p>
                              Mar De Urano ships to both U.S. and international
                              addresses. To estimate the total delivery time for
                              your order, please allow two business days for
                              your order to be processed, in addition to the
                              time indicated by your preferred shipping method.
                              The orders you place on out site are processed and
                              delivered Monday through Friday, without including
                              holidays. All of the quoted international shipping
                              fees do not include custom & duty fees. Customer
                              is responsible for all customs & duty fees.
                              International shipping fees may vary depending on
                              the country of delivery. Quotes will be provided
                              accordingly.
                            </p>
                            <br />
                            <h4>Domestic Shipping.</h4>
                            <br />
                            <p>
                              Orders placed before 2pm AEST can be shipped the
                              same day, depending on availability on stock.
                              Shipping withing GAM has a delivery expectancy of
                              1-2 business days, outside GAM orders are
                              delivered within 3-5 business days.
                            </p>
                            <br />
                            <h4>CR rates</h4>
                            <br />
                            <p>Express Shipping: $3 </p>
                            <p>Overnight Delivery:$10 </p>
                            <br />
                            <h4>International Shipping </h4>
                            <br />
                            <Table bordered="true" striped="false">
                              <tbody>
                                <tr>
                                  <td>2-Day Shipping</td>
                                  <td>2 Business Days</td>
                                  <td>$15</td>
                                </tr>
                                <tr>
                                  <td>Overnight</td>
                                  <td>1 Business Day</td>
                                  <td>$30.00</td>
                                </tr>
                              </tbody>
                            </Table>
                          </Tab.Pane>
                          <Tab.Pane eventKey="#contact">
                            <h3>Contact</h3>
                            <br />
                            <p>
                              For customer and wholesale inquiries reach us at{" "}
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href="mailto:info@mardeurano.com"
                              >
                                info@mardeurano.com
                              </a>
                              .
                            </p>
                            <p>T. 506.8548.5921</p>
                            <br />
                            <div className="col-12 m-0 p-0">
                              <div className="contact-form">
                                <div className="contact-title">
                                  <h2>Get In Touch</h2>
                                </div>
                                <form className="contact-form-style">
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <input
                                        name="name"
                                        placeholder="Name*"
                                        type="text"
                                      />
                                    </div>
                                    <div className="col-lg-6">
                                      <input
                                        name="email"
                                        placeholder="Email*"
                                        type="email"
                                      />
                                    </div>
                                    <div className="col-lg-12">
                                      <input
                                        name="subject"
                                        placeholder="Subject*"
                                        type="text"
                                      />
                                    </div>
                                    <div className="col-lg-12">
                                      <textarea
                                        name="message"
                                        placeholder="Your Message*"
                                        defaultValue={""}
                                      />
                                      <button className="submit" type="submit">
                                        SEND
                                      </button>
                                    </div>
                                  </div>
                                </form>
                                <p className="form-messege" />
                              </div>
                            </div>
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </ShopLayout>
      </MarDeUranoApp>
    </Provider>
  );
};

export default Faq;
