import {React, useState, useEffect} from "react";
import styles from './main.module.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Main(){

    const text = "A Platform developed for developers, by developers !";
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    const [auth, setAuth] = useState(false)
    const [err, setErr] = useState('')
    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const res = await axios.get("http://localhost:5000/");
                if (res.data.success) {
                    setAuth(res.data.success);
                } else {
                    setAuth(false);
                }
            } catch (error) {
                setErr(error.message)
                setAuth(false);
            }
        };

        fetchAuth();
    }, []);
    
    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text.charAt(index));
                setIndex(prev => prev + 1);
            }, 200); 
            return () => clearTimeout(timeout); 
        }
    }, [index, text]);

    const navigate = useNavigate()
    return(
        <>
        {auth ? 
        <div className={styles.main}>
            <nav>
                <p className="title">Developer's Hub</p>
                <div>
                    <button 
                        className="but"
                        onClick={() => navigate('/login')}>Login</button>
                    <button 
                        className="but"
                        onClick={() => navigate('/signup')}>Sign up</button>
                </div>
            </nav>
            
            <p className={styles.textAnimation}>{displayedText}</p>
        

            <div className={styles.head}>

                <p className={styles.motto2}>
                    Find Your Next Development Partner
                </p>

                <p className={styles.motto}>
                    Connect. <br />
                    Collaborate. <br />
                    Build Together. <br />
                </p>
            </div>

            <div  className={styles.subMain}>
                <p className={styles.head2}>How it works ?</p>
                <div>
                    <p className={styles.sub}>Create your profile</p>
                        <p className={styles.content}>
                            Showcase your skills, past projects, and what you're looking for in a partner. <br /> 
                            Whether you're a frontend expert or a backend guru, <br />
                            let others know how you can contribute. <br />
                        </p>
                </div>
                <div>
                    <p className={styles.sub}>Browse Developers</p>    
                    <p  className={styles.content}>
                        Search for developers by skills, experience level, location, or project interests. <br />
                        Narrow down the options and find your ideal partner. <br />
                    </p>
                </div>
                <div>
                    <p className={styles.sub}>Start collabrating</p>
                    <p className={styles.content}>
                        Connect with developers, exchange ideas, and start working on exciting <br />
                        projects together. Whether it's for a hackathon, a freelance gig or an open-source <br />
                        project, we've got you covered. <br />
                    </p>
                </div>
            </div>

            <footer>
                <p className="info">About Us | Privacy Policy | Contact Us</p>
                <p className="title">Developer's Hub</p>
            </footer>
        </div>
        :
            <div className="wrostcase">
                <p>{err}</p>
                <p>Something went wrong</p>
                <p>Try to reload the page</p>
            </div>}
        </>
    )
}