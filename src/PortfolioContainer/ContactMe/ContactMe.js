import React, { useState } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import { ReactTyped } from "react-typed";
import "./ContactMe.css";
import axios from 'axios';
import { toast } from 'react-toastify';

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
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const contactInfo = {
        phone: "+52 55 1234 5678",
        email: "alanpablo1835@gmail.com",
        location: "México",
    };

    const handleName = (e) => {
        setName(e.target.value);
        if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
    };

    const handleMessage = (e) => {
        setMessage(e.target.value);
        if (errors.message) setErrors(prev => ({ ...prev, message: "" }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!name.trim()) newErrors.name = "Name is required";
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";
        if (!message.trim()) newErrors.message = "Message is required";
        else if (message.trim().length < 10) newErrors.message = "Message should be at least 10 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;
        
        setLoading(true);
        
        try {
            let data = {
                name,
                email,
                message
            };
            
            const res = await axios.post(`/contact`, data);
            if (name.length === 0 || email.length === 0 || message.length === 0) {
                setBanner(res.data.msg);
                toast.error(res.data.msg);
            } else if (res.status === 200) {
                setBanner(res.data.msg);
                toast.success(res.data.msg);
            }
            
        } catch (error) {
            console.log(error);
            setBanner("Error sending message. Please try again.");
            toast.error("Error sending message. Please try again.");
        } finally {
            setLoading(false);
            
            if (!loading) {
                setIsSubmitted(true);
                
                setTimeout(() => {
                    setName("");
                    setEmail("");
                    setMessage("");
                    setIsSubmitted(false);
                    setBanner("");
                }, 3000);
            }
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
                    <div className="contact-info">
                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fa fa-phone"></i>
                            </div>
                            <div className="contact-details">
                                <h4>Phone</h4>
                                <div href={`tel:${contactInfo.phone}`} className="contact-details">
                                    {contactInfo.phone}
                                </div>
                            </div>
                        </div>                                                                                                                                                                                                                                                                                                                                                                                                      

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="fa fa-envelope"></i>
                                </div>
                                <div className="contact-details">
                                    <h4>Email</h4>
                                    <div className="contact-details">
                                        {contactInfo.email}
                                    </div>
                                </div>
                            </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fa fa-map-marker"></i>
                            </div>
                            <div className="contact-details">
                                <h4>Location</h4>
                                <div className="contact-details">
                                    {contactInfo.location}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="social-links">
                        <a href="https://github.com/japhdev" target="_blank" rel="noopener noreferrer" title="GitHub">
                            <i className="fa fa-github"></i>
                        </a>
                        <a href={`mailto:${contactInfo.email}`} title="Email">
                            <i className="fa fa-envelope"></i>
                        </a>
                        <a href="https://linkedin.com/in/tuperfil" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                            <i className="fa fa-linkedin"></i>
                        </a>
                        <a href="https://twitter.com/tuperfil" target="_blank" rel="noopener noreferrer" title="Twitter">
                            <i className="fa fa-twitter"></i>
                        </a>
                    </div>
                </div>
                <div className="back-form">
                    <div className="img-back">
                        <h4>Send Your Message Here!</h4>
                    </div>

                    {isSubmitted ? (
                        <div className="success-message">
                            <h3>🎉 Message Sent!</h3>
                            <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                        </div>
                    ) : (
                        <form onSubmit={submitForm}>
                            {banner && <p className="success-banner">{banner}</p>}

                            <div className="form-group">
                                <label htmlFor="name">Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    onChange={handleName}
                                    value={name}
                                    className={errors.name ? "error" : ""}
                                    placeholder="Your name"
                                />
                                {errors.name && <span className="error-message">{errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    onChange={handleEmail}
                                    value={email}
                                    className={errors.email ? "error" : ""}
                                    placeholder="your.email@example.com"
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    onChange={handleMessage}
                                    value={message}
                                    className={errors.message ? "error" : ""}
                                    placeholder="Tell me about your project or inquiry..."
                                    rows="5"
                                />
                                {errors.message && <span className="error-message">{errors.message}</span>}
                            </div>

                            <div className="send-btn">
                                <button
                                    type="submit"
                                    className={loading ? "loading" : ""}
                                    disabled={loading}
                                >
                                    {loading ? "Sending..." : "Send Message"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}