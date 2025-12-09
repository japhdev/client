import React, { useState } from 'react'
import { TOTAL_SCREENS, GET_SCREEN_INDEX } from '../../../utilities/commonUtils'
import ScrollService from '../../../utilities/ScrollService'
import { faBars } from '@fortawesome/react-fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Header.css'

export default function Header() {
    const [selectedScreen, setSelectedScreen] = useState(0)
    const [showHeaderOptions, setShowHeaderOptions] = useState(false)

    const updateCurrentScreen = (currentScreen) => {
        if (!currentScreen || !currentScreen.screenInView)
            return;
        let screenIndex = GET_SCREEN_INDEX(currentScreen.screenInView)
        if (screenIndex < 0)
            return
    }
    let currentScreenSubscription = ScrollService.currentScreenBroadCaster.subscribe(updateCurrentScreen)

    const getHeaderOptions = ()=>{
        return(
            TOTAL_SCREENS.map((screen, i)=>(
                <div key={screen.screen_name} className={getHeaderOptionsClass(i)}
                onClick={() => switchScreen(i, screen)}>
                    <span>{screen.screen_name}</span>
                </div>
            ))
        )
    }

    
    return (
        <div>

        </div>
    )
}
