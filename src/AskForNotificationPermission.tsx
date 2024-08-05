import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'src/pages/Home'
import Profile from 'src/pages/Profile'
import Ranking from 'src/pages/Ranking'
import Specific from 'src/pages/Specific'
import Navigation from 'src/navigate/Navigation'
import Navigations from 'src/navigate/Navigations'
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import ToggleTabs from 'src/muiComponents/Tabs'
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Snackbars from 'src/muiComponents/Snackbars'


const AskForNotificationPermission = () => {
    const enableNotificationsButtons = document.querySelectorAll('.enablenotifications')
    // const onClick = () => {
        window.addEventListener('beforeinstallprompt', () => {
            if ('Notification' in window && 'serviceWorker' in navigator) {
                for (let i = 0; i < enableNotificationsButtons.length; i++) {
                    enableNotificationsButtons[0].style.color = 'blue';
                    enableNotificationsButtons[i].style.display = 'inline-block';
                    enableNotificationsButtons[i].addEventListener('click',
                        askForNotificationPermission
                    )
                }
            }
        })
    // }
    const askForNotificationPermission = () => {
        Notification.requestPermission((result) => {
            // alert('User Choice' + result)
            const options = {
                body: 'You successfully subscribed to our Notification service',
                icon: './src/assets/pwa-512x512.png',
                image: './src/assets/pwa-512x512.png',
                // actions: [
                //     { action: 'confirm' , title: 'confirm' }
                // ],
                // badge: './src/assets/pwa-512x512.png',
                // vibrate: [100, 50, 200]
            }
            new Notification('User Choice ' + result, options)
            
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready
                .then((swreg) => {
                    swreg.showNotification('Successfully subscribed')
                })
            }
        })
    }

    return (
        <button className='enablenotifications' onClick={askForNotificationPermission}>
            enable notifications
        </button>
    )
}

export default AskForNotificationPermission