import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenNames } from './screenNames';
import RegisterArtistScreen from '../screens/registerArtist/registerArtistScreen';
import SelectCategoryScreen from '../screens/selectCategory/selectCategory';
import SelectDocumentType from '../screens/selectDocumentType/selectDocumentType';
import VerifyOnBoarding from '../screens/verifyOnBoarding/verifyOnBoarding';
import CaptureDocument from '../screens/captureDocument/captureDocument';
import UploadFront from '../screens/uploadFront/uploadFront';
import VerifyCongratulation from '../screens/verifyCongratulation/verifyCongratulation';
import UpdateProfileHome from '../screens/updateProfileHome/updateProfileHome';
import AddProfileDescription from '../screens/addProfileDescription/addProfileDescription';
import AddPictures from '../screens/addPictures/addPictures';
import AddVideo from '../screens/addVideo/addVideo';
import UpdateProfileCongratulations from '../screens/updateProfileCongratulation/updateProfileCongratulation';
import AddMinimumBookingFee from '../screens/addMinimumBookingFee/addMinimumBookingFee';




const RegisterArtistStack =()=>{

      const Stack = createNativeStackNavigator()

      return (
         
        <Stack.Navigator
          initialRouteName={screenNames.RegisterAsArtistScreen}
          screenOptions={{headerShown:false}}
        >
                  <Stack.Screen name={screenNames.RegisterAsArtistScreen} component={RegisterArtistScreen} />
                  <Stack.Screen name={screenNames.SelectCategory} component={SelectCategoryScreen} />
                  <Stack.Screen name={screenNames.SelectDocumentType} component={SelectDocumentType} />
                  <Stack.Screen name={screenNames.VerifyOnBoarding} component={VerifyOnBoarding} />
                  <Stack.Screen name={screenNames.CaptureDocument} component={CaptureDocument} />
                  <Stack.Screen name={screenNames.UploadFront} component={UploadFront} />
                  <Stack.Screen name={screenNames.VerifyCongratulations} component={VerifyCongratulation} />
                  <Stack.Screen name={screenNames.UpdateProfileHome} component={UpdateProfileHome} />
                  <Stack.Screen name={screenNames.AddProfileDescription} component={AddProfileDescription} />
                  <Stack.Screen name={screenNames.AddPictures} component={AddPictures} />
                  <Stack.Screen name={screenNames.AddVideo} component={AddVideo} />
                  <Stack.Screen name={screenNames.AddMinimumBookingFee} component={AddMinimumBookingFee} />

                  <Stack.Screen name={screenNames.UpdateProfileCongratulations} component={UpdateProfileCongratulations} />
            

        </Stack.Navigator>
      )
}

export default RegisterArtistStack




