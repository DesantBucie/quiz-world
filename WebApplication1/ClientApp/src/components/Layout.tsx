import * as React from 'react';
import NavMenu from './Visual/NavMenu';

export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <NavMenu />
            <div className="content">{props.children}</div>
    </React.Fragment>
);
