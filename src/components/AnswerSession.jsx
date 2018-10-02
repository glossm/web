import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Header, Table,Image } from 'semantic-ui-react';
import Sound from 'react-sound';
import './Answer.css';
import axios from 'axios';
import { CHECK_AS_LEANRED } from '../actions/transcription';
const propTypes = {
  audio: PropTypes.string,
  meaning: PropTypes.shape({}).isRequired,
  records : PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  image : PropTypes.string,
};

const defaultProps = {
  audio: null,
  records : null,
  image :null,
};

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ko', name: 'Korean' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'mn', name: 'Mongolian' },
];

class AnswerSession extends Component {
  constructor(props){ 
    super(props)
    this.onTextChange = this.onTextChange.bind(this)
    // this.specialOnKeyPress = this.specialOnKeyPress.bind(this)
    // this.specialOnKeyUp = this.specialOnKeyUp.bind(this)
    this.state = {
      answer: '',
      playing: false,
      playingDisabled: true,
      loadFailed: false,
      langs: this.props.meaning.en,
      selectedLang: 'en',
      listPhoneme: [],
      graphs: {},
      ctrlPressed: false
    };
  }

  componentWillMount = async () => {
    // axios : 
    // languages/<int:lang_id>/topics/<int:topic_id>/records/ 
    // 음소목록에 대한 api call 을 통한 데이터 집어 넣기 
    const { data: records } = await axios.get(`core/languages/`);
    // console.log("record is ",records)
   
    this.setState(
      {listPhoneme : records
      }
      
    )
    console.log("list: ", this.state.listPhoneme)
    console.log("graphs :",this.state.graphs)
  }
  onChange = (e, { name, value }) => this.setState({ [name]: value });
  onSubmit = () => {
    const { onSubmit } = this.props;
    const { answer } = this.state;
    onSubmit(answer);
  };
  onLoad = ({ loaded }) => {
    if (loaded) {
      this.setState({ playingDisabled: false });
    } else {
      this.setState({ loadFailed: true });
    }
    
  };
  onPlay = () => this.setState({ playing: true });

  onFinishedPlaying = () => this.setState({ playing: false });

  // specialOnKeyPress = (e) => { 
  //   e.preventDefault(); 
  //   if(e.keyCode == 17) {
  //     this.setState({ ctrlPressed: true })
  //   }
  //   if(this.state.ctrlPressed) {
  //     const lastInputChar = this.state.answer.charAt(this.state.answer.length)
  //   } else {
  //     const charToPut = String.fromCharCode(e.keyCode)
  //     if(charToPut.length > 0 ) {
  //       this.setState({
  //         answer: this.state.answer + charToPut
  //       })
  //     }
  //   }
  // }
  // specialOnKeyUp = (e) => {
  //   e.preventDefault();
  //   if(e.keyCode == 17) {
  //     this.setState({ ctrlPressed: false })
  //   }
  // }
  
  onTextChange = (e) => {
    const lang = e.target.textContent
    if(this.props.meaning[lang]) {
      this.setState({
        langs: this.props.meaning[lang],
        selectedLang: lang
      })
    } else {
      this.setState({
        langs: this.props.meaning.en,
        selectedLang: 'en'
      })
    }
  }

  render() {
    const { audio, meaning, records,image} = this.props;
    const { answer, playing, playingDisabled, loadFailed} = this.state;
    const { PLAYING, STOPPED } = Sound.status;
    const tableData = this.state.listPhoneme.map((item, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell>{item.id}</Table.Cell>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.level}</Table.Cell>
        </Table.Row>
      )
    })
    {console.log("image :",image)};

    let playButtonText = 'Play';
    if (!audio) playButtonText = 'No audio source';
    if (loadFailed) playButtonText = 'Invalid audio source';
    
    return (
        <Fragment>
          <Header content="What does this sound like?" />
          {audio && (
            <Sound
              autoLoad
              url={audio}
              playStatus={playing ? PLAYING : STOPPED}
              onLoad={this.onLoad}
              onFinishedPlaying={this.onFinishedPlaying}
            />
          )}
          
          <Button
            content={playButtonText}
            icon="play"
            onClick={this.onPlay}
            disabled={playingDisabled}
          />
          <div style={{ height: '50px' }}>
            <div id="buttonsize">뜻</div>
            <Form id = "font">

              <Form.Input 
                readOnly
                value={this.state.langs}
              />
            
          </Form>
            <Button content="ko" id="buttonsize" onClick={this.onTextChange} />
            <Button content="en" id="buttonsize" onClick={this.onTextChange} />
            <Button content="ru" id="buttonsize" onClick={this.onTextChange} />
            <Button content="zn" id="buttonsize" onClick={this.onTextChange} />
            <Button content="mn" id="buttonsize" onClick={this.onTextChange} />
          </div>
          <Form onSubmit={this.onSubmit}>
            <Form.Input
              name="answer"
              placeholder="Your Answer"
              value={this.state.answer}
              onChange={this.onChange}
              // onKeyDown={this.specialOnKeyPress}
              // onKeyUp={this.specialOnKeyUp}
            />
            <Form.Button content="Submit" color="green" />
          </Form>

          <div>
            <div id = "phoneme">
              음소목록 {/* 접기기능 추후 */}
              <Table celled className="test" >
           
            <Table.Body>
              {tableData}
            </Table.Body>
  
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='3'>
                  
                    
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
            </div>
            
            <div id = "graphic">
            
              파형 그래프 
              <Image src={image}/>
            </div>
          </div>
        </Fragment>
        
    );
  }
}




AnswerSession.propTypes = propTypes;
AnswerSession.defaultProps = defaultProps;

export default AnswerSession;
