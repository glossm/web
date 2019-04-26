import React from 'react';
import { Image, Header, Progress, Segment, Divider, Button, Label } from 'semantic-ui-react';

function ProficiencyCard(props) {
  const { lang, submissions, topics } = props;
  const finishedTopics = topics ? topics.reduce((a, b) => {
    if (b.progress.total > 0 && b.progress.current == b.progress.total) {
      return a + 1;
    } else {
      return a;
    }
  }, 0) : 0;
  
  return (
    <Segment padded>
      <Header as="a" href={`/language/${lang.id}`} size="medium">{lang.name}</Header>
      <Divider/>
      <Image src={lang.image || '/globe.png'} floated="left" size="small"/>
      <Button as="a" href={`/learn/${lang.id}`} floated="right">
        Learn
      </Button>
      <Header size="small">{`Level ${lang.level}`}</Header>
      <Progress percent={lang.percent} indicating color="orange"/>
        <Label>
          {finishedTopics} topics finished
        </Label>
        <Label>
          {submissions? submissions.length : 0} words learned
        </Label>
    </Segment>
  );
}

export default ProficiencyCard;
