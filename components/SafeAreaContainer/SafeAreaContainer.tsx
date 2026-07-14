import { Platform,StatusBar, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


interface Props {
    children:React.ReactNode
}

const SafeAreaContainer=({children}:Props)=>{

    const isAndroid = Platform.OS === 'android'
    const statusBarHeight = StatusBar.currentHeight 

    return(
       <SafeAreaView style={{flex:1}}>
        <View style = {{paddingTop: isAndroid?statusBarHeight:0 }} >
           {children}
        </View>  
       </SafeAreaView>
    )
}

export default SafeAreaContainer