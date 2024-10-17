import React, { useEffect, useState } from "react";
import styles from './register.module.css'
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register(){

    const[auth, setAuth] = useState(false)
    const[err, setErr] = useState('')

    useEffect(() => {
        const fetch = async() => {
            await axios.get("http://localhost:5000/signup")
            .then((res) => {
                if(res.data.success){
                    setAuth(res.data.success)
                }
                else{
                    setAuth(false)
                }
            })
            .catch((err) => {
                setAuth(false)
                setErr(err.message)
            })
        }

        fetch()
    }, [])

    const registerSchmea = z.object({
        username : z.string().min(4, 'Username must contain atleast four characters'),
        email : z.string().email(),
        password : z.string().min(8, 'Password must contain atleast 8 characters'),
        repassword: z.string().min(8, 'Confirm Password must be at least 8 characters'),
        role : z.string().min(2, 'please mention you role'),
        experience: z
                    .string()
                    .transform((val) => Number(val)) // Convert the input to a number
                    .refine((val) => !isNaN(val) && val > 0, 'Experience must be a positive number'),
        lp : z.string().min(1, 'Please fill this field'),
        portfolio : z.string().optional(),
        pl : z.string().min(1, 'Please specify the languages'),
        ts : z.string().optional(),
        np : z.string().min(1, "Specify your notable projects"),
        mi : z.string().min(10, 'Please enter at least 10 characters').optional()
    })
    .refine((data) => data.password === data.repassword, {
                    message: 'Passwords must match',
                    path: ['repassword']
    })

    const {register, handleSubmit, formState:{errors}} = useForm({
            resolver : zodResolver(registerSchmea) })

    const navigate = useNavigate()
    const onregister = async(data) => {
        await axios.post("http://localhost:5000/signup", data)
        .then((res) => {
            console.log(data)
            navigate('/login')
        })
        .catch((err) => {
            setErr(err.message)
        })
    }
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
            <div className={styles.details}>
                <form onSubmit={handleSubmit(onregister)} className={styles.register}>
    
                    <p className={styles.title}>Personal Info</p>

                    <label htmlFor="username" className={styles.label}>User Name : </label>  
                    <input 
                        className={styles.input}
                        type="text" 
                        {...register('username')}
                        id="username"/> 
                    
                    {errors.username && (
                        <span className="err">{errors.username.message}</span>
                    )}
            
                    <label htmlFor="email" className={styles.label}>Email : </label>  
                    <input 
                        className={styles.input}
                        type="email" 
                        {...register('email')}
                        id="email"/> 
                    
                    {errors.email && (
                        <span className="err">{errors.email.message}</span>
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

                    <label htmlFor="password-c" className={styles.label}>Confirm Password : </label>  
                    <input 
                        className={styles.input}
                        type="password"
                        {...register('repassword')} 
                        id="password-c"/> 

                    {errors.repassword && (
                        <span className="err">{errors.repassword.message}</span>
                    )}

                    <p className={styles.title}>Professional Info</p>

                    <label htmlFor="role" className={styles.label}>Role : </label>  
                    <input 
                        className={styles.input}
                        type="text" 
                        {...register('role')}
                        id="role"/> 
                    
                    {errors.role && (
                        <span className="err">{errors.role.message}</span>
                    )}

                    <label htmlFor="experience" className={styles.label}>Experience : </label>  
                    <input 
                        className={styles.input}
                        type="number" 
                        {...register('experience')}
                        id="experience"/> 
                    
                    {errors.experience && (
                        <span className="err">{errors.experience.message}</span>
                    )}

                    <label htmlFor="lp" className={styles.label}>LinkedIn Profile (URL) : </label>  
                    <input 
                        className={styles.input}
                        type="text" 
                        {...register('lp')}
                        id="lp"/> 
                    
                    {errors.lp && (
                        <span className="err">{errors.lp.message}</span>
                    )}

                    <label htmlFor="portfolio" className={styles.label}>Portfolio (URL) : </label>  
                    <input 
                        className={styles.input}
                        type="text" 
                        {...register('portfolio')}
                        id="portfolio"/> 
                    
                    {errors.portfolio && (
                        <span className="err">{errors.portfolio.message}</span>
                    )}

                    <p className={styles.title}>Technical Info</p>

                    <label htmlFor="pl" className={styles.label}>Programing Languages Known : </label>  
                    <input 
                        className={styles.input}
                        type="text" 
                        {...register('pl')}
                        id="pl"/> 
                    
                    {errors.pl && (
                        <span className="err">{errors.pl.message}</span>
                    )}

                    <label htmlFor="ts" className={styles.label}>Tech stack : </label>  
                    <input 
                        className={styles.input}
                        type="text" 
                        {...register('ts')}
                        id="ts"/> 
                    
                    {errors.ts && (
                        <span className="err">{errors.ts.message}</span>
                    )}

                    <label htmlFor="np" className={styles.label}>Notable projects  : </label>  
                    <input 
                        className={styles.input}
                        type="text" 
                        {...register('np')}
                        id="np"/> 
                    
                    {errors.np && (
                        <span className="err">{errors.np.message}</span>
                    )}


                    <p className={styles.title}>Tell About Us : </p>

                    <label htmlFor="mi" className={styles.label}>More Info  : </label>  
                    <textarea 
                        className={styles.input2}
                        {...register('mi')}
                        id="mi"/> 
                    
                    {errors.mi && (
                        <span className="err">{errors.mi.message}</span>
                    )}




                    <button className="but">Register</button>
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