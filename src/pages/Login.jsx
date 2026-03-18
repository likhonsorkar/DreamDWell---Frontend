import { useContext , useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";
const Login = () => {
    const {user, loginUser } = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [param] = useSearchParams();
    const next = param.get("next") || "/dashboard";
    const onSubmit = async(data) => {
      setLoading(true)
      try {
        const succes = await  loginUser(data);
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
        <main className="min-h-screen lg:min-h-[85vh] flex items-center justify-center p-4 md:p-8 lg:p-12 relative overflow-hidden bg-orange-50/20">
            <div className="absolute -top-10 -right-10 w-40 md:w-80 h-40 md:h-80 bg-orange-200 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-10 -left-10 w-40 md:w-80 h-40 md:h-80 bg-orange-300 rounded-full blur-3xl opacity-20"></div>
            <div className="card w-full max-w-md bg-white/90 backdrop-blur-xl border border-white shadow-2xl z-10">
                <div className="card-body p-6 md:p-10 lg:p-12">
                <div className="text-center mb-6 md:mb-10">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-800">Welcome Back</h2>
                    <p className="text-gray-500 text-sm mt-2">Find your perfect home today</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text font-bold text-gray-600">Email Address</span>
                    </label>
                    <input 
                        type="email" 
                        placeholder="email@example.com" 
                        className={`w-full input input-bordered focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white ${errors.email ? "input-error": ""}`} 
                        {...register("email", {required: "Email is required"} )}
                    /> <br /> 
                    {errors.email && (<span className="label-text-alt text-error"> {errors.email.message} </span>)}
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text font-bold text-gray-600">Password</span>
                        <Link to="/password/reset" className="label-text-alt link link-hover text-orange-600 font-bold">Forgot?</Link>
                    </label>
                    <input 
                        type="password" 
                        placeholder="••••••••" 
                        className={`w-full input input-bordered focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white ${errors.password ? "input-error": ""}`} 
                        {...register("password", {required: "Password is required"} )}
                    />
                    <br />
                    {errors.password && (<span className="label-text-alt text-error"> {errors.password.message} </span>)}
                    </div>
                    <button className="btn bg-orange-500 hover:bg-orange-600 border-none text-white w-full h-12 md:h-14 shadow-xl shadow-orange-100 text-lg" desabled={loading}>
                    {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <div className="divider my-6 md:my-8 text-xs text-gray-400 uppercase tracking-widest">or</div>
                
                <p className="text-center text-sm text-gray-500">
                    New here? <Link to="/signup" className="text-orange-600 font-black hover:underline">Create an account</Link>
                </p>
                </div>
            </div>
        </main>
    );
};
export default Login;