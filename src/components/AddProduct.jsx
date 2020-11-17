import React, {Component, Fragment} from "react";
import {getApolloContext, gql} from '@apollo/client';
import {Form, Button, FormGroup, FormInput, FormSelect} from 'semantic-ui-react';

const ADD_PRODUCT = gql`
    mutation($name: String!, $price: Float!, $productGroupId: ID!){
        addProduct(name: $name, price: $price, productGroupId: $productGroupId){
            id
            name
            price
            productGroup{
                name
            }
        }
    }
`;

const GET_ALL_PRODUCT_GROUPs = gql`
    {
        productGroups{
            id
            name
        }
    }
`;

export default class AddProduct extends Component{
    state = {
        productGroupList: [],
        fieldName: '',
        fieldPrice: 0.0,
        fieldGroup: ''
    }

    static contextType = getApolloContext(); 

    handleName = e => this.setState({fieldName: e.target.value});
    handlePrice = e => this.setState({fieldPrice: parseFloat(e.target.value)});
    handleGroup = (e, {value}) => this.setState({fieldGroup: value});

    componentDidMount = async ()=>{
        const {client} = this.context;

        const response = await client.query({query: GET_ALL_PRODUCT_GROUPs});

        this.setState({productGroupList:  response.data.productGroups.map(item => {
            return {key: item.id, text: item.name, value: item.id };
        })});
    }

    saveProduct = ()=>{
        const {fieldName, fieldPrice, fieldGroup} = this.state;
        const {client} = this.context;
        
        client.mutate({
            mutation: ADD_PRODUCT,
            variables: {
                name: fieldName,
                price: fieldPrice,
                productGroupId: fieldGroup
            }
        }).then(res => console.log(res))
        .catch(error => console.log(error));
        this.props.history.push('/products');
        window.location.reload();
        console.log({name: fieldName, price: fieldPrice, productGroupId: fieldGroup});
    }

    render() {
        return (
            <Fragment>
                <Form>
                    <FormGroup widths='equal'>
                        <FormInput label='Nombre producto' placeholder='Nombre producto' onChange={this.handleName}/>
                        <FormInput type='number' label='Precio' placeholder='Precio' onChange={this.handlePrice}/>
                        <FormSelect options={this.state.productGroupList} label='Grupo' placeholder='Grupo' onChange={this.handleGroup}/>
                    </FormGroup>
                    <Button content='Confirmar' onClick={this.saveProduct}/>
                </Form>
            </Fragment>
        );
    }
}