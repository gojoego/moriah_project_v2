const users = [
    {
        id:1,
        name:"Joe",
        email:"joe@test.com"
    },
    {
        id:2,
        name:"Sarah",
        email:"sarah@test.com"
    },
    {
        id:3,
        name:"Mike",
        email:"mike@test.com"
    }
];

export default function RecentUsers(){
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
                        {user.name}
                    </p>

                    <p className="text-sm text-gray-500">
                        {user.email}
                    </p>
                </div>

            ))}

        </div>
    );
}