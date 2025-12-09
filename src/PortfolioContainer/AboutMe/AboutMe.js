import React from 'react'
import ScreenHeading from '../../utilities/ScreenHeading/ScreenHeading'
import ScrollService from '../../utilities/ScrollService'
import Animations from '../../utilities/Animations'
import "./AboutMe.css"

export default function AboutMe(props) {
    let fadeInScreenHandler = (screen) => {
        if (screen.fadeScreen !== props.id)
            return;
        Animations.animations.fadeInScreen(props.id);
    };

    const fadeInSubscription = ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler)

    const SCREEN_CONSTANTS = {
        description: "Passionate about continuous learning and problem-solving. Currently building my career as a Software Development Engineer, eager to grow through new challenges and contribute with efficient, practical solutions in dynamic and improvement- driven environments.",
        highlights: {
            bullets: [
                "Software Developer",
                "Mobile App Developer (iOS)",
                "Database Architecture",
                "UI/UX Design"
            ],
            heading: "Here are a Few Highlights"
        }
    }

    const renderHighlights = ()=>{
        return(
            SCREEN_CONSTANTS.highlights.bullets.map((value, i)=>(
                <div className='highlights' key={i}>
                    <div className='highlights-blob'></div>
                    <span>{value}</span>
                </div>
            ))
        )
    }
    return (
        <div className='about-me-container screen-container' id={props.id || ""}>
            <div className='about-me-parent'>
                <ScreenHeading title={'AboutMe'} subHeading={'Why Choose Me'} />
                <div className='about-me-card'>
                    <div className='about-me-profile'></div>
                    <div className='about-me-details'>
                        <span className='about-me-description'>{SCREEN_CONSTANTS.description}</span>
                        <div className='about-me-highlights'>
                            <div className='highlight-heading'>
                                <span>{SCREEN_CONSTANTS.highlights.heading}</span>
                            </div>
                            {renderHighlights()}
                        </div>
                        <div className='about-me-options'>
                            <button className="btn primary-btn">
                            {""}
                            Contact Me{" "}
                        </button>
                        <a
                            href="CurriculumVitae.pdf"
                            download="Josue Alan Pablo Hernandez.pdf"
                        >
                            <button className="btn highlighted-btn">Get Resume</button>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
