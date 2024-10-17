import React, { useEffect, useState } from "react";
import styles from "./info.module.css"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Info(){

    const navigate = useNavigate()
    const {id} = useParams()
    const[auth, setAuth] = useState(false)
    const[err, setErr] = useState('')
    const[info, setInfo] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
            axios.get(`http://localhost:5000/profiles/info/${id}`,
                {headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }}
            )
            .then((res) => {
                if(res.data.success){
                    setAuth(res.data.success)
                    setInfo(res.data.profile)
                }
                else
                    setAuth(false)
            })
            .catch((error) => {
                setErr(error.message)
                setAuth(false)
            })
        }

        fetchData()
    }, [id])

    return(
        <>{auth ? 
        <div className={styles.main}>
            <nav>
                <p className="title">Developer's Hub</p>
                <div>
                    <button className="but"
                        onClick={() => navigate('/')}>Home</button>
                    <button 
                        className="but"
                        onClick={() => navigate('/profiles')}>Back</button>
                </div>
            </nav>

            <div className={styles.info}>
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <td>Developer Name&nbsp;&nbsp;&nbsp;</td>
                            <td> : </td>
                            <td className={styles.val}>&nbsp;&nbsp;&nbsp;{info.username}</td>
                        </tr>


                        <tr>
                            <td>Email &nbsp;&nbsp;&nbsp;</td>
                            <td> : </td>
                            <td className={styles.val}>&nbsp;&nbsp;&nbsp;{info.email}</td>
                        </tr>

                        <tr>
                            <td>Role &nbsp;&nbsp;&nbsp;</td>
                            <td> : </td>
                            <td className={styles.val}>&nbsp;&nbsp;&nbsp;{info.role}</td>
                        </tr>

                        <tr>
                            <td>Experience &nbsp;&nbsp;&nbsp;</td>
                            <td> : </td>
                            <td className={styles.val}>  &nbsp;&nbsp;&nbsp;{info.experience}</td>
                        </tr>

                        <tr>
                            <td>LinkedIn &nbsp;&nbsp;&nbsp;</td>
                            <td> : </td>
                            <td className={styles.val}>&nbsp;&nbsp;&nbsp;{info.lp}</td>
                        </tr>

                        <tr>
                            <td className={styles.link}  colSpan={3}>Portfolio</td>
                        </tr>

                        <tr>
                            <td>Tech stack &nbsp;&nbsp;&nbsp;</td>
                            <td> : </td>
                            <td className={styles.val}>&nbsp;&nbsp;&nbsp;{info.ts}</td>
                        </tr>

                        <tr>
                            <td>Programing Languages Known &nbsp;&nbsp;&nbsp;</td>
                            <td> : </td>
                            <td className={styles.val}> &nbsp; &nbsp;&nbsp;{info.pl}</td>
                        </tr>
                    </tbody>
                </table>
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
        </div>
        }</>
    )
}