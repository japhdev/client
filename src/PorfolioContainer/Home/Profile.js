import React from "react";

export default function Profile() {
    return (
        <div className="profile-container">
            <div className="profile-parent">
                <div className="profile-details">
                    <div className="colz">
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

                    <div className="profile-details-name">
                        <span className="primary-text">
                            {""}
                            Hello, I'M <span className="highlighted-text">JAPH</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
