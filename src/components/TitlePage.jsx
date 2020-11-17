import React, {Component} from 'react';
import {Divider, Icon, Header} from 'semantic-ui-react';

export default class TitlePage extends Component{

    state = {
        label: this.props.label ? this.props.label: '',
        icon: this.props.icon ? this.props.icon: 'list alternate outline'
    }
    
    render() {
        return (
            <Divider horizontal>
            <Header as='h4'>
                <Icon name={this.state.icon}/>
                {this.state.label}
            </Header>
        </Divider>
        );
    }
}