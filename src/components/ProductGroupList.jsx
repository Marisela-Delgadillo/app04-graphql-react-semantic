import React, { Component, Fragment } from "react";
import { Divider, Table, TableBody, TableRow, TableCell, Button, Select } from 'semantic-ui-react';
import TitlePage from './TitlePage';
import Loading from "./Loading";

import { getApolloContext, gql } from '@apollo/client';

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

export default class ProductGroupList extends Component {

    static contextType = getApolloContext();

    state = {
        productGroups: [],
        isLoading: true,
        groupsOptions: [],
        products: [],
        defaultOption: ''
    }

    //handleGroup = (e, {value}) => this.setState({fieldGroup: value});

    handleGroup = (e, { value }) => {
        //console.log(value);
        const group = this.state.productGroups.find(group => group.id === value);
        //console.log(group.products);
        this.setState({ products: group.products });
        console.log(this.state.products);
    }

    inspectProduct = id => this.props.history.push({ pathname: '/product', state: { productId: id } });

    componentDidMount = async () => {
        const { client } = this.context;
        const response = await client.query({ query: GET_ALL_GROUPS });
        this.setState({
            productGroups: response.data.productGroups, isLoading: response.loading,
            groupsOptions: response.data.productGroups.map(group => {
                return { key: group.id, value: group.id, text: group.name }
            })
        });
        //console.log(this.state.productGroups);
        //console.log(response.loading);
    }

    showGroups = () => {
        const { isLoading, products } = this.state;
        if (isLoading) {
            return <Loading />
        } else {
            return products.map(p => {
                //return <div key={p.id}>{p.name}</div>;
                return <Fragment>
                    <Button floated='right' primary content='Inspeccionar' onClick={() => this.inspectProduct(p.id)} />
                    <Divider hidden />
                    <Table definition>
                        <TableBody>
                            <TableRow>
                                <TableCell width={2}>Nombre</TableCell>
                                <TableCell>{p.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Precio</TableCell>
                                <TableCell>{p.price}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Código</TableCell>
                                <TableCell>{p.id}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Divider />
                </Fragment>
            });
        }
    }

    //value={this.state.productGroups[0].id}
    render() {
        return (
            <Fragment>
                <TitlePage label='Grupos' />
                <Select placeholder='Selecciona un grupo' options={this.state.groupsOptions} onChange={this.handleGroup} />
                {this.showGroups()}
            </Fragment>
        );
    }
}