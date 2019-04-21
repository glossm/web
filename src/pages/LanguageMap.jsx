import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, Container, Header } from 'semantic-ui-react';
import axios from 'axios';
import humanFormat from 'human-format';
import MapGL, { Marker, Popup} from 'react-map-gl';
import CityPin from './city-pin';
import LanguageMapInfoBox from './LanguageMapInfoBox';


const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

class LanguageMap extends Component {
  state = {
    viewport: {
      latitude: 43.13,
      longitude: 8.28,
      zoom: 1,
      bearing: 0,
      pitch: 0
    },
    popupIngo: null,
    redirect: false,
    languages: [],
  };

  componentWillMount() {
    this.fetchLanguages();
  }

  async fetchLanguages() {
    const response = await axios.get('core/languages/');
    const languages = response.data;
    this.setState({ languages });
  }


  _updateViewport = (viewport) => {
    this.setState({viewport});
  }

  _renderMarker = (city, index) => {
    return (
      <Marker 
        key={`marker-${index}`}
        longitude={city.longitude}
        latitude={city.latitude} >
        <CityPin size={20} 
          color={city.learning?"#d55e2d":"#808080"}
          onMouseOver={() => this.setState({popupInfo: city})} 
          onMouseOut={() => this.setState({popupInfo: null})}
          onClick={() => this.setState({redirect:city.id})} />
      </Marker>
    );
  }

  _renderPopup() {
    const {popupInfo} = this.state;

    return this.state.redirect ?
      <Redirect to={`/language/${this.state.redirect}`}/> :
      (popupInfo && (
      <Popup tipSize={5}
        className="LanguageMap-popup"
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        closeOnClick={false}
        closeButton={false}>
        <LanguageMapInfoBox info={popupInfo} />
      </Popup>)
    );
  }

  render() {
    return (
      <Container>
        <MapGL
          {...this.state.viewport}
          width={'100%'}
          height={'80vh'}
          mapboxApiAccessToken={'pk.eyJ1Ijoia2hsayIsImEiOiJjanU1NmJweWowNGt5M3lrOWhjbXVpcjBrIn0.z9qek7njV_NwizlldS5HLQ'}
          onViewportChange={(viewport) => {
            this.setState({viewport});
          }}
        >
          { this.state.languages.map(this._renderMarker)}
          {this._renderPopup()}
        </MapGL>
      </Container>
    );
  }
}

export default LanguageMap;
