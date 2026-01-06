import React, { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./Certifications.css";

const certificates = [
    {
        id: 1,
        title: "Introducción a los negocios",
        subtitle: "Tutor junior",
        image: "img/certificate/intro_1.jpg",
        pdfUrl: "pdf/intro_1.pdf"
    },
    {
        id: 2,
        title: "Python Programming Fundamentals",
        subtitle: "Microsoft",
        image: "img/certificate/Coursera IRJTHYZ0ZS9I_page-0001.jpg",
        pdfUrl: "pdf/Coursera_IRJTHYZ0ZS9I.pdf"
    },
    {
        id: 3,
        title: "Python Santander Open Academy",
        subtitle: "Santander Open Academy",
        image: "img/certificate/Copia de Certificado_Pyhon_Santander_page-0001.jpg",
        pdfUrl: "pdf/Copia de Certificado_Pyhon_Santander_page-0001.pdf"
    },
    {
        id: 4,
        title: "DS4B Analista de Datos",
        subtitle: "Primera Experiencia",
        image: "img/certificate/certificate-of-completion-for-tu-primera-experiencia-como-analista-de-datos_page-0001.jpg",
        pdfUrl: "pdf/certificate-of-completion-for-tu-primera-experiencia-como-analista-de-datos_page-0001.pdf"
    },
    {
        id: 5,
        title: "Estudios Concluidos",
        subtitle: "Ingeniero en Desarrollo de Software",
        image: "img/certificate/1t8rckxe_1762887951009_page-0001.jpg",
        pdfUrl: "pdf/1t8rckxe_1762887951009.pdf"
    }
];

const PrevButton = ({ enabled, onClick }) => (
    <button
        className="embla_button embla_button--prev"
        onClick={onClick}
        disabled={!enabled}
        type="button"
    >
        <svg className="embla_button_svg" viewBox="0 0 532 532">
            <path
                fill="currentColor"
                d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
            ></path>
        </svg>
    </button>
);

const NextButton = ({ enabled, onClick }) => (
    <button
        className="embla_button embla_button--next"
        onClick={onClick}
        disabled={!enabled}
        type="button"
    >
        <svg className="embla_button_svg" viewBox="0 0 532 532">
            <path
                fill="currentColor"
                d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
            ></path>
        </svg>
    </button>
);

const setupProgressBar = (emblaApi, progressNode) => {
    const applyProgress = () => {
        if (!emblaApi || !progressNode) return;
        const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
        progressNode.style.transform = `translate3d(${progress * 100}%,0px,0px)`;
    };

    const removeProgress = () => {
        if (progressNode) {
            progressNode.removeAttribute('style');
        }
    };

    return { applyProgress, removeProgress };
};

const PdfCertificatesCarousel = () => {
    const [pdfEmblaRef] = useEmblaCarousel(
        { 
            loop: true,
            align: "center",
            dragFree: false,
            slidesToScroll: 1,
            containScroll: "trimSnaps",
            breakpoints: {
                "(min-width: 768px)": { slidesToScroll: 2 },
                "(min-width: 1024px)": { slidesToScroll: 3 }
            }
        },
        [Autoplay({ delay: 11000, stopOnInteraction: true })]
    );

    const createErrorSVG = (title) => {
        const encodedTitle = encodeURIComponent(title);
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%231e293b'/%3E%3Ctext x='200' y='120' text-anchor='middle' dy='.3em' fill='white' font-size='16' font-family='Inter, sans-serif'%3ESin conexión a internet%3C/text%3E%3Ctext x='200' y='150' text-anchor='middle' dy='.3em' fill='%2394a3b8' font-size='14' font-family='Inter, sans-serif'%3E${encodedTitle}%3C/text%3E%3C/svg%3E`;
    };

    return (
        <div className="pdf-certificates-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="pdf-embla">
                            <div className="pdf-embla_viewport" ref={pdfEmblaRef}>
                                <div className="pdf-embla_container">
                                    {certificates.map((cert) => (
                                        <div className="pdf-embla_slide" key={cert.id}>
                                            <div 
                                                className="pdf-certificate-card"
                                                onClick={() => window.open(cert.pdfUrl, '_blank')}
                                                role="button"
                                                tabIndex={0}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        window.open(cert.pdfUrl, '_blank');
                                                    }
                                                }}
                                            >
                                                <div className="pdf-card-image-container">
                                                    <img 
                                                        src={cert.image} 
                                                        alt={cert.title}
                                                        className="pdf-card-image"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = createErrorSVG(cert.title);
                                                        }}
                                                    />
                                                    <div className="pdf-hover-overlay">
                                                        <span className="pdf-hover-text">View PDF</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="pdf-card-content">
                                                    <h3 className="pdf-card-title">{cert.title}</h3>
                                                    <p className="pdf-card-subtitle">{cert.subtitle}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Certifications(props) {
    let fadeInScreenHandler = (screen) => {
        if (screen.fadeScreen !== props.id) return;
        Animations.animations.fadeInScreen(props.id);
    };

    const fadeInSubscription =
        ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { 
            loop: false, 
            align: "start",
            dragFree: false,
            slidesToScroll: 1,
            breakpoints: {
                "(min-width: 768px)": { slidesToScroll: 1 },
                "(min-width: 1024px)": { slidesToScroll: 1 }
            }
        }, 
        [Autoplay({ delay: 9000, stopOnInteraction: false })]
    );

    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const progressBarRef = useRef(null);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    const onScroll = useCallback(() => {
        if (!emblaApi || !progressBarRef.current) return;
        const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
        progressBarRef.current.style.transform = `translate3d(${progress * 100}%,0px,0px)`;
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        
        const { applyProgress } = setupProgressBar(emblaApi, progressBarRef.current);
        
        onSelect();
        applyProgress();
        
        emblaApi.on("select", onSelect);
        emblaApi.on("scroll", onScroll);
        emblaApi.on("init", applyProgress);
        emblaApi.on("reInit", applyProgress);
        emblaApi.on("slideFocus", applyProgress);
        
        return () => {
            fadeInSubscription.unsubscribe();
            emblaApi.off("select", onSelect);
            emblaApi.off("scroll", onScroll);
            emblaApi.off("init", applyProgress);
            emblaApi.off("reInit", applyProgress);
            emblaApi.off("slideFocus", applyProgress);
        };
    }, [emblaApi, onSelect, onScroll, fadeInSubscription]);

    const courses = [
        {
            id: 1,
            title: "Gestor de Horarios IOS",
            institution: "Universidad internacional de México",
            date: "2024",
            description: "Aplicación para la gestión de horarios en empresa con loggin y register",
            image: "img/Certificate/App-IOS.jpg",
            certificateUrl: "https://github.com/japhdev/App-Gestor-de-horarios.git",
            skills: ["Swift", "Data base", "UI UX", "FireBase"]
        },
        {
            id: 2,
            title: "React.js Advanced Concepts",
            institution: "Udemy",
            date: "2023",
            description: "Advanced React patterns, hooks, context API, performance optimization.",
            image: "img/Certificate/App-IOS.jpg",
            certificateUrl: "#",
            skills: ["React", "Redux", "Hooks", "Context API"]
        },
        {
            id: 3,
            title: "AWS Certified Developer",
            institution: "Amazon Web Services",
            date: "2023",
            description: "AWS services, serverless architecture, and cloud deployment strategies.",
            image: "img/Certificate/App-IOS.jpg",
            certificateUrl: "#",
            skills: ["AWS", "Lambda", "S3", "DynamoDB"]
        },
        {
            id: 4,
            title: "UI/UX Design Fundamentals",
            institution: "Google Career Certificates",
            date: "2022",
            description: "User-centered design, wireframing, prototyping, and usability testing.",
            image: "img/Certificate/App-IOS.jpg",
            certificateUrl: "#",
            skills: ["Figma", "UI Design", "User Research", "Prototyping"]
        },
        {
            id: 5,
            title: "Python for Data Science",
            institution: "DataCamp",
            date: "2023",
            description: "Data analysis, visualization, and machine learning with Python.",
            image: "img/Certificate/App-IOS.jpg",
            certificateUrl: "#",
            skills: ["Python", "Pandas", "NumPy", "Matplotlib"]
        }
    ];

    return (
        <div>
            <ScreenHeading
                title={"Courses & Certifications"}
                subHeading={"My Professional Development Journey"}
            />
            <section className="courses-section" id={props.id || ""}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-intro">
                                <p className="intro-text">
                                    Continuous learning is key in technology. Here are some of the courses 
                                    and certifications I've completed to enhance my skills.
                                </p>
                            </div>
                            
                            <div className="embla">
                                <div className="embla_viewport" ref={emblaRef}>
                                    <div className="embla_container">
                                        {courses.map((item) => (
                                            <div className="embla_slide" key={item.id}>
                                                <div className="course-card">
                                                    <div className="card-image">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.title}
                                                            onError={(e) => {
                                                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%232f70c1'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='20' font-family='Inter'%3E" + 
                                                                    encodeURIComponent(item.title) + "%3C/text%3E%3C/svg%3E";
                                                            }}
                                                        />
                                                        <div className="card-badge">{item.date}</div>
                                                    </div>
                                                    
                                                    <div className="card-content">
                                                        <h3 className="course-title">{item.title}</h3>
                                                        <p className="institution">
                                                            <i className="fa fa-university"></i> {item.institution}
                                                        </p>
                                                        <p className="course-description">{item.description}</p>
                                                        
                                                        <div className="skills-tags">
                                                            {item.skills.map((skill, index) => (
                                                                <span key={index} className="skill-tag">{skill}</span>
                                                            ))}
                                                        </div>
                                                        
                                                        <div className="card-actions">
                                                            <a 
                                                                href={item.certificateUrl} 
                                                                className="view-cert-btn"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <i className="fa fa-external-link"></i> View on GitHub
                                                            </a>
                                                            <button className="save-btn">
                                                                <i className="fa fa-bookmark"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="embla_controls">
                                    <div className="embla_buttons">
                                        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                                        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
                                    </div>
                                    <div className="embla_progress">
                                        <div 
                                            className="embla_progress_bar" 
                                            ref={progressBarRef}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="stats-container">
                                <div className="stat-item">
                                    <h3>{courses.length}+</h3>
                                    <p>Courses Completed</p>
                                </div>
                                <div className="stat-item">
                                    <h3>300+</h3>
                                    <p>Learning Hours</p>
                                </div>
                                <div className="stat-item">
                                    <h3>{certificates.length}+</h3>
                                    <p>PDF Certificates</p>
                                </div>
                                <div className="stat-item">
                                    <h3>15+</h3>
                                    <p>Skills Acquired</p>
                                </div>
                            </div>

                            <PdfCertificatesCarousel />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}