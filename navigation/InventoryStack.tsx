import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenNames } from './screenNames';
import InventoryHomeScreen from '../screens/inventoryHomeScreen/inventoryHomeScreen';





const InventoryStack =()=>{

      const Stack = createNativeStackNavigator()
      
      return (
         
        <Stack.Navigator
          initialRouteName={screenNames.InventoryHomeScreen}
          screenOptions={{headerShown:false}}
        >
                  <Stack.Screen name={screenNames.InventoryHomeScreen} component={InventoryHomeScreen} />
                  
        </Stack.Navigator>
       
      )
}

export default InventoryStack