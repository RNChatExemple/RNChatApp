import React, {Component, } from 'react';
import {View, StyleSheet,Text} from 'react-native';
import VisibleChat from './src/Containers/Chat/visibleChat'
//REDUX + SAGGA
import { Provider , connect } from 'react-redux';
import { createStore, applyMiddleware ,  combineReducers} from 'redux'
import createSagaMiddleware from 'redux-saga'
//REACT NAVIGATION
import { createStackNavigator, createAppContainer } from "react-navigation";
import reducer from './src/Configs/reducer';
import mySaga from './src/Configs/sagas'
//REACT NAVIGATION + REDUX 
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';


//REACT NAVIGATION
const AppNavigator = createStackNavigator({
  Home: {
    screen: VisibleChat
  }
});

const navReducer = createNavigationReducer(AppNavigator);

const appReducer = combineReducers({
  nav: navReducer,
  chat: reducer
});

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
// mount it on the Store

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
