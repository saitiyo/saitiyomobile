import { Text, View } from "react-native"
import colors from "../../constants/colors"
import { dimentions } from "../../constants/dimentions"

const MoreHomeScreen=()=>{

    return (
      <View style={{
        width:dimentions.vw,
        height:dimentions.vh,
        justifyContent:"center",
        alignItems:"center"
      }}>
        <Text style={{
            color:colors.gray400,
            fontSize:20,
            fontWeight:"bold",
            textAlign:"center"
        }}>
            MORE FEATURES COMING SOON
        </Text>
      </View>
    )
}

export default MoreHomeScreen