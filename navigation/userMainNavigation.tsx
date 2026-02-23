
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screenNames } from './screenNames';
import colors from '../constants/Colors';
import HomeStack from './HomeStack';
import UserProfileStack from './userProfileStack';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import UserBookingsMainScreen from '../screens/userBookingsMainScreen/userBookingsMainScreen';
import UserInboxMainScreen from '../screens/userInboxMainScreen/userInboxMainScreen';



const UserMainNavigation=()=>{
    const {userMainNavigationInitialRoute} = useSelector((state:RootState) => state.authSlice)
    const Tab = createBottomTabNavigator();

    return(
     <Tab.Navigator
        initialRouteName={userMainNavigationInitialRoute || screenNames.HomeTab}
        screenOptions={{
          headerShown:false
        }}
      >
      <Tab.Screen 
      name={screenNames.HomeTab} 
      component={HomeStack} 
      options={{
          tabBarActiveTintColor:colors.primary,
          tabBarIcon:({focused})=>(
              <Ionicons name="home" size={18} color={focused ?colors.primary : colors.gray300} />
          ),
          title:"Home"
      }}
      />
      <Tab.Screen 
      name={screenNames.BookingsTab} 
      component={UserBookingsMainScreen}
      options={{
          tabBarActiveTintColor:colors.primary,
          tabBarIcon:({focused})=>(
              <Ionicons name="calendar-clear-sharp" size={18} color={focused ?colors.primary : colors.gray300} />
          ),
          title:"Bookings"
      }}
       />
      

       <Tab.Screen 
            name={screenNames.InboxTab} 
            component={UserInboxMainScreen}
            options={{
                tabBarActiveTintColor:colors.primary,
                tabBarIcon:({focused})=>(
                    <Ionicons name="chatbox" size={18} color={focused ? colors.primary : colors.gray300} />
                ),
                title:"Inbox"
            }}
       />

       <Tab.Screen 
            name={screenNames.ProfileTab} 
            component={UserProfileStack}
            options={{
                tabBarActiveTintColor:colors.primary,
                tabBarIcon:({focused})=>(
                    <Ionicons name="person" size={18} color={focused ?colors.primary : colors.gray300} />
                ),
                title:"Profile"
            }}
       />
      </Tab.Navigator>
    )
}

export default UserMainNavigation