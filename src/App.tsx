import { useEffect, useState } from 'react'
import Router from 'src/Router'
import Lotties from 'src/lottiesAnimation/Lotties'
import { auth } from 'src/baseApi/serverbase'
import 'src/global.css'

function App() {
  const [count, setCount] = useState<number>(0)
  const [init, setInit] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)
  const [newAccount, setNewAccount] = useState({account: false, round: 0})
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  return (
    <>
          {init ? <Router isLoggedIn={isLoggedIn} userObj={userObj} newAccount={newAccount} setNewAccount={setNewAccount}/> : <Lotties/>}
    </>
  )
}

export default App