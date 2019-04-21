import React from 'react';
import { Image, Header, Progress, Segment, Divider, Button, Label } from 'semantic-ui-react';

function ProficiencyCard(props) {
  const { lang } = props;
  return (
    <Segment padded>
      <Header as="a" href={`/language/${lang.id}`} size="medium">{lang.name}</Header>
      <Divider/>
      <Image src={lang.image || '/globe.png'} floated="left" size="small"/>
      <Button floated="right">
        Learn
      </Button>
      <Header size="small">{`Level ${lang.level}`}</Header>
      <Progress percent={lang.percent} indicating color="orange"/>
        <Label>
          3 / 5 topics finished
        </Label>
        <Label>
          2 / 100 words learned
        </Label>
    </Segment>
  );
}

export default ProficiencyCard;
