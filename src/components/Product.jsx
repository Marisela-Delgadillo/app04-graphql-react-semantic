import React, {Component, Fragment} from 'react';
import TitlePage from './TitlePage';
import {getApolloContext, gql} from '@apollo/client';
import {Table, TableBody, TableRow, TableCell, Form, Button, Divider, FormGroup, FormInput, FormSelect} from 'semantic-ui-react';

const GET_PRODUCT_BY_ID = gql`
    query($id: ID!){
        product(id: $id){
            id
            name
            price
            productGroup{
                name
            }
        }
    }
`;

const UPDATE_ONE_PRODUCT = gql`
    mutation($id: ID!, $name: String!, $price: Float!, $productGroupId: ID!){
        editProduct(id: $id, name: $name, price: $price, productGroupId: $productGroupId){
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

export default class Product extends Component{

    state = {
        id: '',
        name: '',
        price: 0,
        productGroup: '',
        productGroupList: [],
        fieldName: '',
        fieldPrice: '',
        fieldGroup: ''
    }

    static contextType = getApolloContext(); 

    componentDidMount = async ()=>{
        //console.log(this.props.history.location.state.productId);
        const {client} = this.context;
        const response = await client.query({
            query: GET_PRODUCT_BY_ID,
            variables: {
                id: this.props.history.location.state.productId
            }
        });
        const {id, name, price, productGroup} = response.data.product;
        this.setState({id: id, name: name, price: price, productGroup: productGroup.name});

        const response2 = await client.query({query: GET_ALL_PRODUCT_GROUPs});

        this.setState({productGroupList:  response2.data.productGroups.map(item => {
            return {key: item.id, text: item.name, value: item.id };
        })});
          
        //console.log(this.state.productGroupList);

    }

    updateProductData = ()=>{
        const {client} = this.context;
        const {id, fieldName, fieldPrice, fieldGroup} = this.state;
        client.mutate({
            mutation: UPDATE_ONE_PRODUCT,
            variables: {
                id: id,
                name: fieldName,
                price: fieldPrice,
                productGroupId: fieldGroup
            }
        }).then(res => console.log(res))
        .catch(error => console.log(error));
        window.location.reload();
        //console.log({id: id, name: fieldName, price: fieldPrice, productGroupId: fieldGroup});
    }

    handleName = e => this.setState({fieldName: e.target.value});
    handlePrice = e => this.setState({fieldPrice: parseFloat(e.target.value)});
    handleGroup = (e, {value}) => this.setState({fieldGroup: value});

    render() {
        const {id, name, price, productGroup} = this.state;
        return (
            <Fragment>
                <TitlePage label='Producto' icon='clipboard outline'/>
                <Table definition>
                    <TableBody>
                        <TableRow>
                            <TableCell width={2}>Nombre</TableCell>
                            <TableCell>{name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Precio</TableCell>
                            <TableCell>{price}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Grupo</TableCell>
                            <TableCell>{productGroup}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>{id}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Divider hidden/>
                <Form>
                    <FormGroup widths='equal'>
                        <FormInput label='Nombre del producto' placeholder='Nombre del producto' onChange={this.handleName}/>
                        <FormInput type='number' label='Precio' placeholder='Precio' onChange={this.handlePrice}/>
                        <FormSelect options={this.state.productGroupList} label='Grupo' placeholder='Grupo' onChange={this.handleGroup}/>
                    </FormGroup>
                    <Button content='Confirmar' onClick={this.updateProductData}/>
                </Form>
            </Fragment>
        );
    }
}