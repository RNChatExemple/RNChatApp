import React, {Component, } from 'react';
import {View, StyleSheet, Button} from 'react-native';


//REDUX + SAGGA
import { Provider , connect } from 'react-redux';
import { createStore, applyMiddleware ,  combineReducers} from 'redux'
import createSagaMiddleware from 'redux-saga'
//REACT NAVIGATION
import reducer from './src/Configs/reducer';
import mySaga from './src/Configs/sagas';
import AppNavigator from './src/Configs/navigator';

//REACT NAVIGATION + REDUX 
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';

//REACT NAVIGATION
const navReducer = createNavigationReducer(AppNavigator);

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const navApp = reduxifyNavigator(AppNavigator, "root");

const mapStateToProps = (state) => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(navApp);


//REDUX + SAGA
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

//Creation du store
const appReducer = combineReducers({
  nav: navReducer,
  chat: reducer
});
const appMiddleware  = [sagaMiddleware, navMiddleware];
export const store = createStore(
  appReducer,
  applyMiddleware(...appMiddleware)
)

// then run the saga
sagaMiddleware.run(mySaga)


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppWithNavigationState></AppWithNavigationState>        
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
