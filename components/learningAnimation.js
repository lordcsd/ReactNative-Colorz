import React, { Component} from "react";
import { View, Text, ScrollView, StyleSheet, Animated} from "react-native";

class Animation extends Component{
    componentWillMount(){
        this.position = new Animated.ValueXY(0,0);
        Animated.spring(this.position,{
            toValue:{x:30,y:250} 
        }).start()
    }

    render(){
        return(
            <View style={styles.card}> 
            <Animated.View style={this.position.getLayout()}>
                <View style={styles.ball}>
                    <Text style={styles.innerText}>
                        CSD Art and Logic
                    </Text>
                </View>
            </Animated.View>
            </View> 
        )
    }
}
export default Animation

let styles = StyleSheet.create({
    card:{
        flex:1,
        backgroundColor:"rgb(255,100,100)"
    },
    ball:{
        justifyContent:"center",
        width:300,
        backgroundColor:"rgb(255,200,0)",
        borderRadius:5
    },
    innerText:{
        alignSelf:"center",
        fontSize:30,
        color:"rgb(0,130,150)",
        fontStyle:"bold",
        fontFamily:"ubuntu"
    }
})