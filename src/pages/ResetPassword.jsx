import React, { useState } from 'react';
import { Mail, Send, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router';
import apiClient from '../services/api-client';

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await apiClient.post("/auth/users/reset_password/", { email });
            setSent(true);
        } catch (error) {
            alert("Something went wrong. Please check the email address.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden bg-base-200/30">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-[10%] left-[20%] w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[20%] w-64 md:w-80 h-64 md:h-80 bg-primary/5 rounded-full blur-[80px]"></div>
            </div>

            <div className="card w-full max-w-[480px] bg-base-100/80 backdrop-blur-2xl border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] z-10 rounded-[2.5rem] overflow-hidden">
                <div className="card-body p-8 md:p-12">
                    {!sent ? (
                        <>
                            <div className="flex flex-col items-center text-center mb-10">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-primary/20">
                                    <KeyRound className="text-primary" size={32} />
                                </div>
                                <h2 className="text-3xl font-black text-base-content tracking-tight">Forgot <span className="text-primary">Password?</span></h2>
                                <p className="text-base-content/50 text-sm mt-3 font-medium">Enter your email and we'll send you a link to reset your password.</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="form-control group">
                                    <label className="label py-1">
                                        <span className="label-text font-bold text-base-content/70 ml-1">Email Address</span>
                                    </label>
                                    <div className="relative flex items-center">
                                        <Mail className="absolute left-4 z-10 text-base-content/40 group-focus-within:text-primary transition-colors pointer-events-none" size={20} />
                                        <input 
                                            type="email" 
                                            required 
                                            className="w-full input input-bordered pl-12 h-14 rounded-2xl border-base-200 focus:border-primary focus:ring-4 focus:ring-primary/10 bg-base-100 transition-all z-0"
                                            placeholder="name@example.com"
                                            onChange={(e) => setEmail(e.target.value)}
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
                                        <span className="flex items-center gap-2">Send Reset Link <Send size={18} /></span>
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-6">
                            <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce ring-1 ring-success/20">
                                <CheckCircle2 size={40} />
                            </div>
                            <h2 className="text-3xl font-black text-base-content mb-4 tracking-tight text-success">Check Your Inbox</h2>
                            <p className="text-base-content/60 text-sm font-medium leading-relaxed">
                                We've sent a password reset link to: <br/>
                                <strong className="text-base-content block mt-2 text-lg">{email}</strong>
                            </p>
                            <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/10 text-xs text-primary/70 font-medium">
                                Didn't receive the email? Check your spam folder or try again in a few minutes.
                            </div>
                        </div>
                    )}
                    
                    <Link to="/login" className="flex items-center justify-center gap-2 mt-8 text-sm font-bold text-base-content/40 hover:text-primary transition-colors group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Login
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default ResetPassword;
