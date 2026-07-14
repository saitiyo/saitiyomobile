import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenNames } from './screenNames';
import TeamHomeScreen from '../screens/teamsHomeScreen/teamHomeScreen';
import TeamMembersScreen from '../screens/teamMembersScreen/teamMembersScreen';








const TeamStack =()=>{

      const Stack = createNativeStackNavigator()
      
      return (
         
        <Stack.Navigator
          initialRouteName={screenNames.TeamHomeScreen}
          screenOptions={{headerShown:false}}
        >
                  <Stack.Screen name={screenNames.TeamHomeScreen} component={TeamHomeScreen} />
                  <Stack.Screen name={screenNames.TeamMembersScreen} component={TeamMembersScreen} />


        </Stack.Navigator>
       
      )
}

export default TeamStack