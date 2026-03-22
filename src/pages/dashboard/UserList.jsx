import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, UserCircle, X, Eye } from 'lucide-react';
import apiClient from '../../services/api-client';
import { useOutletContext } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { UserTableSkeleton } from '../../components/dashboard/DashboardSkeletons';

const UserList = () => {
    const { setHeading } = useOutletContext();
    const [selectedUser, setSelectedUser] = useState(null); 

    useEffect(() => {
        const title = "User List";
        document.title = title;
        setHeading(title);
    }, [setHeading]);

    const { data: users = [], isLoading, status } = useQuery({
        queryKey: ['user-list'],
        queryFn: async () => {
            const response = await apiClient.get("/dashboard/profile/");
            return response.data.results;
        }
    });

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-0">
            <div className="bg-base-100 rounded-[2.5rem] shadow-xl shadow-base-200 border border-base-200 overflow-hidden transition-all duration-500">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-base-200/50 border-b border-base-200">
                                <th className="p-6 text-sm font-bold text-base-content/40 uppercase tracking-[0.2em]">User Profile</th>
                                <th className="p-6 text-sm font-bold text-base-content/40 uppercase tracking-[0.2em]">Contact</th>
                                <th className="p-6 text-sm font-bold text-base-content/40 uppercase tracking-[0.2em]">Location</th>
                                <th className="p-6 text-sm font-bold text-base-content/40 uppercase tracking-[0.2em] text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-200">
                            {status === "success" && users.map((u) => (
                                <tr key={u.id} className="hover:bg-base-200/30 transition-all group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            {u.profile_image ? (
                                                <img src={u.profile_image} className="w-12 h-12 rounded-xl object-cover ring-2 ring-primary/10" alt="User" />
                                            ) : (
                                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary ring-2 ring-primary/5">
                                                    <UserCircle size={24} />
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-black text-base-content tracking-tight text-lg">{u.first_name} {u.last_name}</div>
                                                <div className="text-[10px] bg-base-200 text-base-content/50 px-2 py-0.5 rounded-md w-fit font-black uppercase mt-1 tracking-widest">ID: #{u.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 text-sm">
                                        <div className="flex items-center gap-2 text-base-content/70 font-bold mb-1">
                                            <Mail size={14} className="text-primary" /> {u.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-base-content/40 font-medium">
                                            <Phone size={14} /> {u.phone || "No phone"}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="text-sm text-base-content/60 font-bold truncate max-w-[200px]">
                                            <MapPin size={14} className="inline mr-1 text-primary" />
                                            {u.address || "Address not provided"}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex justify-center">
                                            <button 
                                                onClick={() => setSelectedUser(u)}
                                                className="bg-primary/10 text-primary p-4 rounded-2xl hover:bg-primary hover:text-white transition-all active:scale-90 shadow-lg shadow-primary/5"
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
                {isLoading && <UserTableSkeleton />}
            </div>
            {selectedUser && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-base-100 rounded-[3rem] max-w-lg w-full p-10 relative shadow-2xl animate-in zoom-in duration-300 border border-white/10">
                        <button 
                            onClick={() => setSelectedUser(null)}
                            className="absolute top-8 right-8 p-2 hover:bg-base-200 rounded-full transition-all text-base-content/40"
                        >
                            <X size={24} />
                        </button>
                        <div className="text-center">
                            {selectedUser.profile_image ? (
                                <img src={selectedUser.profile_image} className="w-28 h-24 rounded-[2rem] mx-auto object-cover border-4 border-primary/20 mb-6 shadow-xl" alt="Profile" />
                            ) : (
                                <div className="w-24 h-24 rounded-[2rem] bg-base-200 mx-auto flex items-center justify-center text-base-content/20 mb-6">
                                    <UserCircle size={48} />
                                </div>
                            )}
                            <h3 className="text-3xl font-black text-base-content tracking-tighter">{selectedUser.first_name} {selectedUser.last_name}</h3>
                            <p className="text-primary font-black text-xs uppercase tracking-[0.2em] mt-2 opacity-80">{selectedUser.bio || "Active Member"}</p>
                            
                            <div className="divider my-8 opacity-50"></div>
                            
                            <div className="space-y-4 text-left">
                                <div className="flex items-center gap-4 bg-base-200/50 p-5 rounded-3xl border border-base-200">
                                    <div className="bg-base-100 p-3 rounded-2xl text-primary shadow-sm ring-1 ring-base-200"><Mail size={20} /></div>
                                    <div>
                                        <span className="text-[10px] font-black text-base-content/30 uppercase tracking-widest block mb-0.5">Email Address</span>
                                        <span className="text-base-content font-black">{selectedUser.email}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-base-200/50 p-5 rounded-3xl border border-base-200">
                                    <div className="bg-base-100 p-3 rounded-2xl text-primary shadow-sm ring-1 ring-base-200"><Phone size={20} /></div>
                                    <div>
                                        <span className="text-[10px] font-black text-base-content/30 uppercase tracking-widest block mb-0.5">Phone Number</span>
                                        <span className="text-base-content font-black">{selectedUser.phone || "Not Provided"}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-base-200/50 p-5 rounded-3xl border border-base-200">
                                    <div className="bg-base-100 p-3 rounded-2xl text-primary shadow-sm ring-1 ring-base-200"><MapPin size={20} /></div>
                                    <div>
                                        <span className="text-[10px] font-black text-base-content/30 uppercase tracking-widest block mb-0.5">Full Address</span>
                                        <span className="text-base-content font-black text-sm leading-tight">{selectedUser.address || "No address details found"}</span>
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
