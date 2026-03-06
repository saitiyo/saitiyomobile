

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenNames } from './screenNames';
import MySitesScreen from '../screens/mySitesScreen/mySiteScreen';
import LinkDeviceScreen from '../screens/linkDevice/linkDevice';





const SitesStack =()=>{

      const Stack = createNativeStackNavigator()
      return (
         
        <Stack.Navigator
          initialRouteName={screenNames.MySitesScreen}
          screenOptions={{headerShown:false}}
        >
                  <Stack.Screen name={screenNames.MySitesScreen} component={MySitesScreen} />
                  <Stack.Screen name={screenNames.LinkDeviceScreen} component={LinkDeviceScreen} />



        </Stack.Navigator>

      )
}

export default SitesStack




