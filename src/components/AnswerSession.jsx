import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Header, Table,Image,Progress} from 'semantic-ui-react';
import Sound from 'react-sound';
import './Answer.css';
import axios from 'axios';
import { CHECK_AS_LEANRED } from '../actions/transcription';
import SomeInput from './SomeInput'

const propTypes = {
  audio: PropTypes.string,
  meaning: PropTypes.shape({}).isRequired,
  records : PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  image : PropTypes.string,
  TopicId : PropTypes.string,
  LangId : PropTypes.string,
  
  
};

const defaultProps = {
  audio: null,
  records : null,
  image :null,
  TopicId : null,
  LangId : null,
};

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ko', name: 'Korean' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'mn', name: 'Mongolian' },
];
const IPA = [
  
  {code : 'a', value1 : 'a', value2 : 'ɑ', value3 :'æ', value4 : 'ɐ', value5:'ɑ̃'},
  {code : 'b', value1 : 'b', value2 : 'β', value3 :'ɓ', value4 : 'ʙ'},
  {code : 'c', value1 : 'c', value2 : 'ɕ', value3 :'ç'},
  {code : 'd', value1 : 'd', value2 : 'ð', value3 :'d͡ʒ', value4 : 'ɖ', value5 : 'ɗ'},
  {code : 'e', value1 : 'e', value2 : 'ə', value3 :'ɚ', value4 : 'ɵ', value5 : 'ɘ'},
  {code : 'f', value1 : 'f', value2 : '͡', value3 :'͜', value4 : '‿'},

  {code : 'g', value1 : 'g', value2 : 'ɠ', value3 :'ɢ', value4 : 'ʛ'},
  {code : 'h', value1 : 'h', value2 : 'ɥ', value3 :'ɦ', value4 : 'ħ', value5 : 'ɧ', value6 : 'ʜ'},
  {code : 'i', value1 : 'i', value2 : 'ɪ', value3 :'ɨ', value4 : 'ɪ̈'},
  {code : 'j', value1 : 'j', value2 : 'ɟ', value3 :'ʝ', value4 : 'ʄ'},
  {code : 'k', value1 : 'k'},
  {code : 'l', value1 : 'l', value2 : 'ɫ', value3 :'ɬ', value4 : 'ɭ', value5 : 'ɮ', value6 : 'ʟ'},

  {code : 'm', value1 : 'm', value2 : 'ɱ'},
  {code : 'n', value1 : 'n', value2 : 'ŋ', value3 :'ɲ', value4 : 'ɴ', value5 : 'ɳ'},
  {code : 'o', value1 : 'o', value2 : 'ɔ', value3 :'œ', value5 : 'ø', value5 : 'ɒ', value6 : 'ɔ̃', value7 : 'ɶ'},
  {code : 'p', value1 : 'p', value2 : 'ɸ'},
  {code : 'q', value1 : 'q', value2 : 'ˈ' , value3 : 'ˌ'},
  {code : 'r', value1 : 'r', value2 : 'ɾ', value3 :'ʁ', value4 : 'ɹ', value5 : 'ɻ', value6 : 'ʀ', value7 : 'ɽ', value8 : 'ɺ'},

  {code : 's', value1 : 's', value2 : 'ʃ', value3 :'ʂ'},
  {code : 't', value1 : 't', value2 : 'θ', value3 :'t͡ʃ', value4 : 't͡s', value5 : 'ʈ'},
  {code : 'u', value1 : 'u', value2 : 'ʊ', value3 :'ʉ'},
  {code : 'v', value1 : 'v', value2 : 'ʌ', value3 :'ʋ', value4 : 'ⱱ'},
  {code : 'w', value1 : 'w', value2 : 'ʍ', value3 :'ɯ', value4 : 'ɰ'},
  {code : 'x', value1 : 'x', value2 : 'χ'},

  {code : 'y', value1 : 'y', value2 : 'ʎ', value3 :'ɣ', value4 : 'ʏ', value5 : 'ɤ'},
  {code : 'z', value1 : 'z', value2 : 'ʒ', value3 :'ʐ', value4 : 'ʑ'},
  {code : '2', value1 : '2', value2 : 'ʔ', value3 :'ʕ', value4 : 'ʢ', value5 : 'ʡ'},
  {code : '3', value1 : '3', value2 : 'ɛ', value3 :'ɜ', value4 : 'ɝ', vlaue5 : 'ɛ̃', value6 : 'ɞ'},
];
class AnswerSession extends Component {
  constructor(props){ 
    super(props)
    this.onTextChange = this.onTextChange.bind(this)
    this.openText = this.openText.bind(this)
    this.specialOnKeyPress = this.specialOnKeyPress.bind(this)
    this.specialOnKeyUp = this.specialOnKeyUp.bind(this)
    this.state = {
      answerback : '' ,
      answer: '',
      playing: false,
      playingDisabled: true,
      loadFailed: false,
      langs: this.props.meaning.en,
      selectedLang: 'en',
      listPhoneme: [],
      graphic:[],
      topiclist : '',
      ctrlPressed: false,
      opclStylephoneme :'none',
      opclStylewave : 'none',
      TopicId :'',
      LangId : '', 
      current : '',
      total : '',
      value : '',
      count: '',
      
    };
  }

