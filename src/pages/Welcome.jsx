import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation} from 'react-i18next';

function Welcome() {
  const { t, i18n} = useTranslation();
  return (
    <div>
      <header className="welcome-masthead">
        <div className="container h-100">
          <div className="bs-row h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-10 align-self-end">
              <h1 className="text-uppercase text-white font-weight-bold" dangerouslySetInnerHTML={{__html:t('welcome.title1')}}></h1>
              <hr className="divider my-4"></hr>
            </div>
            <div className="col-lg-8 align-self-baseline">
              <p className="text-white-75 font-weight-light mb-5" dangerouslySetInnerHTML={{__html: t('welcome.text1')}}></p>
              <a className="welcome-btn welcome-btn-primary welcome-btn-xl js-scroll-trigger" href="/login">{t('welcome.joinnow')}</a>
            </div>
          </div>
        </div>
      </header>

      <section className="page-section welcome-bg-primary" id="about">
        <div className="container">
          <div className="bs-row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="text-white mt-0">{t('welcome.title2')}</h2>
              <hr className="divider light my-4"></hr>
              <p className="text-white-50 mb-4">{t('welcome.text2')}</p>
              <a className="welcome-btn welcome-btn-light welcome-btn-xl js-scroll-trigger" href="#services">{t('welcome.getstarted')}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" id="services">
        <div className="container">
          <h2 className="text-center mt-0">At Your Service</h2>
          <hr className="divider my-4"></hr>
          <div className="bs-row">
            <div className="col-lg-3 col-md-6 text-center">
              <div className="mt-5">
                <FontAwesomeIcon icon="gem" size="4x" className="welcome-text-primary mb-4"/>
                <h3 className="h4 mb-2">Sturdy Themes</h3>
                <p className="text-muted mb-0">Our themes are updated regularly to keep them bug free!</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="mt-5">
                <FontAwesomeIcon icon="laptop-code" size="4x" className="welcome-text-primary mb-4"/>
                <h3 className="h4 mb-2">Up to Date</h3>
                <p className="text-muted mb-0">All dependencies are kept current to keep things fresh.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="mt-5">
                <FontAwesomeIcon icon="globe" size="4x" className="welcome-text-primary mb-4"/>
                <h3 className="h4 mb-2">Ready to Publish</h3>
                <p className="text-muted mb-0">You can use this design as is, or you can make changes!</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="mt-5">
                <FontAwesomeIcon icon="heart" size="4x" className="welcome-text-primary mb-4"/>
                <h3 className="h4 mb-2">Made with Love</h3>
                <p className="text-muted mb-0">Is it really open source if it's not made with love?</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section bg-dark text-white">
        <div className="container text-center">
          <h2 className="mb-4">Free Download at Start Bootstrap!</h2>
          <a className="btn btn-light btn-xl" href="https://startbootstrap.com/themes/creative/">Download Now!</a>
        </div>
      </section>

      <section className="page-section" id="contact">
        <div className="container">
          <div className="bs-row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="mt-0">Let's Get In Touch!</h2>
              <hr className="divider my-4"/>
              <p className="text-muted mb-5">Ready to start your next project with us? Give us a call or send us an email and we will get back to you as soon as possible!</p>
            </div>
          </div>
          <div className="bs-row">
            <div className="col-lg-4 ml-auto text-center">
              <i className="fas fa-phone fa-3x mb-3 text-muted"></i>
              <div>+1 (202) 555-0149</div>
            </div>
            <div className="col-lg-4 mr-auto text-center">
              <i className="fas fa-envelope fa-3x mb-3 text-muted"></i>
              <a className="d-block" href="mailto:contact@yourwebsite.com">contact@yourwebsite.com</a>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}

export default Welcome;
