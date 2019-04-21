import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Breadcrumb, Segment, Image, Grid, Button, Progress } from 'semantic-ui-react';
import axios from 'axios';
import { Translation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LanguageDashboard extends Component {
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
              <Breadcrumb.Section active>{this.state.lang.name}</Breadcrumb.Section>
            </Breadcrumb>
          <Segment raised>
            <Grid>
              <Grid.Row stretched>
                <Grid.Column width={13}>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={5}>
                        <Image src="/globe.png" bordered rounded/>
                      </Grid.Column>
                      <Grid.Column width={11}>
                        <div className="h5 mt-3">
                          <FontAwesomeIcon icon="users" className="mr-2"/>
                          <Translation>
                            {
                              t => t('language.users', { lang } )
                            }
                          </Translation>
                        </div>
                        <div className="h5 mt-2">
                          <FontAwesomeIcon icon="globe" className="mr-2"/>
                          <Translation>
                            {
                              t => t('language.location', { lang } )
                            }
                          </Translation>
                        </div>
                        <div className="mt-4">
                          <Translation>
                            { t => 
                              <Button size="large" onClick={() => {this.setState({redirect: `/language/overview/${lang.id}`})}}> 
                                { t('language.overview') }
                              </Button>
                            }
                          </Translation>
                          <Translation>
                            { t => 
                              <Button size="large" as="a" href={`https://wikipedia.org/wiki/${lang.name}`}>
                                { t('language.wikipedia') }
                              </Button>
                            }
                          </Translation>
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column className="h5">
                          <Translation>
                            { t => t('language.transcribed') }
                          </Translation>
                          <Progress percent={lang.transcribed || 0} indicating className="mt-2"/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={3}>
                      <Grid.Column>
                        <Button size="massive" fluid
                          onClick={
                            () => {this.setState({redirect: `/learn/${lang.id}`})}
                          }
                        >
                          <div className="pt-5 pb-5">
                            <Translation>
                              { t => t('language.wordbutton') }
                            </Translation>
                          </div>
                        </Button>
                      </Grid.Column>
                      <Grid.Column>
                        <Button size="massive" fluid disabled>
                          <div className="pt-5 pb-5">
                            <Translation>
                              { t => t('language.sentencebutton') }
                            </Translation>
                          </div>
                        </Button>
                      </Grid.Column>
                      <Grid.Column>
                        <Button size="massive" fluid disabled>
                          <div className="pt-5 pb-5">
                            <Translation>
                              { t => t('language.phrasebutton') }
                            </Translation>
                          </div>
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Segment>
                    Leaderboard
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      )
    );
  }
}

export default LanguageDashboard;
