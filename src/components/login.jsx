import React, { useEffect, useState } from "react";
import styles from "./login.module.css"
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(){
    
    const[auth, setAuth] = useState(false)
    const[err, setErr] = useState('')

    useEffect(() => {
        const fetchData = async() => {
            axios.get("http://localhost:5000/login")
            .then((res) => {
                if(res.data.success)
                    setAuth(res.data.success)
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

    const onSubmit = async(data) => {
        await axios.post("http://localhost:5000/login", data)
        .then((res) => {
            if(res.data.success){
                navigate('/profiles')
                localStorage.setItem('id', res.data.id)
                localStorage.setItem('token', res.data.token)
                console.log(localStorage.getItem('token'))
            }
            
        })
        .catch((error) => {
            console.log(error.message)
        })
    }

    const loginSchema = z.object({
        username : z.string().min(4, 'UserName must contain atleast 4 letters'),
        password:z.string().min(8)
    })

    const {register, handleSubmit, formState : {errors}} = useForm({
        resolver : zodResolver(loginSchema)
    },
    {
        username : '',
        password : ''
    })

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
                        onClick={() => navigate('/')}>Back</button>
                </div>
            </nav>

            <div className={styles.form}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="username" className={styles.label}>User Name : </label>  
                    <input 
                        className={styles.input}
                        type="text" 
                        {...register('username')}
                        id="username"/> 
                    {errors.username && (
                        <span className="err">{errors.username.message}</span>
                    )}
                    
                    <label htmlFor="password" className={styles.label}>Password : </label> 
                    <input 
                        className={styles.input}
                        type="password" 
                        {...register('password')}
                        id="password"/> 
                    {errors.password && (
                        <span className="err">{errors.password.message}</span>
                    )}
                    <button className="but">Login</button>
                    <p className={styles.sign}>Are you New ? <span onClick={() => navigate('/signup')}>Sign Up</span></p>
                </form>
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
            }
        </>
    )
}