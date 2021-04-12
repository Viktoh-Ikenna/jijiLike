import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './App.css';
import NavBar from '../navBar/navBar';
import IconMenu from '../categIcon/IconMenu';
import { Footer } from '../Footer/Footer';
import { Home } from '../homePage/home';
import {ProductPage} from '../productPage/productPage';
import {Item} from '../itemPage/Item';
import {Search} from '../search/search';
import {UserPage} from '../userPage/userPage';
import { AddNew} from '../dashboard/ads/AddNew';



const App = () => {


    return (
        <Router>
            <div >
                <NavBar />
                    <div>
                        <Route path="/" exact>
                            <IconMenu />
                        </Route>

                    </div>

                    <div>
                        <Route path="/" exact>
                            <Home />
                        </Route>

                    </div>
                    <div>
                    <Route path="/:categories/page/:page">
                    <ProductPage />
                    </Route>
                    <Route path="/search/query:id/page/:page">
                    <Search />
                    </Route>
                    <Route path="/:categories/item/:id/user-:userId/brand-:brand/">
                    <Item />
                    </Route>
                    <Route path="/user/:userId/">
                    <UserPage />
                    </Route>
                    <Route path="/dashboard/ads">
                    <AddNew />
                    </Route>
                    </div>
                <div>
                    <Footer />
                </div>
            </div>
        </Router>
    )
}
export default App;





