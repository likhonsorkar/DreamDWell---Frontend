import { useContext , useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';

const Login = () => {
    const {user, loginUser } = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [param] = useSearchParams();
    const next = param.get("next") || "/dashboard";

    const onSubmit = async(data) => {
      setLoading(true)
      try {
        const succes = await loginUser(data);
        if (succes){
            navigate(next);
        }
      }catch (error){
        console.log(error);
      }finally{
        setLoading(false)
    }
    }

    useEffect(()=>{
        const title = "House For Rent - Login";
        document.title = title;
       if (user) {navigate(next);}
    }, [user,next, navigate])

    return (
        <main className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden bg-base-200/30">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-[10%] right-[15%] w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[10%] left-[10%] w-64 md:w-80 h-64 md:h-80 bg-primary/5 rounded-full blur-[80px]"></div>
            </div>

            <div className="card w-full max-w-[480px] bg-base-100/80 backdrop-blur-2xl border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] z-10 rounded-[2.5rem] overflow-hidden">
                <div className="card-body p-8 md:p-12">
                    <div className="flex flex-col items-center text-center mb-10">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-primary/20">
                            <LogIn className="text-primary" size={32} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tight">Welcome <span className="text-primary">Back</span></h2>
                        <p className="text-base-content/50 text-sm mt-3 font-medium max-w-[280px]">Log in to your account to manage your dream properties.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="form-control group">
                            <label className="label py-1">
                                <span className="label-text font-bold text-base-content/70 ml-1">Email Address</span>
                            </label>
                            <div className="relative flex items-center">
                                <Mail className="absolute left-4 z-10 text-base-content/40 group-focus-within:text-primary transition-colors pointer-events-none" size={20} />
                                <input 
                                    type="email" 
                                    placeholder="name@example.com" 
                                    className={`w-full input input-bordered pl-12 h-14 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 bg-base-100 transition-all z-0 ${errors.email ? "input-error border-error/50 bg-error/5": "border-base-200"}`} 
                                    {...register("email", {required: "Email is required"} )}
                                />
                            </div>
                            {errors.email && (<span className="text-error text-xs mt-1.5 ml-1 font-medium flex items-center gap-1"> {errors.email.message} </span>)}
                        </div>

                        <div className="form-control group">
                            <label className="label py-1 flex justify-between items-center">
                                <span className="label-text font-bold text-base-content/70 ml-1">Password</span>
                                <Link to="/password/reset" className="label-text-alt link link-hover text-primary font-bold hover:text-primary/80">Forgot Password?</Link>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors" size={20} />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    className={`w-full input input-bordered px-12 h-14 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 bg-base-100 transition-all ${errors.password ? "input-error border-error/50 bg-error/5": "border-base-200"}`} 
                                    {...register("password", {required: "Password is required"} )}
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && (<span className="text-error text-xs mt-1.5 ml-1 font-medium flex items-center gap-1"> {errors.password.message} </span>)}
                        </div>

                        <button 
                            className="btn btn-lg bg-primary hover:bg-primary-focus border-none text-white w-full h-14 shadow-xl shadow-primary/25 text-lg rounded-2xl mt-4 font-bold transition-all hover:scale-[1.02] active:scale-[0.98]" 
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-md"></span>
                            ) : (
                                <span className="flex items-center gap-2">Sign In <ArrowRight size={20} /></span>
                            )}
                        </button>
                    </form>

                    <div className="divider my-8 text-[10px] text-base-content/30 uppercase font-black tracking-[0.2em]">Don't have an account?</div>
                    
                    <p className="text-center text-sm font-medium text-base-content/60">
                        Join DreamDwell today. <Link to="/signup" className="text-primary font-black hover:underline hover:text-primary-focus ml-1">Create Account</Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Login;