  componentWillMount = async () => {
    // axios : 
    // languages/<int:lang_id>/topics/<int:topic_id>/records/ 
    // 음소목록에 대한 api call 을 통한 데이터 집어 넣기 
    const { data: records } = await axios.get(`core/languages/`);
    this.setState({
      listPhoneme : records,
      TopicId : this.props.TopicId,
      LangId : this.props.LangId,
    
    })
    
    const progress  = await axios.get(`core/languages/${this.props.LangId}/topics/`);
    this.setState({
      current : progress.data[72-this.props.TopicId].progress.current,
      total : progress.data[72-this.props.TopicId].progress.total
    })
        
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

  specialOnKeyPress = (e) => { 
    
    e.preventDefault();   
    
    if(e.keyCode === 17) {
      this.setState({ ctrlPressed: true })
    }
    if(this.state.ctrlPressed) {
      const lastInputChar = this.state.answer.charAt(this.state.answer.length)
      const charToPut = String.fromCharCode(e.keyCode)
     
      
      const values = 'value' + this.state.count
      if(e.keycode === '65' ){ 
        const lowerBound1 = 0x0250
        const upperBound1 = 0x02AF
        const lowerBound2 = 'a'.charCodeAt(0)
        const upperBound2 = 'z'.charCodeAt(0)
        charToPut.toLowerCase()
      }
      
    }
    else {
      const charToPut = String.fromCharCode(e.keyCode)
        this.setState({
          answer: this.state.answer + charToPut
          
        })
    }
  }
  specialOnKeyUp = (e) => {
    
    e.preventDefault();
    if(e.keyCode === 8 ){
      
      this.setState({
        answer : this.state.answer.substring(0,this.state.answer.length-2)
      })
    }
    if(e.keyCode === 17) {
      
      this.setState({ ctrlPressed: false })
    }
  }

  
  openText = (e)=> {
    const wdata= e.target.textContent
    if(wdata==='음소목록 (누를시 열기/닫기)'&&this.state.opclStylephoneme ==='none'){
      this.setState({opclStylephoneme : ''})
    }
    else if(wdata==='음소목록 (누를시 열기/닫기)'&&this.state.opclStylephoneme ===''){
      this.setState({opclStylephoneme : 'none'})
    }
    else if(wdata ==='파형 그래프 (누를시 열기/닫기)'&&this.state.opclStylewave ==='none'){
      this.setState({opclStylewave:''})
    }
    else if(wdata ==='파형 그래프 (누를시 열기/닫기)'&&this.state.opclStylewave ===''){
      this.setState({opclStylewave:'none'})
    }
  }
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
    const { audio, records,image,LangId,TopicId} = this.props;
    
    const { answer, playing, playingDisabled, loadFailed} = this.state;
    const { PLAYING, STOPPED } = Sound.status;
    
    const popcldisplay = {
      'display' : this.state.opclStylephoneme
    }
    
    const gopcldisplay = {
      'display' : this.state.opclStylewave
     
    }
    const tableData = this.state.listPhoneme.map((item, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell>{item.id}</Table.Cell>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.level}</Table.Cell>
        </Table.Row>
      )
    })
    let playButtonText = 'Play';
    if (!audio) playButtonText = 'No audio source';
    if (loadFailed) playButtonText = 'Invalid audio source';
    return (
      <Fragment>
        <SomeInput currentValue={this.state.langs} onChange={this.handleChange.bind(this)} />
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
        <div>
        <Button
        content={playButtonText}
        icon="play"
        onClick={this.onPlay}
        disabled={playingDisabled}
        />
        </div>
        <div id = "meaning" >뜻</div>
        <Form id = "font">
          
          <Form.Input 
            readOnly
            value={this.state.langs}
          />
          
        </Form>
        <div id ="text">
          <Button content="ko" id="buttonsize" onClick={this.onTextChange} />
          <Button content="en" id="buttonsize" onClick={this.onTextChange} />
          <Button content="ru" id="buttonsize" onClick={this.onTextChange} />
          <Button content="zn" id="buttonsize" onClick={this.onTextChange} />
          <Button content="mn" id="buttonsize" onClick={this.onTextChange} />
          </div>
      
        <Form onSubmit={this.onSubmit} id ="hei"  >
          <Form.Input
            name="answer"
            placeholder="Your Answer"
            value={this.state.answer}
            onChange={this.onChange}
            onKeyDown={this.specialOnKeyPress}
            onKeyUp={this.specialOnKeyUp}
            
          />
          
          <Form.Button content="Submit" color="green" />
        </Form>
        
        <div id ="seconds">
          <div id = "phoneme">
            <div onClick = {this.openText} >
              음소목록 (누를시 열기/닫기)

            </div>
            <Table celled className="phonemeTable" style = {popcldisplay}>

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
          
          <div id = "graphic" onClick ={this.openText}>
          
           파형 그래프 (누를시 열기/닫기)
          <Image src={image} style={gopcldisplay}/>
          </div>
          
        </div>
        <div id = "ppaps">
          학습 상황 
          <Progress  
            value = {this.state.current}
            total = {this.state.total}
            progress = 'value'
            success = {this.state.current !== 0 && this.state.current === this.state.total}
          />
        </div>
      </Fragment>
      
    );
  }
}




AnswerSession.propTypes = propTypes;
AnswerSession.defaultProps = defaultProps;

export default AnswerSession;

