"use client";

import { useEffect, useState } from "react";
import { fetchAdminUsers } from "@/lib/api/admin";
import { AdminUser } from "@/types/admin"

export default function AdminUsersPage() {

    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        async function loadUsers() {

            try {

                const data = await fetchAdminUsers();

                setUsers(data);

            } catch (err) {

                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Failed to load users");
                }

            } finally {

                setLoading(false);

            }
        }


        loadUsers();

    }, []);



    if (loading) {
        return (
            <div>
                Loading users...
            </div>
        );
    }



    if (error) {
        return (
            <div>
                Error: {error}
            </div>
        );
    }



    return (

        <main className="p-8">

            <h1 className="text-3xl font-bold mb-6">
                Users
            </h1>


            <div className="border rounded-lg">

                {users.map((user) => (

                    <div
                        key={user.id}
                        className="border-b p-4 flex justify-between"
                    >

                        <div>
                            <p className="font-semibold">
                                {user.display_name}
                            </p>

                            <p className="text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>


                        <div>
                            {user.role}
                        </div>


                    </div>

                ))}

            </div>

        </main>

    );
}