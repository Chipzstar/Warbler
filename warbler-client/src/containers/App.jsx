import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../store";
import { BrowserRouter } from "react-router-dom";
import "../stylesheets/App.css";
import NavBar from "./NavBar";
import Main from "./Main";

const store = configureStore();

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className='onboarding'>
                    <NavBar />
                    <Main />
                </div>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
