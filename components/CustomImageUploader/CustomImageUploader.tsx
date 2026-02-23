import { ActivityIndicator, Image, Pressable, Text, ToastAndroid, View } from "react-native"
import colors from "../../constants/Colors";
import Icon from "@react-native-vector-icons/ionicons"
import ImagePicker from 'react-native-image-crop-picker';
import { useState } from "react";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import axios from "axios";
import BodyText from "../BodyText";

// const cloudName ="odavoltpix"
// const unsignedUploadPreset="pbwhmlbn"

const production_cloundName="daspg4h3l"
const production_unsignedUploadPreset="odavolt_upload"

interface Props {
    onUpload:(uri:string)=> void
    error?:string
    imagePath:string
}

const CustomImageUploader=({onUpload,error,imagePath}:Props)=>{


      // const [imagePath,setImagePath]= useState<string | null>(null)
      const [uploadLoading,setUploadLoading] = useState<boolean>(false)
      const [imageLoading,setImageLoading] = useState<boolean>(true)
      const [percentUploaded,setPercentUploaded] = useState<number>(50)

    const handlePickingImage=()=>{

        //reset loaders
        setImageLoading(false)
        //
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
          cropperCircleOverlay:false,
          avoidEmptySpaceAroundImage:true,
          freeStyleCropEnabled:true,
          includeBase64:true
        }).then((image:any) => {
         
          const data = `data:${image.mime};base64,${image.data}`
          uploadFile(data)
          // setImagePath(image.path)
          // onPick(data)
          
        });
       }

    const handleTakePhoto=()=>{
        setImageLoading(false)
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
          cropperCircleOverlay:false,
          avoidEmptySpaceAroundImage:true,
          freeStyleCropEnabled:true,
          includeBase64:true
        }).then((image:any) => {
          const data = `data:${image.mime};base64,${image.data}`
          uploadFile(data)
        });
    }

       async function uploadFile(file:string) {

        try {

        setUploadLoading(true)
        const url = `https://api.cloudinary.com/v1_1/${production_cloundName}/upload`;

        const fd = new FormData();
        fd.append('upload_preset',production_unsignedUploadPreset);
        fd.append('file', file);


        const res = await axios.post(url,fd,{
          headers:{
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress:(progressEvent:any) => {

            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
           
            setPercentUploaded(percentCompleted)
          },
        })
        
        if(res.data){
          const url = res.data.secure_url;
            // url && setImagePath(url)
            url && onUpload(url)
            setUploadLoading(false)
        }
          setUploadLoading(false)
        
      
          
        } catch (error) {
          setUploadLoading(false)
          ToastAndroid.show("Failed to process image!",4000)
          console.log(JSON.stringify(error))
        }
      }
      

    return(
        <View style={{width:"100%",height:"auto",justifyContent:"center",alignItems:"center"}}>
          <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginBottom:8}}>
            <Pressable
              style={{padding:8, backgroundColor:colors.gray100, borderRadius:8, flexDirection:'row', alignItems:'center', marginRight:8}}
              onPress={handlePickingImage}
            >
              <Icon name="image-outline" size={20} color={colors.primary} />
              <Text style={{marginLeft:6}}>Gallery</Text>
            </Pressable>
            <Pressable
              style={{padding:8, backgroundColor:colors.gray100, borderRadius:8, flexDirection:'row', alignItems:'center'}}
              onPress={handleTakePhoto}
            >
              <Icon name="camera-outline" size={20} color={colors.primary} />
              <Text style={{marginLeft:6}}>Camera</Text>
            </Pressable>
          </View>
        <Pressable
          style={{
            width:"100%",
            height:150,
            backgroundColor:colors.white,
            borderColor: error ?colors.danger: colors.gray300,
            borderWidth:1,
            borderRadius:8,
            borderStyle:"dashed",
            justifyContent:"center",
            alignItems:"center",
            position:"relative"
          }}
          onPress={()=>{
            handlePickingImage()
          }}
        >
           <View style={{
            width:"100%",
            height:"100%",
            justifyContent:"center",
            alignItems:"center",
            overflow:"hidden",
            position:"relative"
            
           }}>
           { 
             imagePath && imageLoading &&<View style={{position:"absolute",top:"50%",left:"50%",transform:[{translateX:-50},{translateY:-50}],zIndex:10}} >
            <ActivityIndicator size={40} color={colors.success}/>
            </View>
             }
           {  
              
              imagePath ? <Image 
                               source={{uri:imagePath}} style={{width:100,height:100,borderRadius:8,overflow:"hidden"}} 
                              
                               onLoadStart={()=> {
                                setImageLoading(true)

                                return undefined
                              }
                              } 
                               onLoad={()=>{
                                 setImageLoading(false)
                               }}/> :!uploadLoading ?
             <View style={{width:"100%",justifyContent:"center",alignItems:"center"}}>
              <Icon name="cloud-upload-outline" size={60} color={colors.gray200} />
              <BodyText text="Tap to upload image" textStyles={{color:colors.gray400, marginTop:8}} />
             </View> : undefined
             
           }

           {/* progress */}
          { uploadLoading && <AnimatedCircularProgress
                    size={100}
                    width={3}
                    fill={percentUploaded}
                    tintColor={colors.success}
                    onAnimationComplete={() => {}}
                    backgroundColor={colors.gray200}
                     />}
           </View>
           
           {/* absolute camera icon */}
           {/* <View style={{width:40,height:40,backgroundColor:colors.primary,position:"absolute",right:-8,bottom:-4,borderRadius:20,justifyContent:"center",alignItems:"center",alignContent:"center"}}>
              
              <Icon name="camera" size={26} color={colors.white} />
              
           </View> */}
        </Pressable>
        <Text style={{color:"red",fontSize:12,width:"100%"}}>
                    {error ? error : ""}
        </Text>
        </View>
    )
}

export default CustomImageUploader