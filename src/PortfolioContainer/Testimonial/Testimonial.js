import React from 'react'
import OwlCarousel from 'react-owl-carousel'
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import ScreenHeading from '../../utilities/ScreenHeading/ScreenHeading'
import ScrollService from '../../utilities/ScrollService'
import Animations from '../../utilities/Animations'


export default function Testimonial(props) {
    let fadeInScreenHandler = (screen) => {
            if (screen.fadeScreen !== props.id)
                return;
            Animations.animations.fadeInScreen(props.id);
        };
    
        const fadeInSubscription = ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);
    
    return (
        <div>
            <ScreenHeading
            title={'Testimonial'}
            subHeading={'What My Client SAy About Me'}
            />
            <section className='testimonial-section' id={props.id || ""}>

            </section>
        
        </div>
    )
    }
