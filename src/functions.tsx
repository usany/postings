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
import { oSubscriptionsinDB } from './baseApi/serverbase';
import { getDatabase, ref, child, push, update } from "firebase/database";

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// function fn
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
                actions: [
                    { action: 'confirm' , title: 'confirms' },
                    { action: 'cancel' , title: 'cancels' },
                ],
                // badge: './src/assets/pwa-512x512.png',
                // vibrate: [100, 50, 200]
            }
            // new Notification('User Choice ' + result, options)
            // console.log(navigator.serviceWorker.ready.then())
            if (!('serviceWorker' in navigator)) {
                return;
            }
            let reg
            navigator.serviceWorker.ready
            .then((swreg) => {
                reg = swreg
                return swreg.pushManager.getSubscription()
            })
            .then((sub) => {
                if (sub === null) {
                    navigator.serviceWorker.ready.then((swreg) => {
                        const vapidPublicKey = 'BN1j5eFuu33M3bLsot_xW0S-aMRunJHDLbcF3nGSRiAq2bGB3p77udEH-_WUN9qvdTo0egAHkyB0pzo4sOE7Ps0'
                        const convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey)
                        return (
                            swreg.pushManager
                            .subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: convertedVapidPublicKey
                            })
                            .then((newSub) => {
                                const filteredSub = JSON.parse(JSON.stringify(newSub))
                                const pushConfig = {
                                    endpoint: filteredSub.endpoint,
                                    keys: {
                                        p256dh: filteredSub.keys.p256dh,
                                        auth: filteredSub.keys.auth
                                    }
                                }
                                const newPostKey = push(child(oSubscriptionsinDB, 'subscriptions')).key
                                const updates = {};
                                updates['/subscriptions/' + newPostKey] = pushConfig;
                                // updates['/user-posts/' + newPostKey] = pushConfig;
                                return update(oSubscriptionsinDB, updates);
                            })
                        )
                    })
                } else {
                    console.log(sub)
                }
            })
            // .then((newSub) => {
            //     return fetch('https://remake-36fe0-default-rtdb.asia-southeast1.firebasedatabase.app/subscriptions.json',
            //         {
            //             method: 'POST',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //                 'Accept': 'application/json'
            //             },
            //             body: JSON.stringify(newSub)
            //         }
            //     )
            // })
            // .then((res) => {
            //     if (res.ok) {
            //         navigator.serviceWorker.ready.then((swreg) => {
            //             swreg.showNotification('Successfully subscribed', options)
            //         })
            //     }
            // })
            // .catch((err) => {
            //     console.log(err)
            // })
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then((swreg) => {
                    swreg.showNotification('Successfully subscribed', options)
                })
            }
        })
    }
//     Public Key:
// BO0zcRkW6yGAjpNscQzLc3sU7uoOlKlJeGthbLMQ7e2DNQHkZSS6F6SeCD3LuZtECGzLe5RF2GYj8TN4KVsSLvM

// Private Key:
// qDj76vw1eP62S7e7NlUNZgbyHeWgP4KSo5Saec0D0V4
// Public Key:
// BN1j5eFuu33M3bLsot_xW0S-aMRunJHDLbcF3nGSRiAq2bGB3p77udEH-_WUN9qvdTo0egAHkyB0pzo4sOE7Ps0

// Private Key:
// XLnp-p__B_AhGZJ4PdzDuZFqkYGrf_17-G6LxycHV68
    // const functions = require('firebase-functions')
    // const admin = require('firebase-admin')
    // const cors = require('cors')({origin: true})
    // const {onRequest} = require("firebase-functions/v2/https");
    // const {onDocumentCreated} = require("firebase-functions/v2/firestore");

    return (
        <button className='enablenotifications' onClick={askForNotificationPermission}>
            enable notification
        </button>
    )
}

export default AskForNotificationPermission