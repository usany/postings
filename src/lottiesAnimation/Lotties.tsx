import { useState, useEffect } from 'react'
// import Lottie from 'react-lottie'
import Lottie from 'lottie-react'
import rain from 'src/assets/Animation.json'

function Lotties() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: rain,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };
    
    // useEffect(() => {
    //     const color = localStorage.getItem("theme");
    //     if (color === 'dark') {
    //         document.body.classList.add("dark-theme")
    //     } else {
    //         document.body.classList.remove("dark-theme")
    //     }
    // })
    return (
        // <Lottie options={defaultOptions} height={400} width={400} />
        <Lottie animationData={rain} />
    )
}

export default Lotties
