import dbStyles from './Dashboard.module.css';
import Detail from './OverallDetail/OverallDetail';
import BarC from './barChart/Bar';
import LowStock from './LowStock/LowStock';
import Header from '../../components/PageHeader/PageHeader';
import { useState, useEffect } from 'react';

export default function Dashboard({ productsData }) {
    const [sum, setSum] = useState(0);
    const [amountAllProduct, setAmountAllProduct] = useState(0);
    const [lowStock, setLowStock] = useState(0);
    const [todayImport, setTodayImport] = useState(0);
    const [todayExport, setTodayExport] = useState(0);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const safeProductData = Array.isArray(productsData) ? productsData : [];

        setSum(safeProductData.length);

        const totalAmount = safeProductData.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);
        setAmountAllProduct(totalAmount);

        const lowStockCount = safeProductData.filter(item => (item.quantity || 0) < (item.minStock || 0)).length;
        setLowStock(lowStockCount);

        async function fetchTransactions() {
            try {
                const res = await fetch('https://stockmight-backend.onrender.com/api/transaction/');
                if (res.ok) {
                    const transactions = await res.json();
                    if (!Array.isArray(transactions)) return;
                    
                    const startOfToday = new Date();
                    startOfToday.setHours(0, 0, 0, 0);
                    
                    const endOfToday = new Date();
                    endOfToday.setHours(23, 59, 59, 999);

                    let inToday = 0;
                    let outToday = 0;

                    transactions.forEach(t => {
                        if (!t || !t.date) return; // กันพังถ้าข้อมูลแหว่ง
                        const tDate = new Date(t.date).getTime();
                        if (tDate >= startOfToday.getTime() && tDate <= endOfToday.getTime()) {
                            if (t.type === 'import') inToday += (Number(t.quantity) || 0);
                            if (t.type === 'export') outToday += (Number(t.quantity) || 0);
                        }
                    });

                    setTodayImport(inToday);
                    setTodayExport(outToday);

                    const past7Days = [];
                    for (let i = 6; i >= 0; i--) {
                        const d = new Date();
                        d.setDate(d.getDate() - i);
                        
                        const dateString = d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
                        const startOfDay = new Date(d).setHours(0, 0, 0, 0);
                        const endOfDay = new Date(d).setHours(23, 59, 59, 999);

                        let dailyImport = 0;
                        let dailyExport = 0;

                        transactions.forEach(t => {
                            if (!t || !t.date) return;
                            const tTime = new Date(t.date).getTime();
                            if (tTime >= startOfDay && tTime <= endOfDay) {
                                if (t.type === 'import') dailyImport += (Number(t.quantity) || 0);
                                if (t.type === 'export') dailyExport += (Number(t.quantity) || 0);
                            }
                        });

                        past7Days.push({ date: dateString, Import: dailyImport, Export: dailyExport });
                    }
                    
                    setChartData(past7Days);
                }
            } catch (err) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูล Transaction:", err);
            }
        }

        fetchTransactions();

    }, [productsData]);

    const dashboardData = [
        { src: '/Icon/1-Home/Icon-6.svg', text: "จำนวนรายการสินค้า (SKU)", data: sum },
        { src: '/Icon/1-Home/Icon-5.svg', text: "จำนวนคงเหลือรวม", data: `${amountAllProduct} หน่วย` },
        { src: '/Icon/1-Home/Icon-4.svg', text: "รายการใกล้หมด", data: lowStock, alert: lowStock > 0 ? "true" : null },
        { src: '/Icon/1-Home/Icon-2.svg', text: "จำนวนรายการใกล้หมดอายุ (30 วัน)", data: "0" },
        { src: '/Icon/1-Home/Icon-1.svg', text: "รับเข้าสินค้าวันนี้", data: `${todayImport} หน่วย` },
        { src: '/Icon/1-Home/Icon-10.svg', text: "เบิกออกสินค้าวันนี้", data: `${todayExport} หน่วย` }
    ];

    const safeProductData = Array.isArray(productsData) ? productsData : [];
    const lowStockItems = safeProductData.filter(item => (item.quantity || 0) < (item.minStock || 0));

    return (
        <div className={dbStyles.Dashboard}>
            <Header header="แดชบอร์ดคลังสินค้า" description="ภาพรวมและสถิติการจัดการคลังสินค้า" />
            
            <div className={dbStyles["overall-container"]}>
                {
                    dashboardData.map((item, index) => {
                        return <Detail key={index} src={item.src} text={item.text} data={item.data} alert={item.alert} />
                    })
                }
            </div>

            <div className={dbStyles["weekly"]}>
                <div className={dbStyles["bar-chart-container"]}>
                    {chartData.length > 0 ? (
                         <BarC data={chartData} />
                    ) : (
                         <p style={{ textAlign: 'center', marginTop: '50px', color: 'var(--gray)' }}>กำลังโหลดข้อมูลกราฟ...</p>
                    )}
                </div>
                <div className={dbStyles["low-stock"]}>
                    <LowStock items={lowStockItems} />
                </div>
            </div>
        </div>
    )
}