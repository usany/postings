import { useEffect, useState } from 'react'
import Router from 'src/Router'
import Lotties from 'src/lottiesAnimation/Lotties'
import { auth } from 'src/baseApi/serverbase'
import 'src/global.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [count, setCount] = useState<number>(0)
  const [init, setInit] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)
  const [newAccount, setNewAccount] = useState({account: false, round: 0})
  const [mode, setMode] = useState(localStorage.getItem('theme'))

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
  // useEffect(() => {
  //   const color = localStorage.getItem("theme");
  //   if (color === 'dark') {
  //       document.documentElement.classList.add("dark-theme")
  //   } else {
  //       document.documentElement.classList.remove("dark-theme")
  //   }
  // })
  return (
    <>
      <ThemeProvider theme={
        mode !== 'dark' ? lightTheme : darkTheme 
      }>
        {init ? <Router isLoggedIn={isLoggedIn} userObj={userObj} newAccount={newAccount} setNewAccount={setNewAccount} setMode={setMode}/> : <Lotties/>}
      </ThemeProvider>
    </>
  )
}

export default App