import { useState, useEffect } from 'react'
import Message from 'src/pages/Message'
import AvatarDialogs from 'src/muiComponents/AvatarDialogs'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
// import { formGroupClasses } from '@mui/material';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Checklist from '@mui/icons-material/Checklist'
// import styled from 'styled-components'
import BeachAccess from '@mui/icons-material/BeachAccess'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { blue } from '@mui/material/colors';

// const NavBtn = styled.button`
//   border: dashed;
// `
// const SignBtn = styled.div`
//   display: flex;
//   justify-content: center;
// `
function Profile({ profileColor, setProfileColor, isLoggedIn, userObj, setUserObj, value, setValue, side, setSide, sideNavigation, setSideNavigation, check, setCheck, counter, setCounter, bottomNavigation, setBottomNavigation, userUid }) {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [newAccount, setNewAccount] = useState(false)
  // const [error, setError] = useState('')
  const [borrowRegisteredMessage, setBorrowRegisteredMessage] = useState([])
  const [borrowMessage, setBorrowMessage] = useState([])
  const [lendRegisteredMessage, setLendRegisteredMessage] = useState([])
  const [lendMessage, setLendMessage] = useState([])
  const [newDisplayName, setNewDisplayName] = useState('')
  const [num, setNum] = useState(null)
  const [profileChangeConfirmed, setProfileChangeConfirmed] = useState(null)
  const [attachment, setAttachment] = useState('')
  const [changeProfile, setChangeProfile] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const {state} = useLocation()

  const onSubmit = async (event) => {
    event.preventDefault()
    if (newDisplayName === '') {
      alert('입력이 필요합니다')
    } else {
      const tmp = query(collection(dbservice, `members`))
      const querySnapshot = await getDocs(tmp);
      let profileConfirmed = true
      querySnapshot.forEach((doc) => {
        if (newDisplayName === doc.data().displayName) {
          alert('중복 확인이 필요합니다')
          profileConfirmed = false
        }
      });
      if (!profileConfirmed) {
        alert('중복 확인을 완료해 주세요')
      } else {
      const data = await doc(dbservice, `members/${userObj.uid}`)
      console.log(userObj.uid)
      await updateDoc(data, {displayName: newDisplayName});
      await updateProfile(userObj, {
        displayName: newDisplayName
      }).then(() => {
        // window.location.reload(true)
        alert('교체 완료')
      }).catch((error) => {
        console.log('error')
      })
      }
    }
  }
  
  const onChange = async (event) => {
    const {
      target: { value },
    } = event
    setNewDisplayName(value)
    const tmp = query(collection(dbservice, `members`))
    const querySnapshot = await getDocs(tmp);
    let profileConfirmed = true
    // console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      if (value === doc.data().displayName) {
        profileConfirmed = false
      }
    });
    if (profileConfirmed) {
      setProfileChangeConfirmed(true)
    } else {
      setProfileChangeConfirmed(false)
    }
  }
  
  const getBorrowRegisteredMessage = async () => {
    const msg = query(collection(dbservice, 'num'), where('creatorId', '==', state.element.uid), where('round', '==', 5), where('text.choose', '==', 1), orderBy('creatorClock', 'asc'))
    onSnapshot(msg, (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setBorrowRegisteredMessage(newArray);
    })
  }
  const getBorrowMessage = async () => {
    const msg = query(collection(dbservice, 'num'), where('connectedId', '==', state.element.uid), where('round', '==', 5), where('text.choose', '==', 2), orderBy('creatorClock', 'asc'))
    onSnapshot(msg, (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setBorrowMessage(newArray);
    })
  }
  const getLendRegisteredMessage = async () => {
    const msg = query(collection(dbservice, 'num'), where('creatorId', '==', state.element.uid), where('round', '==', 5), where('text.choose', '==', 2), orderBy('creatorClock', 'asc'))
    onSnapshot(msg, (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setLendRegisteredMessage(newArray);
    })
  }
  const getLendMessage = async () => {
    const msg = query(collection(dbservice, 'num'), where('connectedId', '==', state.element.uid), where('round', '==', 5), where('text.choose', '==', 1), orderBy('creatorClock', 'asc'))
    onSnapshot(msg, (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setLendMessage(newArray);
    })
  }

  useEffect(() => {
    getBorrowRegisteredMessage()
  }, [])
  useEffect(() => {
    getBorrowMessage()
  }, [])
  useEffect(() => {
    getLendRegisteredMessage()
  }, [])
  useEffect(() => {
    getLendMessage()
  , []})
  
  useEffect(() => {
    onSnapshot(query(doc(dbservice, `members/${userObj.uid}`)), (snapshot) => {
        const number = snapshot.data().points
        // console.log(number)
        setNum(number)
    })
  }, [])

  useEffect(() => {
    setNewDisplayName(
      userObj.displayName
    )
  }, [])

  useEffect(() => {
    setBottomNavigation(5)
  })

  const confirmProfile = async (newDisplayName) => {
    const tmp = query(collection(dbservice, `members`))
    const querySnapshot = await getDocs(tmp);
    let profileConfirmed = true
    querySnapshot.forEach((doc) => {
      if (newDisplayName === doc.data().displayName) {
        profileConfirmed = false
      }
    });
    if (profileConfirmed) {
      setProfileChangeConfirmed(true)
    } else {
      setProfileChangeConfirmed(false)
    }
    // })
    // console.log(
    //   get(query(collection(dbservice, `members`)))
    // )
    // Array(query(collection(dbservice, `members`))).map((member) => {
    //   console.log(member)
    // })
  }
  const onFileChange = (event) => {
    // console.log(event.target.files);
    const {
        target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
        console.log(finishedEvent);
        const {
            currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
    }
    console.log(theFile)
    reader.readAsDataURL(theFile)
  }
  const onClearAttachment = () => {
    setAttachment('')
    const fileInput = document.getElementById('img') || {value:null}
    fileInput.value = null
  }
  const handleClose = () => {
    setChangeProfile(false)
  }
  const user = state.element.displayName
  console.log(user)
  return (
    <div>
      {state.element.uid === userObj.uid ?
    <div>
      <div className='flex text-2xl p-5'>
          {userObj.displayName} 프로필
      </div>
      <div className={side}>
      <div className='flex justify-center pt-5'>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <button onClick={() => {
              setChangeProfile(true)
            }}>
              <div className='p-1 bg-transparent border-dashed border-2'>
                <BeachAccess />
              </div>
            </button>
          }
        >
          <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: profileColor }} src='./src'/>
        </Badge>
        {/* <label for='img'>label</label>
        <input id='img' type='file' onChange={onFileChange} hidden /> */}
        <AvatarDialogs userObj={userObj} profileColor={profileColor} setProfileColor={setProfileColor} changeProfile={changeProfile} handleClose={handleClose} />
      </div>
      {attachment &&
        <div className='flex justify-center'>
          <img src={attachment} width='50px' height='50px' alt='alt' />
          <button className='factoryClear' onClick={onClearAttachment}>Clear</button>
        </div>
      }
      <div className='flex justify-center'>제 유저 이름은 {userObj.displayName}</div>
      <form id='profile' onSubmit={onSubmit}>
        <div className='flex justify-center'>
          <div className='flex flex-col justify-center'>
            유저 이름 바꾸기:&emsp;
        {profileChangeConfirmed ? 
          <div className='flex justify-center'>
            <div>
              다행히 중복되지 않네요
            </div>
          </div>
          :
          <div className='flex justify-center'>
            <div>
              아쉽게도 중복되네요
            </div>
          </div>
        }
          </div>
          <div className='flex flex-col'>
            {/* <input className='form-control dark:bg-black border' placeholder='유저 이름' value={newDisplayName} type='text' onChange={onChange} /> */}
            <TextField placeholder='유저 이름' value={newDisplayName} type='text' onChange={onChange} />
            {profileChangeConfirmed ? 
                <Button variant='outlined' form='profile' type='submit'>유저 이름 바꾸기</Button>
            :
                <Button variant='outlined' form='profile' type='submit' disabled>유저 이름 바꾸기</Button>
            }
          </div>
        </div>
        <div className='flex justify-center'>follower: 0 following: 0</div>
        {/* {profileChangeConfirmed ? 
          <div className='flex justify-center'>
            <div>
              다행히 중복되지 않네요
            </div>
            <div>
              <Button variant='outlined' form='profile' type='submit'>유저 이름 바꾸기</Button>
            </div>
          </div>
          :
          <div className='flex flex-col justify-center'>
            <div className='flex justify-center'>
              아쉽게도 중복되네요
            </div>
            <div className='flex justify-center'>
              <Button variant='outlined' form='profile' type='submit' disabled>유저 이름 바꾸기</Button>
            </div>
          </div>
        } */}
        {/* <div className='flex justify-center'>
          <Button variant='outlined' form='profile' type='submit'>유저 이름 바꾸기</Button>
        </div> */}
      </form>
      {/* <div className='flex justify-center'>
        내 포인트: {num}
      </div> */}
      <div className='flex justify-center'>
        <Card
      >
        <CardActionArea 
          // onClick={() => setSpecific({
          //   msgObj: msgObj,
          //   isOwner: isOwner,
          //   num: num,
          //   points: points
          // })}
        >
          <Link 
            to='/postings/points'
            state={{
              user: user,
              points: num,
              // actions: 'completedLend', 
              lendRegisteredMessage: lendRegisteredMessage,
              lendMessage: lendMessage,
              borrowRegisteredMessage: borrowRegisteredMessage,
              borrowMessage: borrowMessage
            }}
          >
          <CardContent>
          <div>포인트</div>
          <div className='flex justify-center'>{num}</div>
          </CardContent>
          </Link>
        </CardActionArea>
      </Card>
        <Card
      >
        <CardActionArea
        >
          <Link 
            to='/postings/actions'
            state={{
              user: user,
              actions: 'completedLend', 
              lendRegisteredMessage: lendRegisteredMessage,
              lendMessage: lendMessage,
              borrowRegisteredMessage: borrowRegisteredMessage,
              borrowMessage: borrowMessage
            }}
          >
          <CardContent>
          <div>완료된 빌려주기</div>
          <div className='flex justify-center'>{lendMessage.length+lendRegisteredMessage.length}회</div>
          </CardContent>
          </Link>
        </CardActionArea>
      </Card>
        <Card
      >
        <CardActionArea
        >
          <Link 
            to='/postings/actions'
            state={{
              user: user,
              actions: 'completedBorrow', 
              lendRegisteredMessage: lendRegisteredMessage,
              lendMessage: lendMessage,
              borrowRegisteredMessage: borrowRegisteredMessage,
              borrowMessage: borrowMessage
            }}
          >
          <CardContent>
          <div>완료된 빌리기</div>
          <div className='flex justify-center'>{borrowRegisteredMessage.length+borrowMessage.length}회</div>
          </CardContent>
          </Link>
        </CardActionArea>
      </Card>
      </div>
      {/* <div className='flex justify-center'>
        최근 완료된 빌리기/빌려주기: {message.length+messages.length}
      </div>
      <div className='flex justify-center flex-wrap'>
        {message.map((msg) => {
          if (msg.round === 5) {
            return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} setValue={setValue} counter={counter} setCounter={setCounter}/>)
          }
        })}
      </div>
      <div className='flex justify-center flex-wrap'>
        {messages.map((msg) => {
          if (msg.round === 5) { 
            return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} setValue={setValue} counter={counter} setCounter={setCounter}/>)
          }
        })}
      </div> */}
      </div>
    </div>
    :
    <div>
      <div className='flex text-2xl p-5'>
        {state.element.displayName} 프로필
      </div>
      <div className={side}>
      <div className='flex justify-center pt-5'>
        <Avatar alt={state.element.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: state.element?.profileColor || blue[500] }} src='./src'/>
      </div>
      <div className='flex justify-center'>유저 이름: {state.element.displayName}</div>
      <div className='flex justify-center'>follower: 0 following: 0</div>
      <div className='flex justify-center'>
        <Button variant='outlined'>follow {state.element.displayName}</Button>
        <Button variant='outlined'>send message</Button>
      </div>
      <div className='flex justify-center'>
        <Card
      >
        <CardActionArea 
        >
          <Link 
            to='/postings/points'
            state={{
              user: user,
              points: num,
              // actions: 'completedLend', 
              lendRegisteredMessage: lendRegisteredMessage,
              lendMessage: lendMessage,
              borrowRegisteredMessage: borrowRegisteredMessage,
              borrowMessage: borrowMessage
            }}
          >
          <CardContent>
          <div>포인트</div>
          <div className='flex justify-center'>{state.element.points}</div>
          </CardContent>
          </Link>
        </CardActionArea>
      </Card>
        <Card
      >
        <CardActionArea 
        >
          <Link 
            to='/postings/actions'
            state={{
              user: user,
              actions: 'completedLend', 
              lendRegisteredMessage: lendRegisteredMessage,
              lendMessage: lendMessage,
              borrowRegisteredMessage: borrowRegisteredMessage,
              borrowMessage: borrowMessage
            }}
          >
            <CardContent>
              <div>완료된 빌려주기</div>
              <div className='flex justify-center'>{lendRegisteredMessage.length+lendMessage.length}회</div>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
        <Card
      >
        <CardActionArea
        >
          <Link 
            to='/postings/actions'
            state={{
              user: user,
              actions: 'completedBorrow', 
              lendRegisteredMessage: lendRegisteredMessage,
              lendMessage: lendMessage,
              borrowRegisteredMessage: borrowRegisteredMessage,
              borrowMessage: borrowMessage
            }}
          >
          <CardContent>
          <div>완료된 빌리기</div>
          <div className='flex justify-center'>{borrowRegisteredMessage.length+borrowMessage.length}회</div>
          </CardContent>
          </Link>
        </CardActionArea>
      </Card>
      </div>
      {/* <div className='flex justify-center'>
        최근 완료된 빌리기/빌려주기: {message.length+messages.length}
      </div>
      <div className='flex justify-center flex-wrap'>
        {message.map((msg) => {
          if (msg.round === 5) {
            return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} setValue={setValue} counter={counter} setCounter={setCounter}/>)
          }
        })}
      </div>
      <div className='flex justify-center flex-wrap'>
        {messages.map((msg) => {
          if (msg.round === 5) { 
            return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} setValue={setValue} counter={counter} setCounter={setCounter}/>)
          }
        })}
      </div> */}
      </div>
    </div>
    }
    </div>
  )
}

export default Profile
