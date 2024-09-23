import { useState } from 'react'
import { Link } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { auth, onSocialClick, dbservice } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import {supabase} from 'src/baseApi/base';

function SignUpDialogs({move, handleClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  
  async function signUpNewUser(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      // options: {
      //   emailRedirectTo: 'https://example.com/welcome',
      // },
    })
  }  
  const onSubmit = async (event) => {
    event.preventDefault()
    // signUpNewUser(email, password)
    const userIndex = (await supabase.from('practices').select('email')).data?.map((element) => element.email).indexOf(email)
    if (userIndex === -1) {
      await signUpNewUser(email, password)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      console.log(data)
      await supabase
      .from('practices')
      .upsert({ id: data.user?.id, username: email, email: email, points: 0 })
      handleClose()
    } else {
      setErrorMessage(true)
      console.log('error')
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
    setErrorMessage(false)
  }

    return (
        <Dialog fullWidth={true} open={move} onClose={handleClose}>
            <DialogContent>
              환영합니다
              <form id='signIn' className='pt-5' onSubmit={onSubmit}>
                  <div className='flex justify-center'>
                      <TextField label="이메일" value={email} onChange={onChange} variant="outlined" name='email' type='email' fullWidth required autoFocus/>
                  </div>
                  <div className='flex justify-center'>
                      <TextField label="비밀번호" value={password} onChange={onChange} variant="outlined" name='password' type='password' fullWidth required />
                  </div>
                  {errorMessage && 
                    <div>
                      이미 가입된 계정입니다
                    </div>
                  }
                  <div className='flex flex-col justify-center pt-2.5'>
                      <Button variant='outlined' form='signIn' type='submit'>회원가입</Button>
                      <span>{error}</span>
                  </div>
              </form>
              <Button variant='outlined' onClick={handleClose}>
                  닫기
              </Button>
            </DialogContent>
        </Dialog>
    )
}

export default SignUpDialogs
