import StyleReport from './Report.module.css'
import LowStock from './LowStock/LowStock'
import Header from '../../components/PageHeader/PageHeader'
import BarC from '../Dashboard/barChart/Bar'
import { useState, useEffect } from 'react'

export default function Report({ productsData = [] }) {
    // ป้องกันหน้าจอขาว
    const safeProducts = Array.isArray(productsData) ? productsData : [];
    
    // -- รายการใกล้หมดสต็อก ---
    const dynamicLowStock = safeProducts
        .filter(item => (item.quantity || 0) < (item.minStock || 0))
        .map(item => ({ ...item, type: "LowStock" }));

    const totalReport = dynamicLowStock.length;
    
    const strokeColor = () => {
        if (totalReport < 3) return '#00A63E';
        else if (totalReport <= 5) return '#FF6200'; 
        return '#FF0000';
    }

    const LowStockData = {
        header: {
            hName: "รายการสินค้าจำนวนใกล้หมดสต็อก", 
            hDescription: "สินค้าที่คงเหลือจำนวนต่ำกว่าหรือเท่าจุดแจ้งเตือน", 
            svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.7304 18L13.7304 4C13.556 3.6922 13.303 3.43618 12.9973 3.25806C12.6917 3.07995 12.3442 2.9861 11.9904 2.9861C11.6366 2.9861 11.2892 3.07995 10.9835 3.25806C10.6778 3.43618 10.4249 3.6922 10.2504 4L2.25042 18C2.0741 18.3054 1.98165 18.6519 1.98243 19.0045C1.98321 19.3571 2.0772 19.7032 2.25486 20.0078C2.43253 20.3124 2.68757 20.5646 2.99411 20.7388C3.30066 20.9131 3.64783 21.0032 4.00042 21H20.0004C20.3513 20.9996 20.6959 20.907 20.9997 20.7313C21.3035 20.5556 21.5556 20.3031 21.7309 19.9991C21.9062 19.6951 21.9985 19.3504 21.9984 18.9995C21.9983 18.6486 21.9059 18.3039 21.7304 18Z" stroke={strokeColor()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 9V13" stroke={strokeColor()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 17H12.01" stroke={strokeColor()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        }, 
        total: totalReport, 
        ItemData: dynamicLowStock
    };

    // --- 2. 🟢 รายการควรล้างสต็อก (30 วัน) ---
    const dynamicClearStock = safeProducts
        .filter(item => {
            const clearValue = item.clearStock;
            if (!clearValue) return false;

            const clearDate = new Date(clearValue);
            if (isNaN(clearDate.getTime())) return false;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const next30Days = new Date();
            next30Days.setDate(today.getDate() + 30);
            next30Days.setHours(23, 59, 59, 999);

            return clearDate <= next30Days;
        })
        .map(item => {
            const formattedDate = new Date(item.clearStock).toLocaleDateString('th-TH', {
                year: 'numeric', month: 'short', day: 'numeric'
            });

            return { 
                ...item, 
                type: "ClearStock", 
                expired: formattedDate, // ใช้ตัวแปร expired ส่งไปให้ Item.jsx แสดงผล
                EXP: item.clearStock    // ส่งวันที่ดิบไปเช็คสีแดง
            };
        });

    const ClearStockAmount = dynamicClearStock.length;

    const strokeColorC = () => {
        if (ClearStockAmount < 3) return '#00A63E';
        else if (ClearStockAmount <= 5) return '#FF6200';
        return '#FF0000';
    }

    const ClearStockData = {
        header: {
            hName: "รายการควรล้างสต็อก (ตกค้างในสต็อกนานตามกำหนด)", 
            hDescription: "สินค้าที่ควรล้างสต็อกเนื่องจากใกล้ถึงวันที่ตกค้างในสต็อก (30 วัน) หรือเลยวันที่ตกค้างในสต็อกแล้ว", 
            svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={strokeColorC()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6V12L16 14" stroke={strokeColorC()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        }, 
        total: ClearStockAmount, 
        ItemData: dynamicClearStock
    }

    // --- 3. รายการใกล้หมดอายุ (30 วัน) ---
    const dynamicExpiringSoon = safeProducts
        .filter(item => {
            const expireValue = item.EXP;
            if (!expireValue) return false;

            const expDate = new Date(expireValue);
            if (isNaN(expDate.getTime())) return false;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const next30Days = new Date();
            next30Days.setDate(today.getDate() + 30);
            next30Days.setHours(23, 59, 59, 999);

            return expDate <= next30Days;
        })
        .map(item => {
            const formattedDate = new Date(item.EXP).toLocaleDateString('th-TH', {
                year: 'numeric', month: 'short', day: 'numeric'
            });

            return { 
                ...item, 
                type: "ExpiringSoon", 
                expired: formattedDate 
            };
        });

    const ExpiringSoonAmount = dynamicExpiringSoon.length;
    
    const strokeColorE = () => {
        if (ExpiringSoonAmount < 3) return '#00A63E';
        else if (ExpiringSoonAmount <= 5) return '#FF6200';
        return '#FF0000';
    }

    const ExpiringSoonData = {
        header: {
            hName: "รายการใกล้หมดอายุ", 
            hDescription: "สินค้าหมดอายุภายใน 30 วัน หรือหมดอายุแล้ว", 
            svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={strokeColorE()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6V12L16 14" stroke={strokeColorE()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        }, 
        total: ExpiringSoonAmount, 
        ItemData: dynamicExpiringSoon
    };

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const res = await fetch('https://stockmight-backend.onrender.com/api/transaction/');
                if (res.ok) {
                    const transactions = await res.json();
                    if (!Array.isArray(transactions)) return;

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
    }, []);

    return (
         <div className={StyleReport.Report}>
            <header>
                <Header header="รายงานและการแจ้งเตือน" description="ภาพรวมและรายงานความสำคัญของระบบสินค้า" />
                {/*<div className={StyleReport["export-report"]}>
                    <img src="/Icon/8-Reports/Icon-2.svg" alt="export" />
                    <p>ส่งออกรายงาน (CSV)</p>
                </div>*/}
            </header>
            
            {/* 🟢 แสดงผลข้อมูล LowStock ทั้ง 3 กล่องเรียงกัน */}
            <div className={StyleReport["risky-container"]}>
                 <LowStock {...LowStockData} />
                 <LowStock {...ExpiringSoonData} />
                 <LowStock {...ClearStockData} />
            </div>
            
            <div className={StyleReport["chart-container"]} >
                <p>สรุปรับเข้า-เบิกออก (7 วันล่าสุด)</p>
                {chartData.length > 0 ? (
                    <BarC data={chartData} />
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '50px', color: 'var(--gray)' }}>กำลังโหลดข้อมูลกราฟ...</p>
                )}
            </div>
         </div>
    )
}