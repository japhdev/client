import React, { useState } from 'react'
import ScreenHeading from '../../utilities/ScreenHeading/ScreenHeading'
import ScrollService from '../../utilities/ScrollService'
import Animations from '../../utilities/Animations'
import './Resume.css'

export default function Resume(props) {
    const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);

    let fadeInScreenHandler = (screen) => {
        if (screen.fadeScreen !== props.id) return;
        Animations.animations.fadeInScreen(props.id);
    };
    const fadeInSubscription = ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

    const ResumeHeading = (props) => {
        return (
            <div className='resume-heading'>
                <div className='resume-main-heading'>
                    <div className='heading-bullet'>
                        <span>{props.heading ? props.heading : ''}</span>
                        {props.fromDate && props.toDate ? (
                            <div className='heading-date'>
                                {props.fromDate + "_" + props.toDate}
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div className='resume-sub-heading'>
                        <span>{props.subHeading ? props.subHeading : ''}</span>
                    </div>
                    <div className='resume-heading-description'>
                        <span>{props.description ? props.description : ''}</span>
                    </div>
                </div>
            </div>
        )
    };

    const resumeBullets = [
        { label: "Education", logoSrc: "education.svg" },
        { label: "Work History", logoSrc: "work-history.svg" },
        { label: "Programming Skills", logoSrc: "programming-skills.svg" },
        { label: "Projects", logoSrc: "projects.svg" },
        { label: "Interests", logoSrc: "interests.svg" },
    ];

    const programmingSkillsDetails = [
        { skill: "Python", ratingPercentage: 70 },
        { skill: "JavaScript", ratingPercentage: 60 },
        { skill: "React JS", ratingPercentage: 75 },
        { skill: "HTML", ratingPercentage: 70 },
        { skill: "CSS", ratingPercentage: 60 },
        { skill: "SQL", ratingPercentage: 50 },
    ];

    const projectsDetails = [
        {
            title: "Personal Porfolio Website",
            duration: { fromDate: "2025", toDate: "2026" },
            description: "A Personal Portfolio website to showcase all my details and projects at one place",
            subHeading: "Technologies Used: React JS, CSS, HTML, Bootstrap"
        },
        {
            title: "Schedule Manager",
            duration: { fromDate: "2023", toDate: "2024" },
            description: "Schedule Manager for better organization of staff check-ins and check-outs",
            subHeading: "Technologies Used: Swift, Data Core, FireBase"
        },
        {
            title: "Porfolio Beta",
            duration: { fromDate: "2024", toDate: "2025" },
            description: "Beta portfolio using pure HTML and pure CSS, with API requests to Figma",
            subHeading: "Technologies Used: Python, Flask, HTML, CSS"
        },
    ];

    const resumeDetails = [
        <div className='resume-screen-container' key="education">
            <ResumeHeading
                heading={"Universidad México Internacional"}
                subHeading={"SOFTWARE DEVELOPMENT ENGINEERING"}
                fromDate={"2021"}
                toDate={"2025"}
            />
            <ResumeHeading
                heading={"Preparatoria Oficial"}
                subHeading={"Official High School Studies"}
                fromDate={"2011"}
                toDate={"2013"}
            />
        </div>,

        <div className='resume-screen-container' key="work-experience">
            <ResumeHeading
                heading={"Coppel Company"}
                subHeading={"Provisional Advisor"}
                fromDate={"2019"}
                toDate={"2025"}
            />
            <div className='experience-description'>
                <span className='resume-description-text'>
                    Experience with Afore Systems
                </span>
            </div>

            <div className='experience-description'>
                <span className='resume-description-text'>
                    -Provided professional guidance within Afore processes.
                </span>
                <br />
                <span className='resume-description-text'>
                    -Managed the acquisition of the CONSAR key.
                </span>
                <br />
                <span className='resume-description-text'>
                    -Ensured compliance with regulatory and administrative procedures.
                </span>
            </div>
        </div>,

        <div className='resume-screen-container programming-skills-container' key="programming-skills">
            {programmingSkillsDetails.map((skill, index) => (
                <div className='skill-parent' key={index}>
                    <div className='heading-bullet'></div>
                    <span>{skill.skill}</span>
                    <div className='skill-percentage'>
                        <div style={{ width: skill.ratingPercentage + "%" }} className='active-percentage'></div>
                    </div>
                </div>
            ))}
        </div>,

        <div className='resume-screen-container' key="projects">
            {projectsDetails.map((projectsDetails, index) => (
                <ResumeHeading
                    key={index}
                    heading={projectsDetails.title}
                    subHeading={projectsDetails.subHeading}
                    description={projectsDetails.description}
                    fromDate={projectsDetails.duration.fromDate}
                    toDate={projectsDetails.duration.toDate}
                />
            ))}
        </div>,

        <div className='resume-screen-container' key="interest">
            <ResumeHeading
                heading='Teaching'
                description='Apart from being a tech enthusiast and a code writer, i also love to ...'
            />
            <ResumeHeading
                heading='Music'
                description='Listening to soothing music is something i can never...'
            />
            <ResumeHeading
                heading='Gaming'
                description='I like to challenge my reflexes a lot while competing ...'
            />
        </div>,
    ];

    const handleCarousal = (index) => {
        setSelectedBulletIndex(index);
    };

    const getBullets = () => {
        return resumeBullets.map((bullet, index) => (
            <div
                onClick={() => handleCarousal(index)}
                className={index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"}
                key={index}
            >
                <img className='bullet-logo'
                    src={require(`../../assets/Resume/${bullet.logoSrc}`)}
                    alt={bullet.label}
                />
                <span className='bullet-label'>{bullet.label}</span>
            </div>
        ));
    };

    const getResumeScreen = () => {
        return (
            <div className='resume-details-carousal'>
                {resumeDetails[selectedBulletIndex]}
            </div>
        );
    };

    return (
        <div className='resume-container screen-container' id={props.id || ""}>
            <div className='resume-content'>
                <ScreenHeading title={'Resume'} subHeading={'My Formal Bio Details'} />
                <div className='resume-card'>
                    <div className='resume-bullets'>
                        <div className='bullet-container'>
                            <div className='bullet-icons'></div>
                            <div className='bullets'>
                                {getBullets()}
                            </div>
                        </div>
                    </div>
                    <div className='resume-bullet-details'>
                        {getResumeScreen()}
                    </div>
                </div>
            </div>
        </div>
    );
}