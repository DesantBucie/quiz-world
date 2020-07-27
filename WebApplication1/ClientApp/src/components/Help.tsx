import * as React from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';

const Help = () => (
    <section>
        <h1>Potrzebujesz pomocy?</h1>
        <p><b>Strona dopiero się rozwija(lub już nie)</b>ale automat powinien wylosować Co kilka pytań a do każdego z nich cztery odpowiedzi, jeśli natrafisz na błąd, zgłoś go w formularzu.</p>
        <h2>Opisz Bug</h2>
        <form action="MAILTO:mattrusz@gmail.com" method="post" className="helpform">
            <textarea className="helpform__textarea">
            </textarea>
            <button type="submit">Zgłoś!</button>
</form>
    </section>
);

export default Help;
