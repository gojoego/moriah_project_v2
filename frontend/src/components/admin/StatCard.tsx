type StatCardProps = {
    title: string;
    value: number;
}

export default function StatCard({
    title,
    value
}: StatCardProps){
    return (
        <div className="border rounded-xl p-5">
            <h2 className="text-gray-500">
                {title}
            </h2>
            <p className="text-4xl font-bold">
                {value}
            </p>
        </div>
    );
}