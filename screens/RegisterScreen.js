import React, {useState,useLayoutEffect} from 'react'
import { View, Text, StyleSheet,TextInput, Button } from 'react-native'
import { StatusBar } from "expo-status-bar";
import {auth} from "../firebase";


const RegisterScreen = ({navigation}) => {
    const [Name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [ImageURL, setImageURL] = useState('')

    useLayoutEffect(() => {
    navigation.setOptions({
        headerBackTitle:"abc",
    });
    },
    [navigation]);
  
    const register= () =>{
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: Name,
                photoURL: ImageURL ||
                 "https://ffp4g1ylyit3jdyti1hqcvtb-wpengine.netdna-ssl.com/wp-content/themes/frontierline/img/fallbacks/pattern-3.png",

            });
        })
        .catch((error) => alert(error.massage))
    };
    return (
        <View style={styles.container}>
            <StatusBar style="light"/>
                <Text style= {styles.font}>
                    create a signal account
                </Text>


        <View style={styles.inputcontainer}>
            <TextInput style={styles.input}
            placeholder="Full Name" 
               autoFocus type="text" 
                value={Name}
                onChangeText={text =>setName(text)}

            />
             <TextInput style={styles.input}
              placeholder="Email" 
                type="email" 
                value={email}
                onChangeText={text =>setEmail(text)}

            />
             <TextInput style={styles.input}
             placeholder="Passowrd" 
                type="password" 
                value={password}
                onChangeText={text =>setpassword(text)}

            />
             <TextInput style={styles.input}
             placeholder="image" 
                type="text" 
                value={ImageURL}
                onChangeText={text =>setImageURL(text)}
                onSubmitEditing={register}
            />
            <View style={styles.registerButton}>
            <Button raised
            onPress={register} title="Register" />
            </View>
        </View>
        </View>
    )
}

export default RegisterScreen

const styles=StyleSheet.create({

        container:{
            flex:1,
            alignItems:"center",
            justifyContent:"center",
            padding:20,
            backgroundColor:"white"

            

        },
        inputcontainer:{
            alignItems:"center",
           
            margin:50,
            width:200,


            justifyContent:"center",
        },
        input:{
            alignItems:"center",
            justifyContent:"center",
            padding:12,
            margin:5,
            width:300,
            borderBottomColor:"#6495ed",
            borderBottomWidth:2,
            backgroundColor:"white",
            borderRadius:10,
            
        },
        font:{
            fontSize:35,
            color:"#ff8c00",
            fontWeight:"bold",
        },
        registerButton:{
            padding:10,
            margin:20,
            width:250,
            
        },


})