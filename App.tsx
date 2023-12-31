import React from 'react';
import 'react-native-gesture-handler';
import { SimonSaysApp } from './src/SimonSaysApp';
import { store } from './src/store/store'
import { Provider } from 'react-redux'

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SimonSaysApp />
    </Provider>

  );
}

export default App;
