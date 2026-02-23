
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screenNames } from './screenNames';
import colors from '../constants/Colors';
import Icon from "@react-native-vector-icons/ionicons"
import DashboardStack from './DashboardStack';


const ArtistMainNavigation=()=>{
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
      name={screenNames.ArtistBookingsTab} 
      component={DashboardStack}
      options={{
          tabBarActiveTintColor:colors.primary,
          tabBarIcon:({focused})=>(
              <Icon name="calendar-clear-sharp" size={18} color={focused ?colors.primary : colors.gray400} />
          ),
          title:"Bookings"
      }}
       />

         <Tab.Screen 
            name={screenNames.ArtistInboxScreen} 
            component={DashboardStack}
            options={{
                tabBarActiveTintColor:colors.primary,
                tabBarIcon:({focused})=>(
                    <Icon name="chatbox" size={18} color={focused ?colors.primary : colors.gray400} />
                ),
                title:"Inbox"
            }}
       />

       <Tab.Screen 
            name={screenNames.ArtistProfileScreen} 
            component={DashboardStack}
            options={{
                tabBarActiveTintColor:colors.primary,
                tabBarIcon:({focused})=>(
                    <Icon name="person" size={18} color={focused ?colors.primary : colors.gray400} />
                ),
                title:"Profile"
            }}
       />
      </Tab.Navigator>
    )
}

export default ArtistMainNavigation