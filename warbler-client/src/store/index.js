import rootReducer from "./reducers";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";

export function configureStore() {
	return createStore(rootReducer, compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		)
	);
}