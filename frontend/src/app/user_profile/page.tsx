"use client";

export default function ProfilePage(){
    const user = {
        name: "Joe",
        email: "joe@moriahproject.com",
        birthday: "1996-08-22",
        photoUrl: null,
    };

    return (
        <main>
            <header>
                <div>
                    {user.name.charAt(0)}
                </div>
                
                <div>
                    <h1>
                        {user.name}
                    </h1>
                    <p>
                        {user.email}
                    </p>
                </div>
            </header>

            <section>
                <div>
                    <label>
                        birthday 
                    </label>
                    <input 
                        type="date"
                        value={user.birthday}
                        disabled     
                    />
                </div>

                <button>
                    reset password 
                </button>
            </section>
        </main>
    );
}