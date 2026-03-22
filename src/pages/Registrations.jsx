import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthContext from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { User, Mail, Phone, MapPin, Lock, Eye, EyeOff, UserPlus, ArrowRight } from 'lucide-react';

const Registrations = () => {
    const navigate = useNavigate();
    const {signupUser} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    
    const onSubmit = async(data) => {
        setLoading(true);
        delete data.cpassword;
        try{
            const success = await signupUser(data);
            if (success) {
            navigate("/login");
        }
        }catch (error){
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden bg-base-200/30">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-[5%] left-[5%] w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[5%] right-[5%] w-64 md:w-80 h-64 md:h-80 bg-primary/5 rounded-full blur-[80px]"></div>
            </div>

            <div className="card w-full max-w-2xl bg-base-100/80 backdrop-blur-2xl border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] z-10 rounded-[2.5rem] overflow-hidden">
                <div className="card-body p-8 md:p-12"> 
                    {/* Header */}
                    <div className="flex flex-col items-center text-center mb-10">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-primary/20">
                            <UserPlus className="text-primary" size={32} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tight">
                            Create <span className="text-primary">Account</span>
                        </h2>
                        <p className="text-base-content/50 text-sm mt-3 font-medium max-w-[320px]">Join DreamDwell and start your journey to find the perfect home.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name Group */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control group">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-base-content/70 ml-1">First Name</span>
                                </label>
                                <div className="relative flex items-center">
                                    <User className="absolute left-4 z-10 text-base-content/40 group-focus-within:text-primary transition-colors pointer-events-none" size={20} />
                                    <input 
                                        type="text" 
                                        placeholder="John" 
                                        className={`w-full input input-bordered pl-12 h-14 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 bg-base-100 transition-all z-0 ${errors.first_name ? "input-error border-error/50 bg-error/5": "border-base-200"}`} 
                                        {...register("first_name", {required: "First Name is required"} )}
                                    />
                                </div>
                                {errors.first_name && <span className="text-error text-xs mt-1.5 ml-1 font-medium">{errors.first_name.message}</span>}
                            </div>
                            <div className="form-control group">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-base-content/70 ml-1">Last Name</span>
                                </label>
                                <div className="relative flex items-center">
                                    <User className="absolute left-4 z-10 text-base-content/40 group-focus-within:text-primary transition-colors pointer-events-none" size={20} />
                                    <input 
                                        type="text" 
                                        placeholder="Doe" 
                                        className={`w-full input input-bordered pl-12 h-14 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 bg-base-100 transition-all z-0 ${errors.last_name ? "input-error border-error/50 bg-error/5": "border-base-200"}`} 
                                        {...register("last_name", {required: "Last Name is required"} )}
                                    />
                                </div>
                                {errors.last_name && <span className="text-error text-xs mt-1.5 ml-1 font-medium">{errors.last_name.message}</span>}
                            </div>
                        </div>

                        {/* Email */}
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
                            {errors.email && <span className="text-error text-xs mt-1.5 ml-1 font-medium">{errors.email.message}</span>}
                        </div>

                        {/* Phone & Address */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control group">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-base-content/70 ml-1">Phone Number</span>
                                </label>
                                <div className="relative flex items-center">
                                    <Phone className="absolute left-4 z-10 text-base-content/40 group-focus-within:text-primary transition-colors pointer-events-none" size={20} />
                                    <input 
                                        type="text" 
                                        placeholder="+8801XXXXXXXXX" 
                                        className={`w-full input input-bordered pl-12 h-14 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 bg-base-100 transition-all z-0 ${errors.phone ? "input-error border-error/50 bg-error/5": "border-base-200"}`} 
                                        {...register("phone", {required: "Phone is required"} )}
                                    />
                                </div>
                                {errors.phone && <span className="text-error text-xs mt-1.5 ml-1 font-medium">{errors.phone.message}</span>}
                            </div>
                            <div className="form-control group">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-base-content/70 ml-1">Current Address</span>
                                </label>
                                <div className="relative flex items-center">
                                    <MapPin className="absolute left-4 z-10 text-base-content/40 group-focus-within:text-primary transition-colors pointer-events-none" size={20} />
                                    <input 
                                        type="text" 
                                        placeholder="Mirpur, Dhaka" 
                                        className={`w-full input input-bordered pl-12 h-14 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 bg-base-100 transition-all z-0 ${errors.address ? "input-error border-error/50 bg-error/5": "border-base-200"}`} 
                                        {...register("address", {required: "Address is required"} )}
                                    />
                                </div>
                                {errors.address && <span className="text-error text-xs mt-1.5 ml-1 font-medium">{errors.address.message}</span>}
                            </div>
                        </div>

                        {/* Password Group */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control group">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-base-content/70 ml-1">Password</span>
                                </label>
                                <div className="relative flex items-center">
                                    <Lock className="absolute left-4 z-10 text-base-content/40 group-focus-within:text-primary transition-colors pointer-events-none" size={20} />
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="••••••••" 
                                        className={`w-full input input-bordered px-12 h-14 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 bg-base-100 transition-all z-0 ${errors.password ? "input-error border-error/50 bg-error/5": "border-base-200"}`} 
                                        {...register("password", { required: "Password is required", minLength: { value: 8, message: "Min 8 characters" } })}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 z-10 text-base-content/30 hover:text-primary transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && <span className="text-error text-xs mt-1.5 ml-1 font-medium">{errors.password.message}</span>}
                            </div>
                            <div className="form-control group">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-base-content/70 ml-1">Confirm Password</span>
                                </label>
                                <div className="relative flex items-center">
                                    <Lock className="absolute left-4 z-10 text-base-content/40 group-focus-within:text-primary transition-colors pointer-events-none" size={20} />
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="••••••••" 
                                        className={`w-full input input-bordered px-12 h-14 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 bg-base-100 transition-all z-0 ${errors.cpassword ? "input-error border-error/50 bg-error/5": "border-base-200"}`} 
                                        {...register("cpassword", { 
                                            required: "Confirm password",
                                            validate: (val) => watch('password') === val || "Passwords do not match",
                                        })}
                                    />
                                </div>
                                {errors.cpassword && <span className="text-error text-xs mt-1.5 ml-1 font-medium">{errors.cpassword.message}</span>}
                            </div>
                        </div>

                        <button 
                            className="btn btn-lg bg-primary hover:bg-primary-focus border-none text-white w-full h-14 shadow-xl shadow-primary/25 text-lg rounded-2xl mt-4 font-bold transition-all hover:scale-[1.01] active:scale-[0.99]" 
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-md"></span>
                            ) : (
                                <span className="flex items-center gap-2">Create Account <ArrowRight size={20} /></span>
                            )}
                        </button>
                    </form>

                    <div className="divider my-10 text-[10px] text-base-content/30 uppercase font-black tracking-[0.2em]">Already have an account?</div>
                    
                    <p className="text-center text-sm font-medium text-base-content/60">
                        Return to <Link to="/login" className="text-primary font-black hover:underline hover:text-primary-focus ml-1">Log In</Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Registrations;
