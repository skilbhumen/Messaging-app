import React, { useState, useEffect }  from 'react';
import { View, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import {db} from "../firebase";

export default function CustomListItems( {id, chatName, enterChat}) {
   const [chatMessages, setChatMessages ] = useState ([]);


   useEffect(() => {
       
    const unsubscribe = db.collection('chats')
    .doc(id)
    .collection('messages')
    .orderBy('timestamp', "desc")
    .onSnapshot((snapshot) => 
        setChatMessages(snapshot.docs.map(doc => doc.data()))
    );

    return unsubscribe;
    });
    
   
   
   
    return (
        <ListItem key={id} onPress={() => enterChat(id, chatName)} key={id} buttonDivider>
            <Avatar
                rounded
                source ={{
                    uri: chatMessages?.[0]?.photoURL || 
                    "https://ffp4g1ylyit3jdyti1hqcvtb-wpengine.netdna-ssl.com/wp-content/themes/frontierline/img/fallbacks/pattern-3.png",


                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight:"800"}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle 
                numberOfLines={1}
                ellipsizeMode="tail">
                
                {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}


                </ListItem.Subtitle>
            </ListItem.Content>


        </ListItem>
    )
}
