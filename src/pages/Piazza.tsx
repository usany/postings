import { useRef, useEffect, useState, useMemo } from "react";
import "./Chatting.css";
import { io } from "socket.io-client";
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { Link, useLocation } from 'react-router-dom'
import PiazzaDialogs from 'src/muiComponents/PiazzaDialogs'
import PiazzaSwitch from 'src/muiComponents/PiazzaSwitch'
import { webSocket, onClick } from 'src/webSocket.tsx'
// import Switch, { SwitchProps } from '@mui/material/Switch';
// import { styled } from '@mui/material/styles';

// const webSocket = io("http://localhost:5000");
function Piazza({ userObj, setBottomNavigation, piazzaSwitch, newMessage, setNewMessage }) {
  const messagesEndRef = useRef(null);
  const [userId, setUserId] = useState("");
  // const [isLogin, setIsLogin] = useState(true);
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [changeMessage, setChangeMessage] = useState(true)
  const [privateTarget, setPrivateTarget] = useState("");
  // 1
  // const [roomNumber, setRoomNumber] = useState("1");
  const [user, setUser] = useState(null)
  const [selectUser, setSelectUser] = useState(false)
  const [stage, setStage] = useState(false)
  const [piazzaCheck, setPiazzaCheck] = useState(window.localStorage.getItem('piazza'))
  
  useEffect(() => {
    if (!webSocket) return;
    function sMessageCallback(message) {
      const { msg, userUid, id, target, messageClock, messageClockNumber, conversation } = message;
      console.log(msg)
      setMsgList((prev) => [
        ...prev,
        {
          msg: msg,
          type: target ? "private" : "other",
          userUid: userUid,
          id: id,
          messageClock: messageClock,
          messageClockNumber: messageClockNumber,
          conversation: null
        },
        // { msg: message, type: "me", userUid: userObj.uid, id: userObj.displayName, messageClock: messageClock }
      ]);
      setNewMessage(true)
    }
    webSocket.on("sMessagePiazza", sMessageCallback);
    return () => {
      webSocket.off("sMessagePiazza", sMessageCallback);
    };
  }, []);

  useEffect(() => {
    if (!webSocket) return;
    function sLoginCallback(msg) {
      setMsgList((prev) => [
        ...prev,
        {
          msg: `${msg} joins the chat`,
          type: "welcome",
          id: "",
        },
      ]);
    }
    webSocket.on("sLogin", sLoginCallback);
    return () => {
      webSocket.off("sLogin", sLoginCallback);
    };
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [msgList]);
  useEffect(() => {
    setBottomNavigation(5)
  })
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 2
  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   webSocket.emit("login", { userId: userId, roomNumber: roomNumber });
  //   setIsLogin(true);
  // };
  // const onChangeUserIdHandler = (e) => {
  //   setUserId(e.target.value);
  // };
  const onSendSubmitHandler = (e) => {
    e.preventDefault();
    const message = msg
    const userUid = userObj.uid
    const userName = userObj.displayName
    const messageClockNumber = Date.now()
    const messageClock = new Date().toString()
    const sendData = {
      msg: message,
      userUid: userUid,
      id: userName,
      messageClockNumber: messageClockNumber,
      messageClock: messageClock,
      target: privateTarget,
      conversation: null
      // { msg: message, type: "me", userUid: userObj.uid, id: userObj.displayName, messageClock: messageClock }
    };
    // const year = new Date().toString()
    // console.log(year)
    if (sendData && message) {
      webSocket.emit("message", sendData);
      // const { data, uid, id, target } = sendData;
      // setMsgList((prev) => [
      //   ...prev,
      //   {
      //     msg: data,
      //     type: target ? "private" : "other",
      //     id: id,
      //   },
      // ]);
      onForm()
    }
    setMsg("");
    // if (msg) {
    //   setMsgList((prev) => [...prev, { msg: msg, type: "me", id: userObj.displayName }]);
    //   if (!state.conversation) {
    //     onForm()
    //   } else {
    //     onFormConversation()
    //   }
    //   onFormConversation()
    // }
  };
  const onChangeMsgHandler = (e) => {
    setMsg(e.target.value);
  };
  const onSetPrivateTarget = async (userUid) => {
    const userRef = doc(dbservice, `members/${userUid}`)
    const userDoc = await getDoc(userRef)
    const userElement = userDoc.data()
    setUser(userElement)
    setSelectUser(true)
    // setUser(userDoc)
    // const { id } = e.target.dataset;
    // setPrivateTarget((prev) => (prev === id ? "" : id));
  };
  const handleClose = () => {
    setSelectUser(false)
  }
  // 3
  // const onRoomChangeHandler = (e) => {
  //   setRoomNumber(e.target.value);
  // };
  // const onSubmitMessage = async () => {
  //   try {
  //     const newMessage = await addDoc(collection(dbservice, 'violations'), {
  //       userUid: userObj.id,
  //       userName: displayName,
  //       messageTitle: messageTitle,
  //       message: message
  //     })
  //     setMessageTitle('')
  //     setMessage('')
  //     setChange(true)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const onForm = async () => {
    try {
      const message = msg
      const userUid = userObj.uid
      const userName = userObj.displayName
      const messageClock = new Date().toString()
      const messageClockNumber = Date.now()
      if (message){
        await addDoc(collection(dbservice, 'chats_group'), {
          userUid: userUid,
          userName: userName,
          message: message,
          messageClock: messageClock,
          messageClockNumber: messageClockNumber 
        })
        setMsgList((prev) => [...prev, { msg: message, type: "me", userUid: userObj.uid, id: userObj.displayName, messageClock: messageClock, conversation: null }]);
      }
    } catch (error) {
      console.log(error)
    }
  }
  // const onFormConversation = async () => {
  //   const message = msg
  //   try {
  //     const userUid = userObj.uid
  //     const userName = userObj.displayName
  //     const messageClock = Date.now()
  //     const newMessage = await addDoc(collection(dbservice, `chats_${state.conversation}`), {
  //       userUid: userUid,
  //       userName: userName,
  //       message: message,
  //       messageClock: messageClock
  //     })
  //     setMsgList((prev) => [...prev, { msg: message, type: "me", userUid: userObj.uid, id: userObj.displayName, messageClock: messageClock }]);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  useEffect(() => {
    const messageList = async () => {
      const messagesArray = []
      const messageRef = collection(dbservice, 'chats_group')
      const messagesCollection = query(messageRef, orderBy('messageClockNumber'))
      const messages = await getDocs(messagesCollection);
      messages.forEach((doc) => {
        const message = doc.data().message
        const userUid = doc.data().userUid
        const userName = doc.data().userName
        const messageClock = doc.data().messageClock
        const messageClockNumber = doc.data().messageClockNumber
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        messagesArray.push({ msg: message, type: "me", userUid: userUid, id: userName, messageClockNumber: messageClockNumber, messageClock: messageClock, conversation: null })
        setMsgList(messagesArray);
        // setMsgList((prev) => [...prev, { msg: message, type: "me", userUid: userUid, id: userName, messageClock: messageClock }]);
      });
    }
    if (changeMessage) { 
      messageList()
      setChangeMessage(false)
      // setNewMessage(false)
      // if (!state.conversation) {
      //   messageList()
      // } else {
      //   messageListMembers(state.conversation)
      // }
    }
      // onSnapshot(query(doc(dbservice, 'groups')), (snapshot) => {
        //     const number = snapshot.data().points
        //     setNum(number)
    //   }
    // )
  }, [changeMessage])
  // useEffect(() => {
  //   if (msgObj.connectedId !== null) {
  //     onSnapshot(query(doc(dbservice, `members/${msgObj.connectedId}`)), (snapshot) => {
  //       const element = snapshot.data().points
  //       setPoints(element)
  //     })
  //   }
  // })
  // console.log(piazzaSwitch.current)
  const onClick = (piazzaSwitch) => {
    if (piazzaSwitch.current === 'true') {
      window.localStorage.setItem('piazza', 'false')
      // setPiazzaSwitch('false')
      piazzaSwitch.current = 'false'
      // setPiazzaCheck('false')
      setStage(false)
    } else {
      window.localStorage.setItem('piazza', 'true')
      // setPiazzaSwitch('true'
      piazzaSwitch.current = 'true'
      // setPiazzaCheck('true')
      setStage(true)
    }
    console.log(piazzaSwitch.current)
    // if (colors === 'light') {
    //     setColors('dark')
    //     setMode('dark')
    //     localStorage.setItem("theme", 'dark');
    // } else {
    //     setColors('light')
    //     setMode('light')
    //     localStorage.setItem("theme", 'light');
    // }
  }
  // useEffect(() => {
  //   if (piazzaCheck === 'true') {
  //     setPiazzaSwitch('true')
  //   } else {
  //     setPiazzaSwitch('false')
  //   }
  // }, [piazzaCheck])
  // console.log(piazzaCheck)
  // console.log(piazzaSwitch)
  // console.log(piazzaSwitch)
  
  return (
    <div>
      <div className='flex text-2xl p-5'>
        <div className='w-screen'>
          단체 대화
        </div>
        <div className='flex w-2/3 pt-1 justify-end'>
          <PiazzaSwitch piazzaSwitch={piazzaSwitch} onClick={() => onClick(piazzaSwitch)} />
          {/* <PiazzaSwitch onClick={() => onClick(piazzaSwitch, setPiazzaSwitch)} /> */}
          {/* switch */}
        </div>
      </div>
    <div className="app-container">
      <div className="wrap">
      {/* {!state.conversation ? */}
          <div className="chat-box">
            {/* <h3>
              단체 대화
            </h3> */}
            <ul className="chat">
              {msgList.map((v, i) => {
                if (v.type === "welcome") {
                  return (
                    <li className="welcome">
                    <div className="line" />
                    <div>{v.msg}</div>
                    <div className="line" />
                  </li>
                  )
                } else {
                  let userDirection
                  if (v.userUid === userObj.uid) {
                    userDirection = 'me'
                  } else {
                    userDirection = 'other'
                  }
                  return (
                      <li
                        className={userDirection}
                        key={`${i}_li`}
                        name={v.id}
                        data-id={v.id}
                        onClick={() => onSetPrivateTarget(v.userUid)}
                      >
                        <div
                          className={
                            v.id === privateTarget ? "private-user" : "userId"
                          }
                          data-id={v.id}
                          name={v.id}
                        >
                          {v.id}
                        </div>
                        {v.userUid !== userObj.uid ? 
                        <div className='flex justify-start'>
                        <div className={'other'} data-id={v.id} name={v.id}>
                          {v.msg}
                        </div>
                        <div data-id={v.id} name={v.id}>
                          {v.messageClock}
                        </div>
                        </div>
                        :
                        <div className='flex justify-end'>
                        <div data-id={v.id} name={v.id}>
                          {v.messageClock}
                        </div>
                        <div className={'me'} data-id={v.id} name={v.id}>
                          {v.msg}
                        </div>
                        </div>
                        }
                      </li>
                  )
                }
                  }
                )
              }
              <li ref={messagesEndRef} />
            </ul>
            <form className="send-form" onSubmit={onSendSubmitHandler}>
              {/* {privateTarget && (
                <div className="private-target">{privateTarget}</div>
              )} */}
              <input
                placeholder="메세지를 작성해 주세요"
                onChange={onChangeMsgHandler}
                value={msg}
                autoFocus
              />
              <button type="submit">전송</button>
            </form>
          </div>
          <PiazzaDialogs selectUser={selectUser} user={user} handleClose={handleClose} userObj={userObj} setMsgList={setMsgList} setChangeMessage={setChangeMessage}/>
        {/* {isLogin ? (
        ) : (
          <div className="login-box">
            <div className="login-title">
              <div>IOChat</div>
            </div>
            <form className="login-form" onSubmit={onSubmitHandler}>
              <select onChange={onRoomChangeHandler}>
                <option value="1">Room 1</option>
                <option value="2">Room 2</option>
              </select>
              <input
                placeholder="Enter your ID"
                onChange={onChangeUserIdHandler}
                value={userId}
              />
              <button type="submit">Login</button>
            </form>
          </div>
        )} */}
      </div>
    </div>
    </div>
  );
}

export default Piazza;
