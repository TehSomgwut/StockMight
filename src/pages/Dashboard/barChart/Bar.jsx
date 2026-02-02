import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BarC() {
    const data = [
        { date: "1 ก.พ. ", imp: 60, exp: 30},
        { date: "2 ก.พ. ", imp: 40, exp: 50},
        { date: "3 ก.พ. ", imp: 70, exp: 40},
        { date: "4 ก.พ. ", imp: 50, exp: 30},
        { date: "5 ก.พ. ", imp: 50, exp: 40},
        { date: "6 ก.พ. ", imp: 30, exp: 20},
        { date: "7 ก.พ. ", imp: 20, exp: 30}
    ]
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="imp" fill="#10B981" name="Import" />
                <Bar dataKey="exp" fill="#1904FC" name="Export" />
            </BarChart>
        </ResponsiveContainer>
    )
}