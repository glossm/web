import React, {PureComponent} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class LanguageMapInfoBox extends PureComponent {

  render() {
    const {info} = this.props;
    const displayName = `${info.lang}, ${info.state}`;

    return (
      <div className="LanguageMapInfoBox-container">
        <div className="LanguageMapInfoBox-title">{info.name}</div>
        <hr/>
        <div className="LanguageMapInfoBox-location"><span className="LanguageMapInfoBox-icon" ><FontAwesomeIcon icon="globe"/></span>???</div>
        <div className="LanguageMapInfoBox-users"><span className="LanguageMapInfoBox-icon" ><FontAwesomeIcon icon="users"/></span>{info.numSpeakers}<br/></div>
        <div className="LanguageMapInfoBox-danger"><span className="LanguageMapInfoBox-icon" ><FontAwesomeIcon icon="exclamation-circle"/></span>{info.endangerment}</div>
      </div>
    );
  }
}
