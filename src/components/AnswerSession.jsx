import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Header, Table,Image,Progress,Message} from 'semantic-ui-react';
import Sound from 'react-sound';
import './Answer.css';
import axios from 'axios';



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
  LangId : '73',
};
const TestText = [ {code  : '' , co1: 'Labial',	co2:'Alveolar',	co3:'Retroflex',	co4:'Palatal',
  co5: 'Velar' ,co6: 'Uvular',	co7 :'Glottal'},
  {code : 'Nasal', co1: 'm'	,co2 : 'n',co5 : 'ŋ'},
  {code : 'Plosive', co1: 'p b'	,co2 : 't d',co5 : 'k ɡ', co6:'q'},
  {code : 'Sibilant Fricative', co2: 's z'	,co3 : 'ʂ ʐ',co4 : 'ɕ'},
  {code : 'Non-sibilant Fricative', co1: 'f v'	,co2 : 'θ ð',co6 : 'χ ʁ',co7:'h'},
  {code : 'Trill', co2: 'r'},
  {code : 'Approximant', co2: 'l'	,co4 : 'j',co5 : 'w'},
  
  {}
]
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
  {code : 'k', value1 : 'k', value2 : 'k'},
  {code : 'l', value1 : 'l', value2 : 'ɫ', value3 :'ɬ', value4 : 'ɭ', value5 : 'ɮ', value6 : 'ʟ'}, 

  {code : 'm', value1 : 'm', value2 : 'ɱ'},
  {code : 'n', value1 : 'n', value2 : 'ŋ', value3 :'ɲ', value4 : 'ɴ', value5 : 'ɳ'}, 
  {code : 'o', value1 : 'o', value2 : 'ɔ', value3 :'œ', value4 : 'ø', value5 : 'ɒ', value6 : 'ɔ̃', value7 : 'ɶ'},
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
  {code : 'z', value1 : 'z', value2 : 'ʒ', value3 :'ʐ', value4 : 'ʑ'},                    //90
  {code : '2', value1 : '2', value2 : 'ʔ', value3 :'ʕ', value4 : 'ʢ', value5 : 'ʡ'},      // 50 
  {code : '3', value1 : '3', value2 : 'ɛ', value3 :'ɜ', value4 : 'ɝ', value5 : 'ɛ̃', value6 : 'ɞ'}, //51 
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
      count: '1',
      kcode : '',
      error : true,
      errormessage : 'block',
    };
  }

  componentWillMount = async () => {
    // axios : 
    // 음소목록에 대한 api call 을 통한 데이터 집어 넣기 
    const { data: records } = await axios.get(`core/languages/`);
    const progress  = await axios.get(`core/languages/${this.props.LangId}/topics/`);
    this.setState({
      listPhoneme : records,
      TopicId : this.props.TopicId,
      LangId : this.props.LangId,
      current : progress.data[72-this.props.TopicId].progress.current,
      total : progress.data[72-this.props.TopicId].progress.total
    })
    console.log(records)
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
/// keyboard input's area 
  specialOnKeyPress = (e) => { 
    
    e.preventDefault();   
    const errorcheckstr = String.fromCharCode(e.keyCode).toLowerCase().charCodeAt(0);
    if(e.keyCode === 17) {
      this.setState({ ctrlPressed: true })
    }
    
    if(this.state.ctrlPressed) {
      
      this.setState({kcode: e.keyCode 
      }) // 두개가 한꺼번에 있는 경우는??? 
      if(e.keyCode === 65 ){ // a 
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%5 === 1){
            this.charToPut = IPA[0].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-2)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 2){
            this.charToPut = IPA[0].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 3){
            this.charToPut = IPA[0].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 ===4 ){
            this.charToPut = IPA[0].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 0){
            this.charToPut = IPA[0].value5;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        } 
      }
      else if(e.keyCode === 66 ){ // b 
        
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%4 === 1){
            this.charToPut = IPA[1].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 2){
            this.charToPut = IPA[1].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 3){
            this.charToPut = IPA[1].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 0 ){
            this.charToPut = IPA[1].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        }
      }
      else if(e.keyCode === 67 ){ // c 
        
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%3 === 1){
            this.charToPut = IPA[2].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%3 === 2){
            this.charToPut = IPA[2].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%3 === 0){
            this.charToPut = IPA[2].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        }
      }
      else if(e.keyCode === 68 ){ // d 
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%5 === 1){
            this.charToPut = IPA[3].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 2){
            this.charToPut = IPA[3].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 3){
            this.charToPut = IPA[3].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 ===4 ){
            this.charToPut = IPA[3].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-3)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 0){
            this.charToPut = IPA[3].value5;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        } 
      }
      else if(e.keyCode === 69 ){ // e 
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%5 === 1){
            this.charToPut = IPA[4].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 2){
            this.charToPut = IPA[4].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 3){
            this.charToPut = IPA[4].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 ===4 ){
            this.charToPut = IPA[4].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 0){
            this.charToPut = IPA[4].value5;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        } 
      }
      else if(e.keyCode === 70 ){ // f 
        
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%4 === 1){
            this.charToPut = IPA[5].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 2){
            this.charToPut = IPA[5].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 3){
            this.charToPut = IPA[5].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 0 ){
            this.charToPut = IPA[5].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        }
      }
      else if(e.keyCode === 71 ){ // g 
        
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%4 === 1){
            this.charToPut = IPA[6].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 2){
            this.charToPut = IPA[6].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 3){
            this.charToPut = IPA[6].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 0 ){
            this.charToPut = IPA[6].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        }
      }
      else if(e.keyCode === 72 ){ // h 
        
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%6 === 1){
            this.charToPut = IPA[7].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%6 === 2){
            this.charToPut = IPA[7].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%6 === 3){
            this.charToPut = IPA[7].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%6 === 4){
            this.charToPut = IPA[7].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%6 === 5 ){
            this.charToPut = IPA[7].value5;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%6 === 0 ){
            this.charToPut = IPA[7].value6;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        }
      }
      else if(e.keyCode === 73 ){ // i 
        
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%4 === 1){
            this.charToPut = IPA[8].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-2)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 2){
            this.charToPut = IPA[8].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 3){
            this.charToPut = IPA[8].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 0 ){
            this.charToPut = IPA[8].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        }
      }
      else if(e.keyCode === 74 ){ // j 
        
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%4 === 1){
            this.charToPut = IPA[9].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 2){
            this.charToPut = IPA[9].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 3){
            this.charToPut = IPA[9].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 0 ){
            this.charToPut = IPA[9].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        }
      }
      else if(e.keyCode === 75 ){ // k 
        
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%2 === 1){
            this.charToPut = IPA[10].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%2 === 0){
            this.charToPut = IPA[10].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        }
      }
      else if(e.keyCode === 76 ){ // l 
        
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%6 === 1){
            this.charToPut = IPA[11].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%6 === 2){
            this.charToPut = IPA[11].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%6 === 3){
            this.charToPut = IPA[11].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%6 === 4){
            this.charToPut = IPA[11].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%6 === 5 ){
            this.charToPut = IPA[11].value5;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%6 === 0 ){
            this.charToPut = IPA[11].value6;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        }
      }  
      else if(e.keyCode === 77 ){ // m 
        
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%2 === 1){
            this.charToPut = IPA[12].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%2 === 0){
            this.charToPut = IPA[12].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        }
      }
      else if(e.keyCode === 78 ){ // n 
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%5 === 1){
            this.charToPut = IPA[13].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 2){
            this.charToPut = IPA[13].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 3){
            this.charToPut = IPA[13].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 ===4 ){
            this.charToPut = IPA[13].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-3)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 0){
            this.charToPut = IPA[13].value5;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        } 
      }
      else if(e.keyCode === 79 ){ // o 
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%7 === 1){
            this.charToPut = IPA[14].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%7 === 2){
            this.charToPut = IPA[14].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%7 === 3){
            this.charToPut = IPA[14].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%7 === 4){
            this.charToPut = IPA[14].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-3)  +this.charToPut
            })
          }
          else if(this.state.count%7 === 5){
            this.charToPut = IPA[14].value5;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%7 === 6){
            this.charToPut = IPA[14].value6;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }else if(this.state.count%7 === 0){
            this.charToPut = IPA[14].value7;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-2)  +this.charToPut
            })
          }
        } 
      }
      else if(e.keyCode === 80 ){ // p 
        
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%2 === 1){
            this.charToPut = IPA[15].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%2 === 0){
            this.charToPut = IPA[15].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        }
      }
      else if(e.keyCode === 81 ){ // q 
        
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%3 === 1){
            this.charToPut = IPA[16].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%3 === 2){
            this.charToPut = IPA[16].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%3 === 0){
            this.charToPut = IPA[16].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        }
      }
      else if(e.keyCode === 82 ){ // r 
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%8 === 1){
            this.charToPut = IPA[17].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%8 === 2){
            this.charToPut = IPA[17].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%8 === 3){
            this.charToPut = IPA[17].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%8 === 4){
            this.charToPut = IPA[17].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-3)  +this.charToPut
            })
          }
          else if(this.state.count%8 === 5){
            this.charToPut = IPA[17].value5;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%8 === 6){
            this.charToPut = IPA[17].value6;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%8 === 7){
            this.charToPut = IPA[17].value7;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-2)  +this.charToPut
            })
          }
          else if(this.state.count%8 === 0){
            this.charToPut = IPA[17].value8;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-2)  +this.charToPut
            })
          }
        } 
      } 
      else if(e.keyCode === 83 ){ // s 
        
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%3 === 1){
            this.charToPut = IPA[18].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%3 === 2){
            this.charToPut = IPA[18].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%3 === 0){
            this.charToPut = IPA[18].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        }
      }
      else if(e.keyCode === 84 ){ // t 
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%5 === 1){
            this.charToPut = IPA[19].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 2){
            this.charToPut = IPA[19].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 3){
            this.charToPut = IPA[19].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 ===4 ){
            this.charToPut = IPA[19].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-3)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 0){
            this.charToPut = IPA[19].value5;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-3)  +this.charToPut
            })
            
          }
        } 
      }
      else if(e.keyCode === 85 ){ // u 
        
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%3 === 1){
            this.charToPut = IPA[20].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%3 === 2){
            this.charToPut = IPA[20].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%3 === 0){
            this.charToPut = IPA[20].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        }
      } // 
      else if(e.keyCode === 86 ){ // v 
        
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%4 === 1){
            this.charToPut = IPA[21].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 2){
            this.charToPut = IPA[21].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 3){
            this.charToPut = IPA[21].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 0){
            this.charToPut = IPA[21].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        }
      }
      else if(e.keyCode === 87 ){ // w 
        
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%4 === 1){
            this.charToPut = IPA[22].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 2){
            this.charToPut = IPA[22].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 3){
            this.charToPut = IPA[22].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 0){
            this.charToPut = IPA[22].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        }
      }
      else if(e.keyCode === 88 ){ // x 
        
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%2 === 1){
            this.charToPut = IPA[23].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%2 === 0){
            this.charToPut = IPA[23].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        }
      }
      else if(e.keyCode === 89 ){ // y 
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%5 === 1){
            this.charToPut = IPA[24].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 2){
            this.charToPut = IPA[24].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 3){
            this.charToPut = IPA[24].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 ===4 ){
            this.charToPut = IPA[24].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-3)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 0){
            this.charToPut = IPA[24].value5;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-3)  +this.charToPut
            })
            
          }
        } 
      }
      else if(e.keyCode === 90 ){ // w 
        
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%4 === 1){
            this.charToPut = IPA[25].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 2){
            this.charToPut = IPA[25].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 3){
            this.charToPut = IPA[25].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%4 === 0){
            this.charToPut = IPA[25].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
        }
      } // 50 51 
      else if(e.keyCode === 50 ){ // 2 
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%5 === 1){
            this.charToPut = IPA[26].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 2){
            this.charToPut = IPA[26].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 3){
            this.charToPut = IPA[26].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%5 ===4 ){
            this.charToPut = IPA[26].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-3)  +this.charToPut
            })
          }
          else if(this.state.count%5 === 0){
            this.charToPut = IPA[26].value5;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-3)  +this.charToPut
            })
            
          }
        } 
      }
      else if(e.keyCode === 51 ){ // 3 
        if(this.state.kcode === e.keyCode){
          this.setState({
            kcode: e.keyCode, 
            count : (this.state.count*1)+1
          })
          if(this.state.count%6 === 1){
            this.charToPut = IPA[27].value1;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%6 === 2){
            this.charToPut = IPA[27].value2;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%6 === 3){
            this.charToPut = IPA[27].value3;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-1)  +this.charToPut
            })
          }
          else if(this.state.count%6 ===4 ){
            this.charToPut = IPA[27].value4;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-3)  +this.charToPut
            })
          }
          else if(this.state.count%6 === 5){
            this.charToPut = IPA[27].value5;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-3)  +this.charToPut
            })
          }
          else if(this.state.count%6 === 0){
            this.charToPut = IPA[27].value6;
            this.setState({
              answer : this.state.answer.substring(0,this.state.answer.length-3)  +this.charToPut
            })
          }
        } 
      }
      else{
        this.charToPut = String.fromCharCode(e.keyCode);
        this.setState({
          kcode: e.keyCode, 
          count : 1,
          answer : this.state.answer + this.charToPut
        })
      }
    }
    else {
      const charToPut = String.fromCharCode(e.keyCode).toLowerCase()
      this.setState({
        answer: this.state.answer + charToPut.toLowerCase()
      })
    }
    // unicode block 
    const kcodecheck = String.fromCharCode(e.keyCode).toLowerCase().charCodeAt(0);
    if((errorcheckstr>=48&&errorcheckstr<58)||(errorcheckstr>=97&&errorcheckstr<123)||(errorcheckstr>=592&&errorcheckstr<688)){
      
      this.setState({
        error : false,
        errormessage :'none',
      })
    }
    else if ((kcodecheck>=48&&kcodecheck<58)||(kcodecheck>=97&&kcodecheck<123)||(kcodecheck>=592&&kcodecheck<688)){
      this.setState({
        error : false,
        errormessage :'none',
      })
    }
    else {
      this.setState({
        error : true,
        errormessage : 'block',
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
      this.setState({ ctrlPressed: false,
      })
    }
  }

  // open image and  Table when Click the text 
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
    const { audio,image} = this.props;
    const { playing, playingDisabled, loadFailed} = this.state;
    const { PLAYING, STOPPED } = Sound.status;
    const popcldisplay = {
      'display' : this.state.opclStylephoneme
    }
    const gopcldisplay = {
      'display' : this.state.opclStylewave
    }
    const ermesdisplay ={
      'display' : this.state.errormessage
    }
    
    const tableData = TestText.map((item, index) => {
      console.log(TestText)
    // const tableData = this.state.listPhoneme.map((item, index) => {  
      return (
        <Table.Row key={index} >
          <Table.Cell>{item.code} </Table.Cell>
          <Table.Cell>{item.co1}</Table.Cell>
          <Table.Cell>{item.co2}</Table.Cell>
          <Table.Cell>{item.co3}</Table.Cell>
          <Table.Cell>{item.co4}</Table.Cell>
          <Table.Cell>{item.co5}</Table.Cell>
          <Table.Cell>{item.co6}</Table.Cell>
          <Table.Cell>{item.co7}</Table.Cell>
        </Table.Row>
      )
    })
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
            error = {this.state.error}
          />
          <Message
            style = {ermesdisplay}
            error
            header='Invalid Input  '
            content='Delete this letter and Enter the correct letter'
          />
          <Form.Button content="Submit" color="green" disabled ={this.state.error} />
        </Form>
        <div id ="seconds">
          <div id = "phoneme">
            <div onClick = {this.openText} >
              음소목록 (누를시 열기/닫기)
            </div>
            <Table celled className="phonemeTable" style = {popcldisplay} id = "tablesize">
              <Table.Body>
              {tableData}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan='6'>
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

