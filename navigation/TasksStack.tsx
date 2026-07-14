import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenNames } from './screenNames';
import TasksHomeScreen from '../screens/tasksHomeScreen/tasksHomeScreen';





const TasksStack =()=>{

      const Stack = createNativeStackNavigator()
      
      return (
         
        <Stack.Navigator
          initialRouteName={screenNames.TasksHomeScreen}
          screenOptions={{headerShown:false}}
        >
                  <Stack.Screen name={screenNames.TasksHomeScreen} component={TasksHomeScreen} />
                  
        </Stack.Navigator>
       
      )
}

export default TasksStack