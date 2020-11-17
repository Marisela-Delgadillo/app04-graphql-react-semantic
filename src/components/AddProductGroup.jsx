import React, { Component, Fragment } from "react";
import { getApolloContext, gql } from '@apollo/client';
import { Button, Divider, Header, Icon, List, ListContent, ListItem, Form, FormGroup, FormField, Input, FormButton, FormInput } from 'semantic-ui-react'

const GET_ALL_GROUPS = gql`
    {
        productGroups{
            id
            name
            products{
                id
                name
                price
            }
        }
    }
`;

const ADD_PRODUCT_GROUP = gql`
    mutation($name: String!){
        addProductGroup(name: $name){
            id
            name
        }
    }
`;

export default class AddProductGroup extends Component {

    static contextType = getApolloContext();

    state = {
        groups: [],
        groupName: ''
    }

    componentDidMount = async () => {
        const { client } = this.context;

        const response = await client.query({ query: GET_ALL_GROUPS });

        this.setState({ groups: response.data.productGroups });
        console.log(this.state.groups);
    }

    editProductGroup = id => this.props.history.push({ pathname: '/editproductgroup', state: { productGroupId: id } });

    groupList = () => {
        return this.state.groups.map(item => {
            return (
                <ListItem key={item.id}>
                    <ListContent floated='right'>
                        <Button onClick={() => this.editProductGroup(item.id)}>Editar</Button>
                        <Button color='red'>Eliminar</Button>
                    </ListContent>
                    <ListContent>{item.name}</ListContent>
                </ListItem>
            );
        })
    }

    catchGroupName = e => {
        this.setState({ groupName: e.target.value });
        console.log(this.state.groupName);
    }

    isBlank = str => {
        return (!str || /^\s*$/.test(str));
    }

    saveGroup = () => {
        if (this.isBlank(this.state.groupName)) return;

        const { client } = this.context;

        client.mutate({
            mutation: ADD_PRODUCT_GROUP,
            variables: {
                name: this.state.groupName
            }
        }).then(res => console.log(res))
            .catch(error => console.log(error));
        window.location.reload();
    }

    render() {
        return (
            <Fragment>
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='list' />
                        Crear nuevo grupo
                    </Header>
                </Divider>
                <Form>
                    <FormGroup>
                        <FormInput
                            placeholder='Nombre del grupo'
                            name='Nombre del grupo'
                            onChange={this.catchGroupName}
                        />
                        <FormButton content='Crear' onClick={this.saveGroup} />
                    </FormGroup>
                </Form>
                <br />
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='list' />
                        Lista de grupos
                    </Header>
                </Divider>
                <br />
                <List divided verticalAlign='middle'>
                    {this.groupList()}
                </List>
            </Fragment>
        );
    }
}