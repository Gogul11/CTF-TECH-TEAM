import React, { useState, useEffect } from "react";
import styles from "./prof.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Profiles(){

    const[auth, setAuth] = useState(false)
    const[err, setErr] = useState('')
    const[prof, setProf] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            axios.get("http://localhost:5000/profiles", {headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
            .then((res) => {
                if(res.data.success){
                    setAuth(res.data.success)
                    setProf(res.data.profiles)
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
    }, [])
    const navigate = useNavigate()


    const Profile = ({ id ,name, role, lp, portfolio}) => {

        const getInfo = () => {
            navigate(`/profiles/info/${id}`)
        }

        return(
            <div className={styles.profile}>
                <table>
                    <tbody>
                        <tr>
                            <td>Name </td>
                            <td> : </td>
                            <td className={styles.val}> {name}</td>
                        </tr>
                        <tr>
                            <td>Role</td>
                            <td> : </td>
                            <td className={styles.val}> {role}</td>
                        </tr>
                        <tr>
                            <td>Linkedin </td>
                            <td> : </td>
                            <td className={styles.val}> {lp}</td>
                        </tr>
                        <tr>
                            <td colSpan={3}><a href={portfolio}>Portfolio</a></td>
                        </tr>
                    </tbody>

                </table>
                <p className={styles.info} onClick = {getInfo}>More info</p>
            </div>
        )
    }

    const id = localStorage.getItem('id')


    return(
        <>{auth ? 
        <div className={styles.main}>
            <nav>
                <p className="title">Developer's Hub</p>
                <div>
                    <button 
                        className="but"
                        onClick={() => navigate('/')}>Home</button>
                    <button 
                        className="but"
                        onClick={() => navigate(`/profiles/myprofile/${id}`)}>My profile</button>
                    <button 
                        className="but"
                        onClick={
                            () => {
                                    localStorage.removeItem('token')
                                    navigate('/login')
                                }
                        }>Log out</button>
                </div>
            </nav>
            <div className={styles.disp}>
                {prof.map((item) => (
                    <Profile key={item._id} id={item._id} name={item.username} role = {item.role} lp = {item.lp} portfolio={item.portfolio} />
                ))}
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