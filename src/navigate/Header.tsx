import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import WeatherView from 'src/navigate/WeatherView'
import Navigation from 'src/navigate/Navigation'
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import ToggleTabs from 'src/muiComponents/ToggleTabs'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
<<<<<<< HEAD
import { useSideNavigationStore, useBottomNavigationStore, useAvatarColorStore } from 'src/store'
=======
import { sideNavigationStore, bottomNavigationStore, profileColorStore, toggleTabsStore } from 'src/store'
>>>>>>> a1b714eec3182d5c11ed020a7ea2666da3a5705b

const Header = ({ setScroll, userObj, prevScrollPos, storage }: 
    {
        setScroll: (newState: number) => void,
        userObj: {uid: string, displayName: string} | null,
        prevScrollPos: number,
        storage: {}
    }
) => {
    const [profile, setProfile] = useState(null)
<<<<<<< HEAD
    const bottomNavigation = useBottomNavigationStore((state) => state.bottomNavigation)
    const profileColor = useAvatarColorStore((state) => state.profileColor)
    const handleBottomNavigation = useBottomNavigationStore((state) => state.handleBottomNavigation)
    const handleSideNavigation = useSideNavigationStore((state) => state.handleSideNavigation)
=======
    const bottomNavigation = bottomNavigationStore((state) => state.bottomNavigation)
    const profileColor = profileColorStore((state) => state.profileColor)
    const handleBottomNavigation = bottomNavigationStore((state) => state.handleBottomNavigation)
    const handleSideNavigation = sideNavigationStore((state) => state.handleSideNavigation)
    const toggleTabs = toggleTabsStore((state) => state.toggleTabs)
    const handleToggleTabs = toggleTabsStore((state) => state.handleToggleTabs)
>>>>>>> a1b714eec3182d5c11ed020a7ea2666da3a5705b
    
    useLayoutEffect(() => {
        getDownloadURL(ref(storage, 'screen.jpg'))
        .then((url) => {
            setProfile(url)
        })
        .catch((error) => {
            console.log(error)
        });
        setProfile(null)
    })
    
    return (
        <div className='flex flex-row'>
                <div id='navigationSelectorOne' className='pt-1'>
                    <Navigation setScroll={(newState: number) => setScroll(newState)} userObj={userObj} handleSideNavigation={handleSideNavigation} />
                    <div className='flex justify-between w-screen'>
                        <div className='px-5 pt-1'>
                            {userObj ?
                                <Avatar alt={userObj.displayName} sx={{ bgcolor: profileColor }} src='./src' onClick={() => {
                                    // setCheck(!check)
                                    setScroll(prevScrollPos)
                                    handleSideNavigation()
                                }} />
                                :
                                <Avatar sx={{ bgcolor: blue[500] }} onClick={() => {
                                    // setCheck(!check)
                                    setScroll(prevScrollPos)
                                    handleSideNavigation()
                                }} />
                            }
                        </div>
                        {/* <div>
                            <img src={profile}/>
                        </div> */}
                        <div>
                            {userObj && bottomNavigation === 0 && 
                                <ToggleTabs />
                            }
                            {userObj && bottomNavigation === 2 && 
                                <ToggleTabs />
                            }
                            {!userObj && 
                                <div className='pt-5 min-w-36' onClick={() => handleBottomNavigation(1)}>로그인을 해 주세요</div>
                            }
                        </div>
                        <div>
                            <WeatherView />
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Header