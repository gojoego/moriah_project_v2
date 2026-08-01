import { AdminPost } from "@/types/admin";


interface RecentPostsProps {
    posts: AdminPost[];
}


export default function RecentPosts({
    posts
}: RecentPostsProps) {

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

                    <p className="font-semibold">
                        {post.deceased_name}
                    </p>


                    <p className="text-sm text-gray-500">
                        {post.author_name}
                    </p>

                </div>

            ))}

        </div>
    );
}