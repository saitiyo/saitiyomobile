import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../redux/store"
import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import UpdateAppScreen from "../screens/updateAppScreen/updateAppScreen"
import { useEffect, useState } from "react"
import AuthStack from "./authStack"
import AsyncStorage from "@react-native-async-storage/async-storage"
import OnBoarding from "../screens/onBoarding/onBoarding"
import { setOnBoardingStatus } from "../redux/features/auth.features"
import SitesStack from "./sitesStack"
import SiteMainNavigation from "./SiteMainNavigation"




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

    const dispatch = useAppDispatch()

    const {showAuthStack,isFirstLaunch,isAuthenticated} = useSelector((state:RootState)=> state.authSlice)
    const {selectedSite} = useSelector((state:RootState)=> state.siteSlice)

    const [newVersion,setNewVersion] = useState<number>(0)
    const [uri,setUri] = useState<string>("")


    useEffect(() => {
      checkFirstLaunch();
    }, []);



   const checkFirstLaunch = async () => {
    try {
      const hasViewedOnboarding = await AsyncStorage.getItem('@viewedOnboarding');

      dispatch(setOnBoardingStatus(hasViewedOnboarding !== 'true'));

    } catch (error) {
      console.error('Error checking onboarding status:', error);
      dispatch(setOnBoardingStatus(true)); // Default to show onboarding on error
    }
  };

   

    useEffect(()=>{
      if(data && data.getVersion){
         setNewVersion(data.getVersion.newVersion)
         setUri(data.getVersion.downloadUri)
      }
    },[data])

  


    if (newVersion > APP_VERSION) {
         return <UpdateAppScreen uri={uri}/>
    }
    

     if(isFirstLaunch){
        return <OnBoarding/>    
     }


     if(isAuthenticated && !showAuthStack && !selectedSite){
        return <SitesStack/>
     }

     if(isAuthenticated && !showAuthStack && selectedSite){
        return <SiteMainNavigation/>
     }


    return (
        <AuthStack/>
    )
}

export default NavHost