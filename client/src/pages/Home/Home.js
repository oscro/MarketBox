import React, { Component } from "react";
import {Jumbotron} from "../../components/index";
import AppFooter from "../../components/modules/views/AppFooter";

class Home extends Component {

    render() {
        return (
            <div>
                <Jumbotron />
                <AppFooter />
            </div>
        )
    }
}

export default Home; 