import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'src/pages/Home'
import Profile from 'src/pages/Profile'
import Ranking from 'src/pages/Ranking'
import Specific from 'src/pages/Specific'
import WeatherView from 'src/navigate/WeatherView'
import Navigation from 'src/navigate/Navigation'
import Navigations from 'src/navigate/Navigations'
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
// import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import ToggleTabs from 'src/muiComponents/Tabs'
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Snackbars from 'src/muiComponents/Snackbars'
import {supabase} from 'src/baseApi/base';

const Header = ({ displayName, bottomNavigation, setBottomNavigation, scroll, setScroll, isLoggedIn, userObj, setUserObj, setValue, check, setCheck, setMode, prevScrollPos, value, profileColor }) => {
    const [username, setUsername] = useState('')

    useEffect(() => {
        const checkUsername = async () => {
          const values = (await supabase
            .from('practices')
            .select()
            .eq('id', userObj.id)).data?.map((element) => element.username)[0]
            setUsername(values)
        }
        if (userObj) {
          checkUsername()
        }
    }, [userObj])
    
    return (
        <div className='flex flex-row'>
                <div id='navigationSelectorOne' className='pt-1'>
                    <Navigation displayName={displayName} scroll={scroll} setScroll={setScroll} isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} setValue={setValue} check={check} setCheck={setCheck} setMode={setMode}/>
                    <div className='flex justify-between w-screen'>
                        <div className='px-5 pt-1'>
                            {userObj ?
                                <Avatar alt={username} sx={{ bgcolor: profileColor }} src='./src' onClick={() => {
                                    setCheck(!check)
                                    setScroll(prevScrollPos)
                                    // document.getElementsByClassName('location')[0].style.top = `-${prevScrollPos}px`
                                }} />
                                :
                                <Avatar sx={{ bgcolor: blue[500] }} onClick={() => {
                                    setCheck(!check)
                                    setScroll(prevScrollPos)
                                    // document.getElementsByClassName('location')[0].style.top = `-${prevScrollPos}px`
                                }} />
                            }
                        </div>
                        <div>
                    {isLoggedIn && bottomNavigation === 0 && 
                        <ToggleTabs valuing={value} setValuing={setValue}/>
                    }
                    {/* {isLoggedIn && value === 0 && 
                        <ToggleTabs num={1} valuing={value} setValuing={setValue}/>
                    } */}
                    {isLoggedIn && bottomNavigation === 2 && 
                        <ToggleTabs valuing={value} setValuing={setValue}/>
                    }
                    {/* {isLoggedIn && value === 2 && 
                        <ToggleTabs num={2} valuing={value} setValuing={setValue}/>
                    } */}
                    {!isLoggedIn && 
                        <div className='pt-5 min-w-36' onClick={() => setValue(1)}>로그인을 해 주세요</div>
                    }
                    </div>
                    <div>
                        <WeatherView />
                    </div>
                    </div>
                </div>
            {/* <div id='navigationSelectorTwo' className='w-full h-15'></div> */}
        </div>
    )
}

export default Header