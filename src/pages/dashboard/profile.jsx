import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router';
import useAuthContext from '../../hooks/useAuthContext';
import { User, Phone, MapPin } from 'lucide-react';
const Profile = () => {
    const { setHeading } = useOutletContext();
    const { user, updateUserProfile, ChangePassword } = useAuthContext();
    const [editable, setEditable] = useState(false);
    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const [status, setStatus] = useState("idle");
    useEffect(() => {
        const title = "User Profile"
        document.title = title;
        setHeading(title);
    }, [setHeading]);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    useEffect(() => {
        if (user) {
            reset(user);
        }
    }, [user, reset]);
    const onSubmit = async (data) => {
        setStatus("wait");
        try {
            const profilePayload = { 
                first_name: data.first_name, 
                last_name: data.last_name, 
                email: data.email, 
                address: data.address, 
                phone: data.phone 
            };
            await updateUserProfile(profilePayload);
            if (showPasswordSection && data.newpassword) {
                const passwordPayload = { 
                    new_password: data.newpassword, 
                    current_password: data.password 
                };
                await ChangePassword(passwordPayload);
            }
            setEditable(false);
        } catch (error) {
            console.error(error);
        } finally {
            setStatus("success");
        }
    };
    return (
        <div className="max-w-4xl mx-auto">
            {status === "wait" && (<div className='text-center m-2'><span className="loading loading-bars loading-xl text-orange-500"></span></div>)}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-100 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2 border-b border-gray-100 pb-4 mb-4 flex items-center gap-3">
                        <User className="text-orange-500" size={28} />
                        <h3 className="text-2xl font-black text-gray-800">Profile Information</h3>
                    </div>
                    <div>
                        <label className="label font-bold text-gray-600">First Name</label>
                        <input type="text" disabled={!editable} {...register("first_name", { required: true })} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                    </div>
                    <div>
                        <label className="label font-bold text-gray-600">Last Name</label>
                        <input type="text" disabled={!editable} {...register("last_name", { required: true })} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                    </div>

                    <div className="md:col-span-2 border-b border-gray-100 pb-4 my-4 flex items-center gap-3">
                        <Phone className="text-orange-500" size={28} />
                        <h3 className="text-2xl font-black text-gray-800">Contact Information</h3>
                    </div>
                    <div>
                        <label className="label font-bold text-gray-600">Phone</label>
                        <input {...register("phone", { required: true })} disabled={!editable} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                    </div>
                    <div>
                        <label className="label font-bold text-gray-600">Email</label>
                        <input disabled {...register("email", { required: true })} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="label font-bold text-gray-600 inline-flex items-center gap-1"><MapPin size={14}/> Address</label>
                        <input disabled={!editable} {...register("address", { required: true })} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                    </div>
                    {editable && (
                        <div className="md:col-span-2 mt-8">
                            <button type="button" onClick={() => setShowPasswordSection(!showPasswordSection)} className={`flex items-center gap-2 font-bold transition-all ${showPasswordSection ? 'text-red-500' : 'text-orange-600 hover:text-orange-700'}`}>
                                {showPasswordSection ? '− Hide Password Settings' : '+ Change Password?'}
                            </button>
                            {showPasswordSection && (
                                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 mt-4 bg-orange-50/50 rounded-3xl border border-orange-100 animate-in fade-in duration-300">
                                    <div className="form-control">
                                        <label className="label font-bold text-gray-600 text-sm">Current Password</label>
                                        <input type="password" placeholder="••••••••" {...register("password", { required: showPasswordSection, minLength: { value: 8, message: "Min 8 characters" } })} className={`input input-bordered w-full rounded-2xl bg-white border-gray-100 focus:border-orange-400 ${errors.password ? 'border-red-500' : ''}`} />
                                        {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label font-bold text-gray-600 text-sm">New Password</label>
                                        <input type="password" placeholder="••••••••" {...register("newpassword", { required: showPasswordSection, minLength: { value: 8, message: "Min 8 characters" } })} className={`input input-bordered w-full rounded-2xl bg-white border-gray-100 focus:border-orange-400 ${errors.newpassword ? 'border-red-500' : ''}`} />
                                        {errors.newpassword && <span className="text-red-500 text-xs mt-1">{errors.newpassword.message}</span>}
                                    </div>
                                    <div className="form-control md:col-span-2">
                                        <label className="label font-bold text-gray-600 text-sm">Confirm New Password</label>
                                        <input type="password" placeholder="••••••••" {...register("cpassword", { required: showPasswordSection, validate: (val) => watch('newpassword') === val || "Your passwords do not match" })} className={`input input-bordered w-full rounded-2xl bg-white border-gray-100 focus:border-orange-400 ${errors.cpassword ? 'border-red-500' : ''}`} />
                                        {errors.cpassword && <span className="text-red-500 text-xs mt-1">{errors.cpassword.message}</span>}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="mt-12">
                    {!editable ? (
                        <button type="button" onClick={() => setEditable(true)} className="btn bg-orange-500 hover:bg-orange-600 border-none text-white w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-orange-100 transition-all active:scale-95">
                            Edit Profile
                        </button>
                    ) : (
                        <div className='w-full flex gap-4'>
                            <button type="submit" className="btn bg-green-500 hover:bg-green-600 border-none text-white flex-1 h-14 rounded-2xl text-lg font-bold shadow-xl shadow-green-100 transition-all active:scale-95">
                                Save Changes
                            </button>
                            <button type="button" onClick={() => { setEditable(false); reset(user); }} className="btn bg-gray-200 hover:bg-gray-300 border-none text-gray-800 flex-1 h-14 rounded-2xl text-lg font-bold transition-all active:scale-95">
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};
export default Profile;