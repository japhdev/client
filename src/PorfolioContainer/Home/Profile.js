import React from "react";
import { ReactTyped } from "react-typed";
import './Profile.css'

export default function Profile() {
    return (
        <div className="profile-container">
            <div className="profile-parent">
                <div className="profile-details">
                    <div className="colz">
                        <div className="colz-icon">
                            <a href="https://github.com/japhdev">
                                <i className="fa fa-github"></i>
                            </a>
                            <a href="#">
                                <i className="fa fa-google"></i>
                            </a>
                            <a href="#">
                                <i className="fa fa-instagram"></i>
                            </a>
                            <a href="#">
                                <i className="fa fa-twitter"></i>
                            </a>
                        </div>
                    </div>

                    <div className="profile-details-name">
                        <span className="primary-text">
                            {""}
                            Hello, I'M <span className="highlighted-text">JAPH</span>
                        </span>
                    </div>
                    <div className="profile-details-role">
                        <span className="primary-text">
                            {""}
                            <h1>
                                {""}
                                <ReactTyped
                                    strings={[
                                        "Software Engineer",
                                        "Backend Developer",
                                        "Web Developer",
                                        "Mobile Developer",
                                    ]}
                                    typeSpeed={50}
                                    backSpeed={50}
                                    backDelay={3000}
                                    loop
                                />
                            </h1>
                            <span className="profile-role-tagline">
                                Building the future, one idea at a time.
                            </span>
                        </span>
                    </div>
                    <div className="profile-options">
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
                <div className="profile-picture">
                    <div className="profile-picture-background"></div>
                </div>
            </div>
        </div>
    );
}
