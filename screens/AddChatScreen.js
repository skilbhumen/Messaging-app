import React, {useLayoutEffect, useState} from 'react'
import { View, Text, StyleSheet,Button, TextInput } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import {auth, db} from "../firebase";


const AddChatScreen = ( {navigation}) => {

    const [Input, setInput] = useState("");

    useLayoutEffect(() => {
            navigation.setOptions({
                title:"Add a new Chat",
                headerBackTitile:"Chats",

            });


    }, [navigation]);
    
    const createchat= async () => {
        await db.collection('chats').add({
            chatName: Input

        }).then(() => {
            navigation.goBack()
        }).catch((error) => alert(error));
    };
    

    return (
        <View style={styles.container}>
                
                <View style={styles.inputcontainer}>
                    <Icon name="wechat" type="antdesign" size={30} color="black"  style={{margin:15}} />

                    
                    <TextInput
                     placeholder="Enter a chat number" 
                        value={Input}
                        mode={"outlined"}
                        onChangeText={(text) => setInput(text)} 
                        onSubmitEditing={createchat}
                        
                    />
                    </View>

                    <View style={styles.Button}>
                    <Button
                    onPress={createchat} 
                    title="Create new Chat" />
                    </View>
                    
        </View>
    );
};
export default AddChatScreen;

const styles=StyleSheet.create({
    container:{
        padding:30,
        // backgroundColor:"white",
        
    },

    inputcontainer:{
        flexDirection:"row",
        borderRadius:1,
        borderBottomWidth:1,
        borderBottomColor:"#1e90ff",
           
    },

    Button:{
        alignContent:"center",
        padding:10,
        width:350,
        height:100,
     
    },
    


});
