
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screenNames } from './screenNames';
import colors from '../constants/colors';
import Icon from "@react-native-vector-icons/ionicons"
import DashboardStack from './DashboardStack';
import TeamStack from './TeamsStack';
import TasksStack from './TasksStack';
import InventoryStack from './InventoryStack';
import MoreStack from './MoreStack';


const SiteMainNavigation=()=>{

    const Tab = createBottomTabNavigator();
    return(
     <Tab.Navigator
        initialRouteName={screenNames.DashboardTab}
        screenOptions={{
          headerShown:false
        }}
      >
      <Tab.Screen 
      name={screenNames.DashboardTab} 
      component={DashboardStack} 
      options={{
          tabBarActiveTintColor:colors.primary,
          tabBarIcon:({focused})=>(
              <Icon name="apps-sharp" size={18} color={focused ?colors.primary : colors.gray400} />
          ),
          title:"Dashboard"
      }}
      />
      <Tab.Screen 
      name={screenNames.TasksTab} 
      component={TasksStack}
      options={{
          tabBarActiveTintColor:colors.primary,
          tabBarIcon:({focused})=>(
              <Icon name="checkbox" size={18} color={focused ?colors.primary : colors.gray400} />
          ),
          title:"Tasks"
      }}
       />

         <Tab.Screen 
            name={screenNames.InventoryTab} 
            component={InventoryStack}
            options={{
                tabBarActiveTintColor:colors.primary,
                tabBarIcon:({focused})=>(
                    <Icon name="basket" size={18} color={focused ?colors.primary : colors.gray400} />
                ),
                title:"Inventory"
            }}
       />

       <Tab.Screen 
            name={screenNames.TeamTab} 
            component={TeamStack}
            options={{
                tabBarActiveTintColor:colors.primary,
                tabBarIcon:({focused})=>(
                    <Icon name="people" size={18} color={focused ?colors.primary : colors.gray400} />
                ),
                title:"Team"
            }}
       />
       <Tab.Screen 
            name={screenNames.MoreTab} 
            component={MoreStack}
            options={{
                tabBarActiveTintColor:colors.primary,

                tabBarIcon:({focused})=>(
                    <Icon name="reorder-three-outline" size={18} color={focused ?colors.primary : colors.gray400} />
                ),
                title:"More"
            }}
       />
      </Tab.Navigator>
    )
}
export default SiteMainNavigation