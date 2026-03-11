import {FlatList, Image, StyleSheet,ToastAndroid,View } from "react-native"
import SafeAreaContainer from "../../components/SafeAreaContainer/SafeAreaContainer"
import CustomAppBar from "../../components/CustomAppBar/CustomAppBar"
import Spacer from "../../components/Spacer/Spacer"
import CustomButton from "../../components/CustomBotton/CustomButton"
import { useEffect, useState } from "react"
import { dimentions } from "../../constants/dimentions"
import colors from "../../constants/Colors"

import { useNavigation } from "@react-navigation/native"
import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client/react"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"



const ADD_PROFILE_IMAGES = gql`
mutation UpdateArtistProfile($artistAccountId: ID!, $profileDescription: String, $profileImages: [String!], $profileVideoUrl: String, $minimumBookingFee: Int) {
  updateArtistProfile(artistAccountId: $artistAccountId, profileDescription: $profileDescription, profileImages: $profileImages, profileVideoUrl: $profileVideoUrl, minimumBookingFee: $minimumBookingFee) {
    id
  }
}
`

const AddPictures=()=>{
  
  const { artistAccountId } = useSelector((state:RootState) => state.authSlice)
  const navigation = useNavigation()

   const [photos,setPhotos] = useState<string[]>([])
   

   const [updateArtistProfile,{loading,error,data}] = useMutation<any>(ADD_PROFILE_IMAGES)


   useEffect(()=>{
      if(error){
          console.log(error)
          ToastAndroid.show("Something has gone wrong",4000)
      }

      if(data && data.updateArtistProfile){
          ToastAndroid.show("Pictures added successfully",4000)
          setTimeout(()=>{
            navigation.goBack()
          },3000)
      }
   },[error,data,navigation])


   const uploadImages=async()=>{
     try {

      if(photos.length === 0){
        ToastAndroid.show("Please upload at least one picture",4000)
        return
      }
        
      console.log("Uploading images:",photos)
       updateArtistProfile({
         variables:{
           artistAccountId:artistAccountId,
           profileImages:photos
         }
       }) 
      
     } catch (error) {
       console.log(error)
     }
   }

    return(
    <SafeAreaContainer>
       <View style={styles.main}>
           <CustomAppBar
              title="Upload pictures"
              description="Upload pictures of your self (5 max)"
              canMoveBack={true}
            />

            <Spacer height={20}/>

            {/* add back customImageUploadComponent */}

            <Spacer height={20}/>

            {photos.length > 0 && <FlatList
               data={photos}
               showsVerticalScrollIndicator={false}
               renderItem={({item,index})=>(
                <View key={index} style={{width:dimentions.vw-40,height:"auto",borderWidth:2,borderColor:colors.gray500,borderRadius:10,justifyContent:"center",alignItems:"center",overflow:"hidden",marginBottom:4}}>
                <Image source={{uri:item}} width={400} height={400} style={{width:"100%",objectFit:"cover"}}  />
             </View>
               )}
             />}


            
            <Spacer height={20}/>

            <CustomButton
              title="Save"
              onPress={()=>{
                uploadImages()
              }}
              loading={loading}
            />


         </View>
    </SafeAreaContainer>
    )
}

export default AddPictures

const styles = StyleSheet.create({
    main:{
        width:"100%",
        height:"100%",
        justifyContent:"flex-start",
        alignItems:"center",
        backgroundColor:colors.white,
        paddingHorizontal:15,
    }
})