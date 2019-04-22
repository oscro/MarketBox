import React, { Component } from "react";
import {Jumbotron} from "../../components/index";
import ProductValues from "../../components/modules/views/ProductValues";
import ProductCategories from "../../components/modules/views/ProductCategories";
import AppFooter from "../../components/modules/views/AppFooter";

class Home extends Component {

    render() {
        return (
            <div>
                <Jumbotron />
                <ProductValues />
                <ProductCategories />
                <AppFooter />
            </div>
        )
    }
}

export default Home; 