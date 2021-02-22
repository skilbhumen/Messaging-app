import React, {useState,useEffect} from 'react';
import { StyleSheet, View, Text, Image, Button,KeyboardAvoidingView, TextInput,TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {auth, db} from "../firebase";



const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");


    useEffect(() => {

       const unsubscribe = auth.onAuthStateChanged((authUser) => {
        //    console.log( authUser);
        if(authUser) {
                navigation.replace("Home");
        }
        
    });
    
    return unsubscribe;
    
    }, []);

    const signIn = () => {

        auth
        .signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error));

    };

    return (
        <KeyboardAvoidingView  style={styles.Container}>
        <StatusBar style="light" />
            <Image source ={{ 
                uri:
            "https://ffp4g1ylyit3jdyti1hqcvtb-wpengine.netdna-ssl.com/wp-content/themes/frontierline/img/fallbacks/pattern-3.png",
        }}
        style={{width:200, height:200}}
        />
         <View >
            <TextInput style={styles.inputContainer}
             placeholder="Email"
             autoFocus type="Email" 
             value={email}
             onChangeText={ text => setEmail(text)} />

            <TextInput style={styles.inputContainer}
             placeholder="password" 
             secureTextEntry 
             type="password"
             value={password}
             onChangeText={text => setpassword(text)}
             onSubmitEditing={signIn}
              />
            
         </View>
         <View style={{height:20}} />
         <TouchableOpacity style={styles.button} onPress={signIn}>
             <Text>Login</Text>
            
         </TouchableOpacity>
         
         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Register")}>
             <Text>Register</Text>
         </TouchableOpacity>
        
         {/* <Button containerStyle={styles.button} title="login" />
         <Button containerStyle={styles.button} type="outline" title="Register" /> */}

        
        </KeyboardAvoidingView>
       
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"white"
    },
    inputContainer:{
        width:200,
        borderBottomWidth:2,
        borderBottomColor:"#1e90ff",
        padding:10,
        
    },

    
    button:{

        width:300,
        padding:20,
        marginTop:10,
        alignItems:'center',
        justifyContent:"center",
        backgroundColor:"#dc143c",
        borderRadius:18,
        
 
        

    },

});
