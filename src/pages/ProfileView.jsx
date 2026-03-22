import { useEffect } from 'react';
import { useParams } from 'react-router';
import useAuthContext from '../hooks/useAuthContext';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const ProfileView = () => {
    const { id } = useParams();
    const { getUserProfile } = useAuthContext();

    const { data: profile, status, error } = useQuery({
        queryKey: ['user-profile', id],
        queryFn: async () => {
            const response = await getUserProfile(id);
            if (response) {
                return response.data;
            }
            throw new Error("Profile not found.");
        },
        enabled: !!id
    });

    useEffect(() => {
        if (profile) {
            document.title = `${profile.first_name} ${profile.last_name} - User Profile`;
        }
    }, [profile]);

    if (status === "pending") {
        return (
            <main className="container mx-auto px-4 py-8 text-center">
                <span className="loading loading-bars loading-xl text-primary"></span>
                <p className="mt-4 text-gray-500">Loading user profile...</p>
            </main>
        );
    }

    if (status === "error") {
        return (
            <main className="container mx-auto px-4 py-8 text-center text-red-500 font-bold">
                {error.message || "Failed to fetch profile."}
            </main>
        );
    }

    if (!profile) return null;

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
                    <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-primary pl-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <Mail className="text-primary" size={24} />
                            <span className="text-gray-700">{profile.email}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <Phone className="text-primary" size={24} />
                            <span className="text-gray-700">{profile.phone || "N/A"}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <MapPin className="text-primary" size={24} />
                        <span className="text-gray-700">{profile.address || "N/A"}</span>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfileView;

