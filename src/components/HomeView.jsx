import React, { Component, Fragment } from "react";

import { Button, Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react';

export default class HomeView extends Component {

    productList = () => this.props.history.push('/products');
    addProduct = () => this.props.history.push('/addproduct');
    productGroupList = () => this.props.history.push('/groups');
    addProductGroup = () => this.props.history.push('/addproductgroup');

    render() {
        return (
            <Fragment>
                <Segment placeholder>
                    <Grid columns={2} stackable textAlign='center'>
                        <Divider vertical>O</Divider>
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column>
                                <Header icon>
                                    <Icon name='search' />
                                    Buscar productos
                                </Header>
                                <Button primary onClick={this.productList}>Buscar</Button>
                            </Grid.Column>

                            <Grid.Column>
                                <Header icon>
                                    <Icon name='file' />
                                    Crear nuevos productos
                                </Header>
                                <Button primary onClick={this.addProduct}>Crear</Button>
                            </Grid.Column>
                        </Grid.Row>
                        
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column>
                                <Header icon>
                                    <Icon name='table' />
                                    Ver Grupos
                                </Header>
                                <Button primary onClick={this.productGroupList}>Buscar</Button>
                            </Grid.Column>
                            <Grid.Column>
                                <Header icon>
                                    <Icon name='file' />
                                    Crear nuevo grupo
                                </Header>
                                <Button primary onClick={this.addProductGroup}>Crear</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Fragment>
        );
    }
}