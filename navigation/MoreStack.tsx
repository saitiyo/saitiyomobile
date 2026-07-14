import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenNames } from './screenNames';
import MoreHomeScreen from '../screens/moreHomeScreen/moreHomeScreen';





const MoreStack =()=>{

      const Stack = createNativeStackNavigator()
      
      return (
         
        <Stack.Navigator
          initialRouteName={screenNames.MoreHomeScreen}
          screenOptions={{headerShown:false}}
        >
                  <Stack.Screen name={screenNames.MoreHomeScreen} component={MoreHomeScreen} />
                  
        </Stack.Navigator>
      )
}

export default MoreStack