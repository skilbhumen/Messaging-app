import React, {useLayoutEffect, useState, useEffect} from 'react'
import { View, Text,SafeAreaView,  StyleSheet,ScrollView,TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItems from '../components/CustomListItems'
import { auth, db,} from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const HomeScreen =  ({navigation}) => {

    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    };

        useEffect(()  => {

            const unsubscribe = db.collection("chats").onSnapshot(snapshot =>(
               setChats(snapshot.docs.map(doc => ({
                   id: doc.id,
                   data: doc.data()
               }))) 
            )
         );

            return unsubscribe;



        }, [])

        useLayoutEffect(() => {
            navigation.setOptions({
                title: "Signal",
                headerStyle: {backgroundColor:"#fff"},
                headerTitleStyle:{color:"black"},
                headerTintColor: "black",
                headerLeft:() =>  (
                <View style={{marginLeft:20 }}>
                    <TouchableOpacity activeOpacity={.5} 
                        onPress={signOutUser}
                    >
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
                ),
                headerRight: () => (
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width:80,
                        margin:20,
                    }}>
                            <TouchableOpacity activeOpacity={.5}>
                                <AntDesign name="camerao" size={24} color="black" />
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate("AddChat")}>
                                <SimpleLineIcons name="pencil" size={22} color="black" />
                            </TouchableOpacity>
                        </View>
                ),
            });
        }, [navigation]);


        const enterChat = (id, chatName) => {
            navigation.navigate('Chat', {
                id,
                chatName,
            })
        }

    return (
        <SafeAreaView>
            <StatusBar style="auto" />
            <ScrollView style={styles.container}>
                {chats.map(({id, data:{chatName}}) => (
                   
                    <CustomListItems 
                    key={id} 
                    id={id}  
                    chatName={chatName}
                    enterChat={enterChat}
                     />

                ))}
                

            </ScrollView>


        </SafeAreaView>
    );
};

export default HomeScreen;

const styles= StyleSheet.create({
    container:{
        height:"100%",
    },


});
