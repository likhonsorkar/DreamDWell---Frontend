import React, { useState } from 'react';
import { Mail, Send, ArrowLeft } from 'lucide-react';
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200 w-full max-w-md border border-gray-100">
                {!sent ? (
                    <>
                        <h2 className="text-3xl font-black text-gray-800 mb-2">Forgot Password?</h2>
                        <p className="text-gray-500 mb-8 text-sm">Enter your email and we'll send you a link to reset your password.</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input 
                                    type="email" 
                                    required 
                                    className="input input-bordered w-full pl-12 h-14 rounded-2xl border-gray-200 focus:border-orange-500"
                                    placeholder="your-email@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button 
                                disabled={loading}
                                className="btn w-full h-14 bg-orange-600 hover:bg-orange-700 text-white border-none rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-200"
                            >
                                {loading ? <span className="loading loading-spinner"></span> : <><Send size={18} /> Send Reset Link</>}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-6">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                            <Mail size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-800 mb-2">Check Your Inbox</h2>
                        <p className="text-gray-500 text-sm">We've sent a password reset link to <br/><strong>{email}</strong></p>
                    </div>
                )}
                
                <Link to="/login" className="flex items-center justify-center gap-2 mt-8 text-sm font-bold text-gray-400 hover:text-orange-600 transition-colors">
                    <ArrowLeft size={16} /> Back to Login
                </Link>
            </div>
        </div>
    );
};

export default ResetPassword;