import { useState } from 'react'
import { auth, onSocialClick, dbservice } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Auth({ newAccount, setNewAccount }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      let data: object;
      if (newAccount.account) {
        data = await createUserWithEmailAndPassword(auth, email, password)
        
        await setDoc(doc(dbservice, 'members', `${data.user.uid}`), {
          uid: data.user.uid,
          displayName: data.user.uid,
          points: 0,
          round: newAccount.round
        })
        await updateProfile(data.user, {
          displayName: data.user.uid
        }).catch((error) => {
          console.log('error')
        })
        setNewAccount({
          ...newAccount,
          round: setNewAccount.round+1
        })
      } else {
        data = await signInWithEmailAndPassword(auth, email, password)
      }
      console.log(data)
      setNewAccount({
        ...newAccount,
        account: false
      })
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const onRound = (round) => {
    if (round === 0) {
      setNewAccount({
        ...newAccount,
        round: newAccount.round+1
      })
    } else if (round === 1) {
      setNewAccount({
        ...newAccount,
        round: newAccount.round-1
      })
    }
  }
  
  const toggleAccount = () => setNewAccount({
    ...newAccount,
    account: !newAccount.account
  })
  
  return (  
    <div>
      <form id='auth' className='p-5' onSubmit={onSubmit}>
        <div className='flex justify-center pb-2.5'>
          <TextField label="이메일" value={email} onChange={onChange} variant="outlined" name='email' type='email' fullWidth required />
        </div>
        <div className='flex justify-center pb-2.5'>
          <TextField label="비밀번호" value={password} onChange={onChange} variant="outlined" name='password' type='password' fullWidth required />
        </div>
        <div className='flex justify-center'>
          <Button variant='outlined' form='auth' type='submit'>{newAccount.account ? '회원가입' : '로그인'}</Button>
          <span>{error}</span>
        </div>
      </form>
      <div className='flex justify-center'>
        {newAccount.account && <Button variant='outlined' name='g' onClick={onSocialClick}>구글로 회원가입</Button>}
        {!newAccount.account && <Button variant='outlined' name='g' onClick={onSocialClick}>구글로 로그인</Button>}
        {newAccount.account && <Button variant='outlined' name='h' onClick={onSocialClick}>깃허브로 회원가입</Button>}
        {!newAccount.account && <Button variant='outlined' name='h' onClick={onSocialClick}>깃허브로 로그인</Button>}
        <Button variant='outlined' onClick={toggleAccount}>{newAccount.account ? '로그인' : '회원가입'}</Button>
      </div>
    </div>
  )
}

export default Auth
