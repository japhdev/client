import React, { useState } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import { ReactTyped } from "react-typed";
import "./ContactMe.css";
import axios from 'axios';
import {toast} from 'react-toastify';

export default function ContactMe(props) {
    let fadeInScreenHandler = (screen) => {
        if (screen.fadeInScreen !== props.id) return;
        Animations.animations.fadeInScreen(props.id);
    };

    const fadeInSubscription = ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [banner, setBanner] = useState("");
    const [bool, setBool] = useState(false);

    const handleName = (e) => {
        setName(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleMessage = (e) => {
        setMessage(e.target.value);
    };

    console.log(name);

    const submitForm = async(e) => {
        e.preventDefault();
        try{
            let data = {
            name,
            email,
            message,
        }
        setBool(true);
        const res = await axios.post(`\contact`, data);
        if(name.length === 0 || email.length === 0 || message.length === 0) {
            setBanner(res.data.msg);
            toast.error(res.data.msg);
            setBool (false);

        }else if(res.status === 200){
            setBanner(res.data.msg);
            toast.success(res.data.msg);
            setBool (false);
        }
            
        }catch (error) {
            console.log(error);
        }
        
        
    };


    return (
        <div className="main-container" id={props.id || ""}>
            <ScreenHeading subHeading={"Let's Keep In Touch"} title={"Contact Me"} />
            <div className="central-form">
                <div className="col">
                    <h2 className="title">
                        <ReactTyped
                            strings={["Get In Touch"]}
                            typeSpeed={50}
                            backSpeed={50}
                            backDelay={6000}
                            loop
                        />
                    </h2>

                    <div className="social-links">
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
                <div className="back-form">
                    <div className="img-back">
                        <h4>Send Your Message Here!</h4>
                    </div>

                        <form onSubmit={submitForm}>
                            <p >{banner}</p>

                            <div className="form-group">
                                <label htmlFor="name">Name *</label>
                                <input type="text"
                                onChange={handleName}
                                value={name}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    
                                    onChange={handleEmail}
                                    value={email}
                                />
                                
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    type="text"
                                    placeholder="Tell me about your project or inquiry..."
                                    onChange={handleMessage}
                                value={message}
                                />
                            </div>

                            <div className="send-btn">
                                <button type="submit">
                                    Send Message <i className="fa fa-paper-plane"/>
                                    {bool?(<b className="load">
                                        <p>load</p>
                                    </b>):("")}
                                </button>
                            </div>
                        </form>
                    
                </div>
            </div>
        </div>
    );
}