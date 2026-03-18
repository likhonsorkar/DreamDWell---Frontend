import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthContext from '../context/AuthContext';
import { useForm } from 'react-hook-form';

const Registrations = () => {
    const navigate = useNavigate();
    const {signupUser} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit,watch,  formState: {errors}} = useForm();
    
    const onSubmit = async(data) => {
        setLoading(true);
        delete data.cpassword;
        try{
            const success = await  signupUser(data);
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
        <main className="min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12 relative overflow-hidden bg-orange-50/20">
            {/* Background Decorations */}
            <div className="absolute -top-20 -right-20 w-64 md:w-96 h-64 md:h-96 bg-orange-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-64 md:w-96 h-64 md:h-96 bg-orange-300 rounded-full blur-3xl opacity-20"></div>
            <div className="card w-full max-w-2xl bg-white/90 backdrop-blur-xl border border-white shadow-2xl z-10 overflow-hidden rounded-[2rem]">
                <div className="card-body p-6 md:p-12"> 
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">
                            Create <span className="text-orange-500">Account</span>
                        </h2>
                        <p className="text-gray-500 text-sm mt-2 font-medium">Join our community and find your next home</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Name Group: Responsive Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-gray-600">First Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    maxLength="150"
                                    placeholder="John" 
                                    className="input input-bordered focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white/50" 
                                    {...register("first_name", {required: "Fast Name is required"} )}
                                />
                                {errors.first_name && <span className="text-red-500 text-xs mt-1">{errors.first_name.message}</span>}
                            </div>
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-gray-600">Last Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    maxLength="150"
                                    placeholder="Doe" 
                                    className="input input-bordered focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white/50" 
                                    {...register("last_name", {required: "Last Name is required"} )}
                                />
                                {errors.last_name && <span className="text-red-500 text-xs mt-1">{errors.last_name.message}</span>}
                            </div>
                        </div>
                        {/* Email */}
                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-bold text-gray-600">Email Address</span>
                            </label>
                            <input 
                                type="email" 
                                maxLength="254"
                                placeholder="name@example.com" 
                                className="w-full input input-bordered focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white/50" 
                                {...register("email", {required: "Email is required"} )}
                                
                            />
                            {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                        </div>
                        {/* Address & Phone Group */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-gray-600">Phone Number</span>
                                </label>
                                <input 
                                    type="text" 
                                    maxLength="15"
                                    placeholder="8801XXXXXXXXX" 
                                    className="input input-bordered focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white/50" 
                                    {...register("phone", {required: "Phone is required"} )}
                                />
                                {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>}
                            </div>
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-gray-600">Address</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Mirpur, Dhaka" 
                                    className="input input-bordered focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white/50" 
                                    {...register("address", {required: "Address is required"} )}
                                />
                                {errors.address && <span className="text-red-500 text-xs mt-1">{errors.address.message}</span>}
                            </div>
                        </div>
                        {/* Password Group */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-gray-600">Password</span>
                                </label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="input input-bordered focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white/50" 
                                    {...register("password", { required: "Password is required", minLength: { value: 8, message: "Min 8 characters" } })}
                                />
                                {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
                            </div>
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-gray-600">Confirm Password</span>
                                </label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="input input-bordered focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white/50" 
                                    {...register("cpassword", { 
                                        required: "Please confirm password",
                                        validate: (val) => {
                                            if (watch('password') !== val) {
                                              return "Your passwords do not match";
                                            }
                                        },
                                    })}
                                />
                                {errors.cpassword && <span className="text-red-500 text-xs mt-1">{errors.cpassword.message}</span>}

                            </div>
                        </div>
                        <button className="btn bg-orange-500 hover:bg-orange-600 border-none text-white w-full h-14 shadow-xl shadow-orange-100 text-lg rounded-2xl mt-4" disabled={loading}>
                            {loading ? "Creating account...": "Create Account"}
                        </button>
                    </form>
                    <div className="divider my-8 text-xs text-gray-400 uppercase tracking-widest">Already have an account?</div>
                    <p className="text-center text-gray-500 font-medium">
                        Return to <Link to="/login" className="text-orange-600 font-black hover:underline ml-1">Log In</Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Registrations;