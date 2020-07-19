import * as React from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';

const Help = () => (
    <section>
        <Container>
            <Row>
        <h1>Potrzebujesz pomocy?</h1>
        <p><b>Strona dopiero się rozwija(lub już nie)</b>ale automat powinien wylosować ci pytanie i cztery odpowiedzi, jeśli natrafisz na błąd, zgłoś go w formularzu.</p>
       {/*} <form>
            <h2>Opisz Bug</h2>
            <textarea>
            </textarea>
            <input type='mail'>przyklad@mail.com</input>
</form>{*/}
        </Row>
        </Container>
    </section>
);

export default Help;
