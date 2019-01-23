import React, { Fragment } from 'react';
import posed from 'react-pose';

const Container = posed.div({
  enter: { staggerChildren: 50 }
});

const P = posed.p({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 }
});

export default () => (
  <Container>
    <h2>Who is Kevin Tran?</h2>
    <P>
      I'm a Software Developer from Hamilton, Ontario.
    </P>
    <P>
      I love to learn new things and apply what I've learned to my work. I'm mainly a web developer .
    </P>
    <P>
      Speaking of guitar, 
    </P>
    <P>
      It was popularised in the 1960s with the release of Letraset sheets
      containing Lorem Ipsum passages, and more recently with desktop publishing
      software like Aldus PageMaker including versions of Lorem Ipsum.
    </P>
  </Container>
);
