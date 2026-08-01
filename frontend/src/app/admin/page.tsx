"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import StatCard from "@/components/admin/StatCard";
import RecentUsers from "@/components/admin/RecentUsers";
import RecentPosts from "@/components/admin/RecentPosts";

import { fetchAdminUsers, fetchAdminPosts } from "@/lib/api/admin";

import { AdminUser, AdminPost } from "@/types/admin";


export default function AdminHomePage() {

    const [users, setUsers] = useState<AdminUser[]>([]);
    const [posts, setPosts] = useState<AdminPost[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        async function loadDashboardData() {

            try {

                const usersData = await fetchAdminUsers(5);
                const postsData = await fetchAdminPosts(5);

                setUsers(usersData);
                setPosts(postsData);

            } catch (err) {

                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Failed to load dashboard data");
                }

            } finally {

                setLoading(false);

            }
        }


        loadDashboardData();

    }, []);



    if (loading) {
        return (
            <div className="p-8">
                Loading dashboard...
            </div>
        );
    }



    if (error) {
        return (
            <div className="p-8">
                Error: {error}
            </div>
        );
    }



    return (
        <div className="flex flex-col md:flex-row">

            <Sidebar />


            <main className="flex-1 p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Dashboard
                </h1>


                <div className="grid grid-cols-4 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">

                    <StatCard
                        title="Total Users"
                        value={users.length}
                    />


                    <StatCard
                        title="Total Posts"
                        value={posts.length}
                    />


                    <StatCard
                        title="New Users"
                        value={users.length}
                    />


                    <StatCard
                        title="Recent Posts"
                        value={posts.length}
                    />

                </div>



                <div className="grid grid-cols-2 gap-6 lg:grid-cols-2">

                    <RecentUsers
                        users={users}
                    />


                    <RecentPosts
                        posts={posts}
                    />

                </div>

            </main>

        </div>
    );
}