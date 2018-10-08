// import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { div, Header,Table} from 'semantic-ui-react';
import axios from 'axios';
import './AboutLanguage.css'


const TestText = [ {code  : '' , co1: 'Labial',	co2:'Alveolar',	co3:'Retroflex',	co4:'Palatal',
  co5: 'Velar' ,co6: 'Uvular',	co7 :'Glottal'},
  {code : 'Nasal', co1: 'm'	,co2 : 'n',co5 : 'ŋ'},
  {code : 'Plosive', co1: 'p b'	,co2 : 't d',co5 : 'k ɡ', co6:'q'},
  {code : 'Sibilant Fricative', co2: 's z'	,co3 : 'ʂ ʐ',co4 : 'ɕ'},
  {code : 'Non-sibilant Fricative', co1: 'f v'	,co2 : 'θ ð',co6 : 'χ ʁ',co7:'h'},
  {code : 'Trill', co2: 'r'},
  {code : 'Approximant', co2: 'l'	,co4 : 'j',co5 : 'w'},
  
  
]

class AboutLanguage extends Component {
  state = {
    topics: [],
  };

  constructor(props) {
    super(props)
    this.onGoBack = this.onGoBack.bind(this)
    this.startLearning = this.startLearning.bind(this)
  }
  
  async componentWillMount() {
    const { match } = this.props;
    const { langId } = match.params;
    const { data: topics } = await axios.get(`core/languages/${langId}/topics/`);
    
    this.setState({ match, topics });
  }
  /**
   * 
   * @param {React.MouseEvent<HTMLButtonElement>} e 
   */
  onGoBack(e) {   
    e.preventDefault()
    this.props.history.push('/learn/')
  }

  /**
   * 
   * @param {React.MouseEvent<HTMLButtonElement>} e 
   */
  startLearning(e) {
    e.preventDefault()
    const { match, history } = this.props;
    const { langId } = match.params;
    history.push(`/learn/${langId}`)
  }

  render() {
    const tableData = TestText.map((item, index) => {
      // // const tableData = this.state.listPhoneme.map((item, index) => {  
      return (
        <Table.Row key={index} >
          <Table.Cell>{item.code}</Table.Cell>
          <Table.Cell>{item.co1}</Table.Cell>
          <Table.Cell>{item.co2}</Table.Cell>
          <Table.Cell>{item.co3}</Table.Cell>
          <Table.Cell>{item.co4}</Table.Cell>
          <Table.Cell>{item.co5}</Table.Cell>
          <Table.Cell>{item.co6}</Table.Cell>
          <Table.Cell>{item.co7}</Table.Cell>
        </Table.Row>
      )
    }
  )

    return (
        <div className="tables">
          <div id="left" className="column" >
            <Header content="자음" size="large" className="top-header"  />
            <Table celled className="test">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='8'>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {tableData}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan='8'>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </div>
          <div id="right" className="column">
          <Header content="모음" size="large" className="top-header"  />
  
          <Table celled className="test" >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='8'>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tableData}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='8'>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
         <div><button onClick={this.onGoBack}>Go Back</button></div>
        <div><button onClick={this.startLearning}>Start learning</button></div>
          </div>
        </div>
    )
  }
}

export default AboutLanguage