import { useState, useEffect, useLayoutEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions } from '@mui/material';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, QuerySnapshot, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom'
import { webSocket, onClick } from 'src/webSocket.tsx'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  maxWidth: 400,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const username = `Truncation`;
const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support.`;

function ChattingStacks({ userObj }) {
  const [chattingMessage, setChattingMessage] = useState(false)
  // const [newMessages, setNewMessage] = useState(false)
  // const [myMessages, setMyMessage] = useState([])
  const [myConversations, setMyConversations] = useState([])
  const [conversations, setConversations] = useState([])
  useEffect(() => {
    const myChatting = async () => {
      const myDocRef = doc(dbservice, `members/${userObj.uid}`)
      const myDocSnap = await getDoc(myDocRef)
      const myConversation = myDocSnap.data()?.conversation || []
      setMyConversations(myConversation)
    }
    setChattingMessage(true)
    if (!chattingMessage) {
      myChatting()
    }
  })
  useEffect(() => {
    const myChattings = () => {
      myConversations.map(async (element, index) => {
        const chattingRef = collection(dbservice, `chats_${element}`)
        const chattingCollection = query(chattingRef, orderBy('messageClockNumber'))
        const chattingMessages = await getDocs(chattingCollection)
        chattingMessages.forEach(async (document) => {
          const documentObj = document.data()
          let userDocRef
          let conversationUid
          if (userObj.uid === documentObj.userOne) {
            userDocRef = doc(dbservice, `members/${documentObj.userTwo}`)
            conversationUid = documentObj.userTwo
          } else {
            userDocRef = doc(dbservice, `members/${documentObj.userOne}`)
            conversationUid = documentObj.userOne
          }
          const userDocSnap = await getDoc(userDocRef)
          const userDisplayName = userDocSnap.data()?.displayName
          const newMessage = {conversation: element, username: documentObj.userName, message: documentObj.message, 
            conversationUid: conversationUid,
            userDisplayName: userDisplayName
          }
          if (conversations.length < myConversations.length) {
            const check = conversations.map((elements) => elements.conversation).indexOf(element)
            if (check === -1) {
              setConversations([...conversations, newMessage])
            }
          }
        })
      })
    }
    if (myConversations.length !== 0) {
      myChattings()
    }
  })
  useEffect(() => {
    if (!webSocket) return;
    function sMessageCallback(message) {
      const { msg, userUid, id, target, messageClock, conversation, conversationUid, conversationName } = message;
      console.log(msg)
      const location = conversations.map((element) => element.conversation).indexOf(conversation)
      const replaceObj = {conversation: conversation, username: id, message: msg, conversationUid: userUid, userDisplayName: id}
      // {conversation: element, username: documentObj.userName, message: documentObj.message, 
      //   conversationUid: conversationUid,
      //   userDisplayName: userDisplayName
      // }
      console.log(replaceObj)
      console.log(conversations)
      console.log(conversations.splice(location, 1, replaceObj))
      setConversations(conversations.splice(location, 1, replaceObj))
      // setPiazzaMessage(
      //   {
      //     message: msg,
      //     username: id,
      //   }
      // );
    }
    conversations.map((element) => {
      webSocket.on(`sMessage${element.conversation}`, sMessageCallback);
      return () => {
        webSocket.off(`sMessage${element.conversation}`, sMessageCallback);
      };
    })
  }, [conversations]);
  console.log(conversations)
  // console.log('practice')
  return (
    <>
      {conversations.map((element, index) => {
        return (
          <Card key={index} sx={{ flexGrow: 1, overflow: 'hidden' }}>
            <CardActionArea>
                  <Link to='/chatting' state={{
                    conversation: element.conversation, displayName: element.userDisplayName, userUid: userObj.uid, chattingUid: element.conversationUid
                  }}>
                  <Stack spacing={2} direction="column" sx={{ flexGrow: 1, overflow: 'hidden', p: 1 }}>
                    <div>chatting {element.userDisplayName}</div>
                    <Typography noWrap>{element?.message}</Typography>
                  </Stack>
                  </Link>
              {/* <Stack spacing={2} direction="row" sx={{ flexGrow: 1, overflow: 'hidden', p: 1, alignItems: 'center' }}>
                <Typography noWrap>{message}</Typography>
                <div className='flex flex-col'>
                <div>userName</div>
                <Typography noWrap>{message}</Typography>
                </div>
                <Avatar>W</Avatar>
                <Typography noWrap>{message}</Typography>
                </Stack> */}
            </CardActionArea>
          </Card>
        )
      })}
      {/* <Item sx={{ flexGrow: 1, overflow: 'hidden', my: 1, mx: 'auto', p: 2 }}>
        <Stack spacing={2} direction="row" sx={{ flexGrow: 1, overflow: 'hidden', my: 1, mx: 'auto', p: 2, alignItems: 'center' }}>
          <Stack>
            <Avatar>W</Avatar>
          </Stack>
          <Stack sx={{ minWidth: 0 }}>
            <Typography noWrap>{message}</Typography>
          </Stack>
        </Stack>
      </Item> */}
    </>
  );
}

export default ChattingStacks