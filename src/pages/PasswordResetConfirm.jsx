import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Lock, ShieldCheck, CheckCircle } from 'lucide-react';
import apiClient from '../services/api-client';

const PasswordResetConfirm = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({ new_password: "", re_new_password: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-gray-100">
                {!success ? (
                    <>
                        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mb-6">
                            <ShieldCheck size={32} />
                        </div>
                        <h2 className="text-3xl font-black text-gray-800 mb-2">Set New Password</h2>
                        <p className="text-gray-500 mb-8 text-sm">Please create a strong password that you don't use elsewhere.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="password" 
                                    placeholder="New Password"
                                    required
                                    className="input input-bordered w-full pl-12 h-14 rounded-2xl border-gray-100"
                                    onChange={(e) => setPasswords({...passwords, new_password: e.target.value})}
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="password" 
                                    placeholder="Confirm New Password"
                                    required
                                    className="input input-bordered w-full pl-12 h-14 rounded-2xl border-gray-100"
                                    onChange={(e) => setPasswords({...passwords, re_new_password: e.target.value})}
                                />
                            </div>
                            <button 
                                disabled={loading}
                                className="btn w-full h-14 bg-black hover:bg-gray-800 text-white rounded-2xl font-bold mt-4"
                            >
                                {loading ? "Updating..." : "Reset Password"}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center">
                        <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
                        <h2 className="text-2xl font-black text-gray-800">Success!</h2>
                        <p className="text-gray-500 mt-2">Password reset successful. Redirecting to login...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordResetConfirm;