const posts = [
    {
        id:1,
        title:"My first post",
        author:"Joe"
    },
    {
        id:2,
        title:"Remembering someone",
        author:"Sarah"
    }
];

export default function RecentPosts(){
    return (
        <div className="border rounded-xl p-5">
            <h2 className="text-xl font-bold mb-4">
                Recent Posts
            </h2>

            {posts.map(post => (

                <div
                    key={post.id}
                    className="border-b py-2"
                    >
                    <p>
                        {post.title}
                    </p>

                    <p className="text-sm text-gray-500">
                        {post.author}
                    </p>
                </div>

                ))}        

        </div>
    );
}