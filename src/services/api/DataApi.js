import { getDocs, onSnapshot, collection,getDoc,doc,query, where, or,and, addDoc, serverTimestamp,Timestamp,updateDoc } from "firebase/firestore"; 
import {db} from "../../firebase/firebase"




const users_collection_name = "Users"
const chats_collection_name = "chats"

export const findAll = async () => {
    try{
    const doc_refs = await getDocs(collection(db, users_collection_name))

    const res = []

    doc_refs.forEach(user => {
        res.push({
            id: user.id, 
            ...user.data()
        })
    })

    return res
}catch(error)
{
    console.log(error)
}
}


export const findOne = async id => {
    const d = await getDoc(doc(db, users_collection_name, id)) 
    return d.data()
}


export const findUser = async (uid) => {
    const collection_ref = collection(db, users_collection_name)
    const q = query(collection_ref, where("user_id", "==", uid))
    const doc_refs = await getDocs(q);
     
    const res = []

    doc_refs.forEach(country => {
        res.push({
            id: country.id, 
            ...country.data()
        })
    })

    
    return res

   
}


export const findUserByName = async (name) => {
    const collection_ref = collection(db, chats_collection_name)
    const q = query(collection_ref, or(where("firstname", "==", name), where("lastname","==", name)))
    const doc_refs = await getDocs(q);
     
    const res = []

    doc_refs.forEach(user => {
        res.push({
            id: user.id, 
            ...user.data()
        })
    })

    
    return res

   
}

export const createCollection = async(collection_name, object) => 
{
    try {
        const docRef = await addDoc(collection(db, collection_name), {
          
          ...object,
          timestamps:Timestamp.now()
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const sendMessage = async(newMessage)=> 
{
// {  try {
//     const docRef = await addDoc(collection(db, "messages"), {
      
//       ...newMessage,
//       timestamps:serverTimestamp()
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }

try{
const conversationsRef = collection(db,'conversations');
const messagesRef = collection(db,'messages');



// const existingConversationQuery = conversationsRef.where('user1Id', '==', newMessage.currentUserId)
//                                                  .where('user2Id', '==', newMessage.otherUserId)
//                                                  .limit(1);

 //const existingConversationQuery =  query(conversationsRef, or(where('user1Id', '==', newMessage.currentUserId), where('user2Id', '==', newMessage.otherUserId)))
 console.log("currentId-----  ", newMessage.currentUserId)
 console.log("Other Id-----    ",newMessage.otherUserId)
 const existingConversationQuery = query(
  conversationsRef,
  or(
    and
  (where('user1Id', '==', newMessage.currentUserId) ,
  where('user2Id', '==', newMessage.otherUserId)
),
and
(
  where('user1Id', '==', newMessage.otherUserId),
  where('user2Id', '==', newMessage.currentUserId)
)));



 const conv_docs = await getDocs(existingConversationQuery)
 

    if (!conv_docs.empty) {

      
      // A conversation already exists between the two users
      const conversationDoc =conv_docs.docs[0];
      const conversationId = conversationDoc.id;
      //==============================
      console.log("Conversation exist with ID", conversationId)

      const conversation_doc_ref = doc(conversationsRef, conversationId);

      // Update the existing conversation document with the new message


      const existingMessageQuery =  query(messagesRef, where('conversation_id', '==', conversationId))
      const message_docs = await getDocs(existingMessageQuery)

      if(!message_docs.empty)
      {
        //messages exist
        
        const message_doc = message_docs.docs[0]
        const message_doc_ref = doc(messagesRef, message_doc.id);
        

         //==============================
      console.log("There are messages under this conversation exist with ID", message_doc.id)

        const messageDoc = await getDoc(message_doc_ref);
       const currentMessages = messageDoc.data().message || [];
       
       const updatedMessageObject = {
         senderId: newMessage.currentUserId,
         message: newMessage.message,
         timestamp: Timestamp.now()
        }
        const newMessages = [...currentMessages, updatedMessageObject];
        await updateDoc(message_doc_ref, {
          
          message:newMessages
      });
      }
      else
      {
         //doesn't exist
         
          //==============================
      console.log("Message doesn't exist")

         const newMessageObject = 
         {timestamps:Timestamp.now(),
          senderId:newMessage.currentUserId, 
          message:newMessage.message}
         const new_message = await addDoc(collection(db, "messages"), {
          
          conversation_id:conversationId,
          message:[newMessageObject],
          
        });
      
        await updateDoc(conversation_doc_ref, {
          
          lastMessage: {
            text: newMessage.message,
            timestamps:serverTimestamp()
          }
      });

        console.log("New Message written with ID: ", new_message.id);
      }
   
  
 
  }
     else {
      try {
        
        // No conversation exists between the two users yet, so create a new conversation document
        
                  //==============================
      console.log("Conversation doesn't exist")

        const newConversation = {
          user1Id: newMessage.currentUserId,
          user2Id: newMessage.otherUserId,
          lastMessage: {
            text: newMessage.message,
            senderId: newMessage.currentUserId,
            timestamp: serverTimestamp()
          }
        };
        
        
        
        const added_conversation = await addDoc(collection(db, "conversations"), {
          
          
          ...newConversation,
          timestamps:serverTimestamp()
        });
        
        
        const newMessageObject = 
        {timestamps:Timestamp.now(),
          senderId:newMessage.currentUserId, 
          message:newMessage.message}
          
          //Add the new message after creating the conversation
          const new_message = await addDoc(collection(db, "messages"), {
            
            conversation_id:added_conversation.id,
            message:[newMessageObject],
            
          });
          
          console.log("Document written with ID: ", added_conversation.id);
        } catch (error) {
          console.log("Creating a conversation:", error)
          
        }
    
   
    }
  }
  catch(error)
  {
    console.error("Error checking for existing conversation: ", error);
  }

}


export const retriveConversations = (currentUserId) => 
{
  const q = query(collection(db, "conversations"), or(where("user1Id", "==", currentUserId),where("user2Id", "==", currentUserId)));

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const conversations = [];
      querySnapshot.forEach((doc) => {
        conversations.push(doc.data());
      });
      
      resolve(conversations);
    }, (error) => {
      reject(error);
    });
  });

}