import React, { Component } from "react";
import { getApolloContext, gql } from '@apollo/client';
import { Button, Divider, Header, Icon, List, ListContent, ListItem, Form, FormGroup, FormField, Input, FormButton, FormInput } from 'semantic-ui-react'

const UPDATE_PRODUCT_GROUP = gql`
    mutation($id:ID!, $name:String!){
        editProductGroupId(id:$id, name:$name){
            name
        }
    }
`;

export default class EditPRoductGroup extends Component {

    state = {
        groupName: ''
    }

    static contextType = getApolloContext();

    catchGroupName = e => this.setState({ groupName: e.target.value })

    saveGroup = async () => {
        const { client } = this.context;
        const { groupName } = this.state;
        client.mutate({
            mutation: UPDATE_PRODUCT_GROUP,
            variables: {
                id: this.props.history.location.state.productGroupId,
                name: groupName,
            }
        }).then(res => {
            console.log(res);
            this.props.history.push('/addproductgroup');
            window.location.reload();
        })
            .catch(error => console.log(error));
    }

    componentDidMount = () => {
        console.log(this.props.history.location.state.productGroupId);
    }

    render() {
        return (
            <Form>
                <FormGroup>

                </FormGroup>
                <FormGroup>
                    <FormInput
                        placeholder='Nombre del grupo'
                        name='Nombre del grupo'
                        onChange={this.catchGroupName}
                    />
                    <FormButton content='Guardar' onClick={this.saveGroup} />
                </FormGroup>
            </Form>
        );
    }
}