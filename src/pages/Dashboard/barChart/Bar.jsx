import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BarC({ data }) {
    let key=[]
    for(let K in data[0]) {
        key.push(K)
    }
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey={key[0]} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={key[1]} fill="#10B981" name={key[1]} />
                <Bar dataKey={key[2]} fill="#1904FC" name={key[2]} />
            </BarChart>
        </ResponsiveContainer>
    )
}