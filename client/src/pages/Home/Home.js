import React, { Component } from "react";
import {Jumbotron, Navbar} from "../../components/index";
import ProductValues from "../../components/Material/modules/views/ProductValues";
import ProductCategories from "../../components/Material/modules/views/ProductCategories";
import AppFooter from "../../components/Material/modules/views/AppFooter";
import API from "../../utils/API";

class Home extends Component {
    state = {
        login: false
    };

    componentDidMount(){
        this.getlogin()
    };

    getlogin(){
        API.signedIn().then(response => {
            if (response.data.user != null) {
                this.props.history.push('/dashboard/user')
            }
        })
    };

    render() {
        return (
            <div>
                <Navbar />
                <Jumbotron />
                <ProductValues />
                <ProductCategories />
                <AppFooter />
            </div>
        )
    }
}

export default Home; 