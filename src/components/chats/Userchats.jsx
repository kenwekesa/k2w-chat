import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { or, onSnapshot, where, query, collection, getDocs } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatsContext';
import { changeChatAction } from '../../context/ChatsReducer';
import { retriveConversations } from '../../services/api/DataApi';

function UserChats() {
  const { state } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);

  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'conversations'),
      or(
        where('user1Id', '==', state.user.uid),
        where('user2Id', '==', state.user.uid)
      )
    );
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const conversations_array = [];
      for (const doc of querySnapshot.docs) {
        const otherUserId =
          state.user.uid === doc.data().user1Id
            ? doc.data().user2Id
            : doc.data().user1Id;

        const userQuery = query(
          collection(db, 'Users'),
          where('user_id', '==', otherUserId)
        );
        const userSnapshot = await getDocs(userQuery);
        if (!userSnapshot.empty) {
          const otherUser = userSnapshot.docs[0].data();
          conversations_array.push({
            id: doc.id,
            data: doc.data(),
            user_details: otherUser,
          });
        } else {
          console.log('Empty user');
        }
      }
      setConversations(conversations_array);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [state.user.uid]);

  const handleSelect = (chat, user_details) => {
    dispatch({ type: 'CHANGE_CHAT', payload: chat });
    dispatch({ type: 'UPDATE_OTHER_USER', payload: user_details });  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user_chats">
      {conversations.map((convo) => (
        <div className="user_chat" key={convo.id} onClick={() => handleSelect(convo,convo.user_details)}>
          <img className="profile_pic" src={require('../../images/dummyuser.webp')} alt="Image" />
          <div className="user_chat_info">
            <span className="user_chat_name">{convo.user_details.firstname}</span>
            <span className="chat_message_preview">{convo.data.lastMessage.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserChats;
