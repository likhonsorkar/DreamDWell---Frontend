import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Lock, ShieldCheck, CheckCircle2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import apiClient from '../services/api-client';

const PasswordResetConfirm = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({ new_password: "", re_new_password: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwords.new_password !== passwords.re_new_password) {
            alert("Passwords do not match!");
            return;
        }
        setLoading(true);
        try {
            await apiClient.post("/auth/users/reset_password_confirm/", {
                uid,
                token,
                new_password: passwords.new_password
            });
            setSuccess(true);
            setTimeout(() => navigate("/login"), 3000);
        } catch (error) {
            alert("Invalid or expired token. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden bg-base-200/30">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-[10%] left-[15%] w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[10%] left-[10%] w-64 md:w-80 h-64 md:h-80 bg-primary/5 rounded-full blur-[80px]"></div>
            </div>

            <div className="card w-full max-w-[480px] bg-base-100/80 backdrop-blur-2xl border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] z-10 rounded-[2.5rem] overflow-hidden">
                <div className="card-body p-8 md:p-12">
                    {!success ? (
                        <>
                            <div className="flex flex-col items-center text-center mb-10">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-primary/20">
                                    <ShieldCheck className="text-primary" size={32} />
                                </div>
                                <h2 className="text-3xl font-black text-base-content tracking-tight">Set New <span className="text-primary">Password</span></h2>
                                <p className="text-base-content/50 text-sm mt-3 font-medium">Please create a strong password that you don't use elsewhere.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="form-control group">
                                    <label className="label py-1">
                                        <span className="label-text font-bold text-base-content/70 ml-1">New Password</span>
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors" size={18} />
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            placeholder="••••••••"
                                            required
                                            className="w-full input input-bordered px-12 h-14 rounded-2xl border-base-200 focus:border-primary focus:ring-4 focus:ring-primary/10 bg-base-100 transition-all"
                                            onChange={(e) => setPasswords({...passwords, new_password: e.target.value})}
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="form-control group">
                                    <label className="label py-1">
                                        <span className="label-text font-bold text-base-content/70 ml-1">Confirm New Password</span>
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors" size={18} />
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            placeholder="••••••••"
                                            required
                                            className="w-full input input-bordered px-12 h-14 rounded-2xl border-base-200 focus:border-primary focus:ring-4 focus:ring-primary/10 bg-base-100 transition-all"
                                            onChange={(e) => setPasswords({...passwords, re_new_password: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <button 
                                    disabled={loading}
                                    className="btn btn-lg bg-primary hover:bg-primary-focus border-none text-white w-full h-14 shadow-xl shadow-primary/25 text-lg rounded-2xl mt-4 font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner loading-md"></span>
                                    ) : (
                                        <span className="flex items-center gap-2">Reset Password <ArrowRight size={20} /></span>
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-6">
                            <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce ring-1 ring-success/20">
                                <CheckCircle2 size={40} />
                            </div>
                            <h2 className="text-3xl font-black text-base-content mb-4 tracking-tight text-success">Success!</h2>
                            <p className="text-base-content/60 text-sm font-medium leading-relaxed">
                                Your password has been reset successfully. <br/>
                                <span className="text-base-content/40 block mt-4">Redirecting you to login...</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default PasswordResetConfirm;
