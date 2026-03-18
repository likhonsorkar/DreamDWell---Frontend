import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAuthContext from '../hooks/useAuthContext';
import { Mail, Phone, MapPin } from 'lucide-react';
const ProfileView = () => {
    const { id } = useParams();
    const { getUserProfile } = useAuthContext();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getUserProfile(id);
                if (response) {
                    setProfile(response.data);
                    document.title = `${response.data.first_name} ${response.data.last_name} - User Profile`;
                } else {
                    setError("Profile not found.");
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to fetch profile. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchProfile();
        }
    }, []);
    if (loading) {
        return (
            <main className="container mx-auto px-4 py-8 text-center">
                <span className="loading loading-bars loading-xl text-orange-500"></span>
                <p className="mt-4 text-gray-500">Loading user profile...</p>
            </main>
        );
    }
    if (error) {
        return (
            <main className="container mx-auto px-4 py-8 text-center text-red-500 font-bold">
                {error}
            </main>
        );
    }
    if (!profile) {
        return (
            <main className="container mx-auto px-4 py-8 text-center text-gray-500">
                Profile data not available.
            </main>
        );
    }
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-100 border border-gray-100">
                <div className="text-center mb-10">
                    <div className="avatar mb-6">
                        <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden mx-auto">
                            <img src={profile.profile_image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt={`${profile.first_name}'s profile`} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-black text-gray-800">{profile.first_name} {profile.last_name}</h1>
                    <p className="text-gray-500 text-lg mt-2">{profile.bio}</p>
                </div>

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <Mail className="text-orange-500" size={24} />
                            <span className="text-gray-700">{profile.email}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <Phone className="text-orange-500" size={24} />
                            <span className="text-gray-700">{profile.phone || "N/A"}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <MapPin className="text-orange-500" size={24} />
                        <span className="text-gray-700">{profile.address || "N/A"}</span>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfileView;