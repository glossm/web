import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Breadcrumb, Segment, Image, Grid, Button, Icon} from 'semantic-ui-react';
import axios from 'axios';
import { Translation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LanguageOverview extends Component {
  state = {
    lang: {},
    redirect: false,
  };
  
  componentWillMount() {
    this.fetchLanguages();
  }

  async fetchLanguages() {
    const response = await axios.get(`core/languages/${this.props.match.params.langId}`);
    const lang = response.data;
    this.setState({ lang });
  }

// code, endangerment, id, learning, name, numSpeakers, topicSete

  render() {
    const lang = this.state.lang;
     
    return (
      this.state.redirect ? 
      <Redirect to={this.state.redirect}/> :
      (
        <Container>
            <Breadcrumb size="huge">
              <Breadcrumb.Section 
                link 
                onClick={
                  () => {this.setState({redirect: `/language/${this.props.match.params.langId}`})}
                }
              >
                {this.state.lang.name}
              </Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>
                <Translation>
                  { t => t('language.overview') }
                </Translation>
              </Breadcrumb.Section>
            </Breadcrumb>
          <Segment raised>
            <Grid>
              <Grid.Row stretched>
                <Grid.Column width={10}>
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Holiday_Bashkir_national_costume_52.jpg"/>
                </Grid.Column>
                <Grid.Column width={6} className="h5 p-3">
                  <Translation>
                    { t => t(`${lang.name}.overview`) }
                  </Translation>

                  <div className="mt-4">
                    <Translation>
                      { t => 
                        <Button size="large" className="m-2" icon labelPosition='right'
                          onClick={() => {this.setState({redirect: `/language/phoneme/${lang.id}`})}}
                        > 
                          { t('language.phonemebutton') }
                          <Icon name='right arrow' />
                        </Button>
                      }
                    </Translation>
                    <Translation>
                      { t => 
                        <Button size="large" className="m-2" icon labelPosition='right'
                          onClick={() => {this.setState({redirect: `/learn/${lang.id}`})}}
                        > 
                          { t('language.learnbutton') }
                          <Icon name='right arrow' />
                        </Button>
                      }
                    </Translation>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      )
    );
  }
}

export default LanguageOverview;
