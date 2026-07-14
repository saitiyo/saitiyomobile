import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet"
import {ReactNode, useCallback, useEffect,useRef} from "react"
import { StyleSheet } from "react-native"


interface Props {
    children:ReactNode
    show:boolean
    close:()=>void
    snapPoints?:string[]
    enablePanDownToClose?:boolean
    index?:number
    disappearsOnIndex?:number
    appearsOnIndex?:number
}

const CustomBottomSheet=({
  children,
  show,
  close,
  snapPoints=["75%","90%","100%"],
  enablePanDownToClose=true,
  index = -1,
  disappearsOnIndex = -1,
  appearsOnIndex =0

}:Props)=>{

    const bottomSheetRef = useRef<BottomSheet>(null)


  
     useEffect(()=>{
    
        if(!show){
            bottomSheetRef.current?.close()
        }
        
        if(show && bottomSheetRef.current){
            bottomSheetRef.current?.snapToIndex(0)
        }
    },[show,bottomSheetRef.current])


    // renders
	const renderBackdrop = useCallback(
		(props:any) => (
	  <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={disappearsOnIndex}
      appearsOnIndex={appearsOnIndex} 
      // style={{width:"100%",height:"auto",backgroundColor:"rgba(0,0,0,.5)",position:"absolute",top:0,bottom:0,left:0,right:0}}
      
      >
      </BottomSheetBackdrop>
		),
		[]
	);




        return(
            <BottomSheet
            ref={bottomSheetRef}
            index={index}
            onChange={()=>{}}
            onClose={()=> close()}
            keyboardBehavior="extend"
            enableDynamicSizing={false}
            snapPoints={snapPoints}
            enablePanDownToClose={enablePanDownToClose} 
            backdropComponent={renderBackdrop}
            
          >
            <BottomSheetView 
            style={styles.contentContainer}
            >
              
              <BottomSheetView style={styles.innerContentContainer}>
                {/* Content */}
                {children}
              </BottomSheetView>
         
          </BottomSheetView>
          </BottomSheet>
        )
    

    
}

export default CustomBottomSheet


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
      padding:10,
      alignItems:'center',
    },
    innerContentContainer: {
      flex: 1,
      padding:1,
      position: 'relative',
      width:"100%"
  },
   
  });