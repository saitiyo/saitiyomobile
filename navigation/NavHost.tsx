import { useSelector } from "react-redux"
import UserMainNavigation from "./userMainNavigation"
import { RootState } from "../redux/store"
import { accounts } from "../constants/accounts"
import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import UpdateAppScreen from "../screens/updateAppScreen/updateAppScreen"
import { useEffect, useState } from "react"
import ArtistMainNavigation from "./artistMainNavigation"
import AuthStack from "./AuthStack"
import RegisterArtistStack from "./RegisterArtistStack"
import AsyncStorage from "@react-native-async-storage/async-storage"
import OnboardingScreen from "../screens/onBoardingScreen/onBoardingScreen"



const GET_VERSION = gql`
  query GetVersion {
    getVersion {
      currentVersion
      newVersion
      downloadUri
    }
  }
`;



const NavHost=()=>{
    
    const APP_VERSION = 6.0

    const {data} = useQuery<any>(GET_VERSION);
    const {activeAccount,showAuthStack,showRegisterArtistStack} = useSelector((state:RootState)=> state.authSlice)
    const [newVersion,setNewVersion] = useState<number>(0)
    const [uri,setUri] = useState<string>("")


    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(true);

    useEffect(() => {
      checkFirstLaunch();
    }, []);

  const checkFirstLaunch = async () => {
    try {
      const hasViewedOnboarding = await AsyncStorage.getItem('@viewedOnboarding');

      setIsFirstLaunch(hasViewedOnboarding === null);

    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setIsFirstLaunch(true); // Default to show onboarding on error
    }
  };

 
  

    /**
     * Get current in app version from async storage
     * [add one if not found]
     */

   

    useEffect(()=>{
      if(data && data.getVersion){
         setNewVersion(data.getVersion.newVersion)
         setUri(data.getVersion.downloadUri)
      }
    },[data])

  
    

     if(isFirstLaunch){
        return <OnboardingScreen/>    
     }

     //create a register artist stack
     if(showRegisterArtistStack){
        return <RegisterArtistStack/>
     }

    if(activeAccount === accounts.ARTIST){
        return <ArtistMainNavigation/>
    }
    


    if (newVersion > APP_VERSION) {
         return <UpdateAppScreen uri={uri}/>
    }

   

    return (
        // <UserMainNavigation/> 
        <AuthStack/>
    )
}

export default NavHost