"use client";

export default function ProfilePage(){
    const user = {
        name: "Joe",
        email: "joe@moriahproject.com",
        birthday: "1996-08-22",
        photoUrl: null,
    };

    return (
        <main className="max-w-2xl mx-auto py-16 space-y-8">
            <header className="flex items-center gap-6">
                <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-xl">
                    {user.name.charAt(0)}
                </div>
                
                <div>
                    <h1 className="text-3xl font-semibold">
                        {user.name}
                    </h1>
                    <p className="moriah-muted text-sm">
                        {user.email}
                    </p>
                </div>
            </header>

            <section className="space-y-4">
                <div>
                    <label className="block text-sm moriah-muted">
                        birthday 
                    </label>
                    <input 
                        type="date"
                        value={user.birthday}
                        className="moriah-input"
                        disabled     
                    />
                </div>

                <button className="moriah-button-outline">
                    reset password 
                </button>
            </section>
        </main>
    );
}