import { AdminUser } from "@/types/admin";


interface RecentUsersProps {
    users: AdminUser[];
}


export default function RecentUsers({
    users
}: RecentUsersProps) {

    return (
        <div className="border rounded-xl p-5">

            <h2 className="text-xl font-bold mb-4">
                Recent Users
            </h2>


            {users.map(user => (

                <div
                    key={user.id}
                    className="border-b py-2"
                >

                    <p>
                        {user.display_name}
                    </p>


                    <p className="text-sm text-gray-500">
                        {user.email}
                    </p>

                </div>

            ))}

        </div>
    );
}