import React, {Component} from 'react';
import {Dimmer, Loader, Segment} from 'semantic-ui-react';

export default class Loading extends Component{

    render() {
        return (
            <Segment>
                <Dimmer active inverted>
                <Loader size='large'>Loading</Loader>
                </Dimmer>
            </Segment>
        );
    }
}