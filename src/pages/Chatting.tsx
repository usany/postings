import { useState, useEffect } from 'react'
import Message from 'src/pages/Message'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import { formGroupClasses } from '@mui/material';
import TextField from '@mui/material/TextField';
import {supabase} from 'src/baseApi/base';
// import styled from 'styled-components'

// const NavBtn = styled.button`
//   border: dashed;
// `
// const SignBtn = styled.div`
//   display: flex;
//   justify-content: center;
// `
function Contact({ displayName, setDisplayName, isLoggedIn, userObj, setUserObj, value, setValue, side, setSide, sideNavigation, setSideNavigation, check, setCheck, counter, setCounter, setBottomNavigation }) {
  const [message, setMessage] = useState('')
  // const [password, setPassword] = useState('')
  // const [newAccount, setNewAccount] = useState(false)
  // const [error, setError] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      let data: object;
      // if (newAccount.account) {
      //   data = await createUserWithEmailAndPassword(auth, email, password)
        
      //   await setDoc(doc(dbservice, 'members', `${data.user.uid}`), {
      //     uid: data.user.uid,
      //     displayName: data.user.uid,
      //     points: 0,
      //   })
      //   await updateProfile(data.user, {
      //     displayName: data.user.uid
      //   }).catch((error) => {
      //     console.log('error')
      //   })
      //   setNewAccount({
      //     ...newAccount,
      //     round: setNewAccount.round+1
      //   })
      // } else {
      //   data = await signInWithEmailAndPassword(auth, email, password)
      // }
      // console.log(data)
      setNewAccount({
        ...newAccount,
        account: false
      })
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
    setValue(0)
    signInWithEmail(email, password)
  }

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event
    setMessage(value)
  }
  return (  
    <div>
      <div className='flex text-2xl p-5'>
        신고하기
      </div>
      <div>
        <span>
          발신:
        </span>
      </div>
      <div>
        <span>  
          수신: 
        </span>
        </div>
      <form id='auth'>
        <div className='flex justify-center pt-5'>
          <TextField label='신고하기 제목' multiline value={message} onChange={onChange} variant="outlined" fullWidth autoFocus/>
        </div>
        <div className='flex justify-center pt-5'>
          <TextField label='신고하기 내용' multiline rows={5} maxRows={5} value={message} onChange={onChange} variant="outlined" fullWidth autoFocus/>
        </div>
        {/* <div className='flex justify-center'>
          <TextField label="비밀번호" value={password} onChange={onChange} variant="outlined" name='password' type='password' fullWidth />
        </div> */}
        <div className='flex flex-col justify-center pt-2.5'>
          {/* <Button variant='outlined' form='auth' type='submit'>{newAccount.account ? '회원가입' : '로그인'}</Button> */}
          <Button variant='outlined' form='auth' type='submit'>전송</Button>
          {/* <span>{error}</span> */}
        </div>
      </form>
    </div>
  )
}

export default Contact
