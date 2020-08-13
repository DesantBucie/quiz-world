import * as React from 'react';
import NavBarSwitch from './Visual/NavBarSwitch';

export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
            <NavBarSwitch/>
            <div className="content">{props.children}</div>
    </React.Fragment>
);
