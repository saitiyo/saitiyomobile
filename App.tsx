
import {StyleSheet} from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Provider} from 'react-redux';
import store from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Main';

function App() {
  return (
    <Provider store={store}>
     <NavigationContainer>
    <SafeAreaProvider>
      <Main/>
    </SafeAreaProvider>
    </NavigationContainer>
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
