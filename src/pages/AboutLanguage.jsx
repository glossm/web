import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { div, Header,Table} from 'semantic-ui-react';
import axios from 'axios';
import './TopicList.css'


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
    const { match } = this.props;
    // const { topics } = this.state;
    const { langId } = match.params;
   
    const tableData = this.state.topics.map((item, index) => {
      
      return (
        <Table.Row key={index}>
          <Table.Cell>{item.id}</Table.Cell>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.level}</Table.Cell>
          <Table.Cell><Link to={`/learn/${langId}/${item.id}`}>Start Learning</Link></Table.Cell>
        </Table.Row>
      )
    }
  )

    return (

        <div className="tables">
          <div id="left" className="column">
            <Header content="자음" size="large" className="top-header"  />
  
            <Table celled className="test">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Header</Table.HeaderCell>
                  <Table.HeaderCell>Header</Table.HeaderCell>
                  <Table.HeaderCell>Header</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
  
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                  </Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
              </Table.Body>
  
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan='3'>
                    
                      
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </div>
          <div id="right" className="column">
          <Header content="모음" size="large" className="top-header"  />
  
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
         <div><button onClick={this.onGoBack}>Go Back</button></div>
        <div><button onClick={this.startLearning}>Start learning</button></div>
          </div>
        </div>
        
    )
  }
}

export default AboutLanguage