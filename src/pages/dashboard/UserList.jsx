import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, UserCircle, Search, Eye, X, ShieldCheck } from 'lucide-react';
import useAuthContext from '../../hooks/useAuthContext';
import apiClient from '../../services/api-client';
import { useOutletContext } from 'react-router';

const UserList = () => {
    const { authTokens } = useAuthContext();
    const { setHeading, setLoading, loading } = useOutletContext();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); 

    useEffect(() => {
        const title = "User List"
        document.title = title;
        setHeading(title);
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get("/dashboard/profile/", {
                headers: { Authorization: `JWT ${authTokens?.access}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("User fetch error", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-6 text-sm font-bold text-gray-400 uppercase tracking-widest">User Profile</th>
                                <th className="p-6 text-sm font-bold text-gray-400 uppercase tracking-widest">Contact</th>
                                <th className="p-6 text-sm font-bold text-gray-400 uppercase tracking-widest">Location</th>
                                <th className="p-6 text-sm font-bold text-gray-400 uppercase tracking-widest text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="p-20 text-center text-orange-500">
                                        <span className="loading loading-bars loading-lg"></span>
                                    </td>
                                </tr>
                            ) : users.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50/30 transition-all group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            {u.profile_image ? (
                                                <img src={u.profile_image} className="w-12 h-12 rounded-xl object-cover" alt="User" />
                                            ) : (
                                                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-400">
                                                    <UserCircle size={24} />
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-black text-gray-800 tracking-tight">{u.first_name} {u.last_name}</div>
                                                <div className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md w-fit font-bold uppercase mt-1">ID: #{u.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 text-sm">
                                        <div className="flex items-center gap-2 text-gray-600 font-medium mb-1">
                                            <Mail size={14} className="text-gray-400" /> {u.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Phone size={14} /> {u.phone || "No phone"}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="text-sm text-gray-600 font-medium truncate max-w-[200px]">
                                            <MapPin size={14} className="inline mr-1 text-orange-400" />
                                            {u.address || "Address not provided"}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex justify-center">
                                            <button 
                                                onClick={() => setSelectedUser(u)}
                                                className="bg-orange-50 text-orange-600 p-3 rounded-2xl hover:bg-orange-600 hover:text-white transition-all active:scale-95"
                                            >
                                                <Eye size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedUser && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[3rem] max-w-lg w-full p-8 relative shadow-2xl animate-in zoom-in duration-300">
                        <button 
                            onClick={() => setSelectedUser(null)}
                            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400"
                        >
                            <X size={24} />
                        </button>
                        <div className="text-center">
                            {selectedUser.profile_image ? (
                                <img src={selectedUser.profile_image} className="w-24 h-24 rounded-[2rem] mx-auto object-cover border-4 border-orange-50 mb-4" alt="Profile" />
                            ) : (
                                <div className="w-24 h-24 rounded-[2rem] bg-gray-100 mx-auto flex items-center justify-center text-gray-400 mb-4">
                                    <UserCircle size={48} />
                                </div>
                            )}
                            <h3 className="text-2xl font-black text-gray-800">{selectedUser.first_name} {selectedUser.last_name}</h3>
                            <p className="text-orange-500 font-bold text-xs uppercase tracking-widest mt-1 italic">{selectedUser.bio || "Active Member"}</p>
                            <hr className="my-6 border-gray-100" />
                            <div className="space-y-4 text-left">
                                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                                    <div className="bg-white p-2 rounded-xl text-gray-400 shadow-sm"><Mail size={20} /></div>
                                    <div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase block">Email Address</span>
                                        <span className="text-gray-700 font-bold">{selectedUser.email}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                                    <div className="bg-white p-2 rounded-xl text-gray-400 shadow-sm"><Phone size={20} /></div>
                                    <div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase block">Phone Number</span>
                                        <span className="text-gray-700 font-bold">{selectedUser.phone || "N/A"}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                                    <div className="bg-white p-2 rounded-xl text-gray-400 shadow-sm"><MapPin size={20} /></div>
                                    <div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase block">Full Address</span>
                                        <span className="text-gray-700 font-bold text-sm leading-tight inline-block">{selectedUser.address || "No address on file"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;