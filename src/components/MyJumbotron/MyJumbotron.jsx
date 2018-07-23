import './MyJumbotron.css';

import React, {
    Component
} from 'react';
import {
    Container,
    Header,
    Icon
} from 'semantic-ui-react';
import Typed from 'typed.js';

export default class MyJumbotron extends Component {

    componentDidMount() {
        const {
            strings
        } = this.props;

        const typedConfig = {
            strings: strings,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            showCursor: false,
            shuffle: true,
            loop: true,
            loopCount: Infinity,
            fadeOut: true
        };

        // this.el refers to the <span> in the render() method
        this.typed = new Typed(this.el, typedConfig);
    }

    componentWillUnmount() {
        // to prevent memory leaks
        this.typed.destroy();
    }

    render() {
        return (
            <div className='jumbotron'>
                <Container textAlign='center'>
                    <Header className='white' icon>
                        <Icon name='at' />
                        <Header.Content>
                            Jordan Rosenberg
                            <Header.Subheader className='white'>
                                <span className='typedSpan' ref={(el) => { this.el = el; }}/>
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                </Container>
            </div>
        );
    }
}
