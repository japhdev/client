import React from 'react'
import ScreenHeading from '../../utilities/ScreenHeading/ScreenHeading'
import ScrollService from '../../utilities/ScrollService'
import Animations from '../../utilities/Animations'

export default function AboutMe(props) {
    let fadeInScreenHandler = (screen) => {
        if (screen.fadeScreen !== props.id)
        return;
        Animations.animations.fadeInScreen(props.id);
    };

    const fadeInSubscription = ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler)
    return (
        <div className='about-me-container screen-container' id={props.id || ""}>
            <div className='about-me-parent'>
                <ScreenHeading title={'AboutMe'} subHeading={'Why Choose Me'} />
            </div>
        </div>
    );
}
