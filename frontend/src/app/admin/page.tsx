"use client"

import Sidebar from "@/components/layout/Sidebar";
import StatCard from "@/components/admin/StatCard";
import RecentUsers from "@/components/admin/RecentUsers";
import RecentPosts from "@/components/admin/RecentPosts";

export default function AdminHomePage() {

    return (
        <div className="flex">

            <Sidebar/>

            <main className="flex-1 p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Dashboard
                </h1>
                
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <StatCard
                        title="Total Users"
                        value={160}
                    />

                    <StatCard
                        title="Total Posts"
                        value={540}
                    />

                    <StatCard
                        title="New Users"
                        value={12}
                    />

                    <StatCard
                        title="Recent Posts"
                        value={8}
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">

                    <RecentUsers/>
                    
                    <RecentPosts/>
                    
                </div>            
            </main>

        </div>
    );
}