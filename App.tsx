import React from 'react';
import { Provider } from 'react-redux';
import { store, epicMiddleware } from './src/store/store';
import { rootEpic } from  './src/store/epics/searchEpics';
import HomeScreen from './src/screens/HomeScreen';
import { SafeAreaView, StatusBar } from 'react-native';
import { combineEpics } from 'redux-observable';

// Run Epics
epicMiddleware.run(rootEpic);

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <HomeScreen />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
