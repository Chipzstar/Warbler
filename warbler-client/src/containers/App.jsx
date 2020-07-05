import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../store";
import { BrowserRouter } from "react-router-dom";
import "../stylesheets/App.css";
import NavBar from "./NavBar";
import Main from "./Main";
import { setAuthorizationToken, setCurrentUser } from "../store/actions/auth";
import jwtDecode from "jwt-decode";

const store = configureStore();

class App extends React.Component {
    storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            console.log(storage);
            return true;
        } catch (e) {
            console.log(storage);
            console.log(e.code);
            return (
                e instanceof DOMException &&
                // everything except Firefox
                (e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    e.name === "QuotaExceededError" ||
                    // Firefox
                    e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage &&
                storage.length !== 0
            );
        }
    }
    componentDidMount() {
        if (this.storageAvailable("localStorage")) {
            console.log("STORAGE AVAILABLE");
        } else {
            console.log("NO STORAGE AVAILABLE");
        }
        if (localStorage["jwt_token"]) {
            setAuthorizationToken(localStorage["jwt_token"]);
            //prevent someone from manually tampering with the key of jwt token in local Storage
            try {
                store.dispatch(
                    setCurrentUser(jwtDecode(localStorage["jwt_token"]))
                );
            } catch (err) {
                store.dispatch(setCurrentUser({}));
            }
        }
    }

    render() {
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
    }
}

export default App;
