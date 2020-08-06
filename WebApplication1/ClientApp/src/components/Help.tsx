import * as React from 'react';

const Help = () => (
    <section>
        <h1>Potrzebujesz pomocy?</h1>
        <p><b>Strona dopiero się rozwija(lub już nie)</b>ale automat powinien wylosować Co kilka pytań a do każdego z nich cztery odpowiedzi, jeśli natrafisz na błąd, zgłoś go w formularzu.</p>
        <h2>Opisz Bug</h2>
        <form action="MAILTO:mattrusz@gmail.com" method="post" className="helpform">
            <textarea className="helpform__textarea">
            </textarea>

            <div className="login__button"><button type="submit">Zgłoś!</button></div>
        </form>
    </section>
);

export default Help;
