import { useEffect, useState } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import Page from "../../component/Page";
import useAuth from '../../hook/useAuth';




export default function Login() {

    
    const { login, passwordVerify } = useAuth();

    const { state } = useLocation();

    const [step, setStep] = useState('login');

    const navigate = useNavigate();

    const defaultvalue = {
        mobile: '',
    }
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ defaultValues: defaultvalue });

    useEffect(() => {
        if (state?.verify)
            setStep('password')
    }, [state])

    const onSubmit = (data) => {
        if (step === 'login')
            onLogin(data);
        else if (step === 'password')
            onPassword(data);
        else if (step === 'setpassword')
            onSetPassword(data);
    }

    const onLogin = async (data) => {
        try {
            const result = await login(data.mobile);
          
            if (result === 'password') {
                setStep('password');
            } else if (result === 'otp') {
                navigate('/auth/verify-otp');
            } else if (result === 'navigate') {
                navigate('/');
            }
            else if (result === "error") {
                toast.error("Can not login, try again");
            }
        } catch (error) {

        }

        // setStep('pincode');
    };

    const onPassword = async (data) => {
        try {
            const result = await passwordVerify(data.mobile, data.password);
            if (result.success) {
                navigate('/')
            } else {
                toast.error(result.message);
                navigate('/auth/login');
            }
        } catch (err) {
            toast.error("Can not login, try again");
            
            console.log(err);
        }
    }

    const onSetPassword = async (data) => {
        navigate('/');
    }

    return (
        <Page title="Login">
            <div className="container max-w-sm p-6">

                <form className="rounded shadow border flex flex-col items-center gap-4 p-8"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <p className="text-center font-bold text-2xl">Login</p>
                    <p className="text-center  mb-1">Please Input your mobile number</p>
                    
                    <div className="w-full">
                        <p className="font-bold mb-2">PhoneNumber</p>
                        <input className="input h-10 border border-stone-300 w-full" required   {...register("mobile")} />
                    </div>

                    {step === 'password' &&
                        <div className="w-full">
                            <p className="font-bold mb-2">password</p>
                            <input className="input h-10 border border-stone-300 w-full" type='password' required minLength={4} {...register("password")} />
                        </div>
                    }

                    {step === 'first'
                        ? <div className="w-full">
                            <p className="font-bold mb-2">confirm</p>
                            <input className="input h-10 border border-stone-300 w-full" type='password' required minLength={4} {...register("confirm")} />
                        </div>
                        : <Link to="/auth/forget">Forgot password?</Link>
                    }

                    <button className={`btn gap-2 btn-info w-4/5 uppercase ${isSubmitting && 'loading'}`} type="submit">Login
                    </button>
                </form>
            </div>
        </Page>
    )
}
