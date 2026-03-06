import StyleHistory from './History.module.css';
import StyleExport from '../Request/Export/Export.module.css'
import Log from './Log/Log'
import Header from '../../components/PageHeader/PageHeader'
import { useState, useEffect } from 'react'
import io from 'socket.io-client';
const socket = io('https://stockmight-backend.onrender.com')

export default function History() {
    const [ data, setData ] = useState([])
    const [ searchQuery, setSearchQuery ] = useState('');

    useEffect(() => {
        async function getHistory() {
            const res = await fetch('https://stockmight-backend.onrender.com/api/transaction/', {method: 'GET'})
            if (res.ok) {
                const transaction = await res.json()
                setData(transaction.reverse())
            }
            else {
                window.alert('ไม่พบข้อมูล โปรดลองอีกครั้งภายหลัง')
            }
        }

        getHistory()
        socket.on('updateTransaction', () => getHistory())
        return () => {socket.off('updateTransaction')}
    }, [])
    const filteredData = data.filter((item) => {
        if (!searchQuery) return true; // ถ้าช่องค้นหาว่าง ให้แสดงทั้งหมด
        
        const lowerCaseQuery = searchQuery.toLowerCase();
        const sku = item.product?.code?.toLowerCase() || item.code?.toLowerCase() || "";
        const name = item.product?.name?.toLowerCase() || item.name?.toLowerCase() || "";

        return sku.includes(lowerCaseQuery) || name.includes(lowerCaseQuery);
    });

    return (
         <div className={StyleHistory.History}>
            <Header header="ประวัติการเคลื่อนไหวสต็อก" description="บันทึกการรับเข้า-เบิกออกทั้งหมดพร้อม Audit Trail" />
            <div className={StyleExport.search}>
                <p>เลือกสินค้า</p>
                <label htmlFor="search-request">
                    <img src="/Icon/4-Receive-issue/Icon.svg" />
                    <input 
                        type='text' 
                        placeholder='ค้นหาด้วย SKU หรือชื่อสินค้า' 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </label>
            </div>
            <div className={StyleHistory.Thead}>
                <p>วันเวลา</p>
                <p>ผู้ทำรายการ</p>
                <p>ประเภท</p>
                <p>SKU/ชื่อสินค้า</p>
                <p>จำนวนเปลี่ยน</p>
                <p>คงเหลือก่อน</p>
                <p>คงเหลือหลัง</p>
                <p>เหตุผล / หมายเหตุ</p>
            </div>
            <div className={StyleHistory.table}>
                {
                    filteredData.length > 0 ? (
                        filteredData.map((item) => {
                            return <Log {...item} key={item._id} />
                        })
                    ) : (
                        <p style={{textAlign: 'center', marginTop: '30px', color: 'var(--gray)', width: '100%', gridColumn: '1 / -1'}}>
                            ไม่พบรายการที่ค้นหา
                        </p>
                    )
                }
            </div>
         </div>
    )
}