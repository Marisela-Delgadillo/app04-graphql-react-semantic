import React, {Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductList from './ProductList';
import Product from './Product';
import HomeView from './HomeView';
import AddProduct from './AddProduct';
import ProductGroupList from './ProductGroupList';
import AddProductGroup from './AddProductGroup';
import EditProductGroup from './EditProductGroup';

export default class Routes extends Component{

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/product' component={Product}/>
                    <Route path='/products' component={ProductList}/>
                    <Route path='/addproduct' component={AddProduct}/>
                    <Route path='/groups' component={ProductGroupList}/>
                    <Route path='/addproductgroup' component={AddProductGroup}/>
                    <Route path='/editproductgroup'component={EditProductGroup}/>
                    <Route path='/' component={HomeView}/>
                </Switch>
            </BrowserRouter>
        );
    }
}