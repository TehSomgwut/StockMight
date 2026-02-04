import StyleHistory from './History.module.css';
import StyleExport from '../Request/Export/Export.module.css'
import Log from './Log/Log'
import Header from '../../components/PageHeader/PageHeader'

export default function History() {
    const data = [
        {date: new Date(), manager:{name: "สมชาย ใจดี", role:"พนักงานคลัง"}, type: "รับเข้า", product: {productID: "ELC-001", pname: "เครื่องพิมพ์เลเซอร์ HP LaserJet"}, amount: 5, stock:10, remain: 15, note: {noteName: "ซื้อเพิ่ม", noteDescription: "รับสินค้าจากซัพพลายเออร์"}},
        {date: new Date(), manager:{name: "สมหญิง รักงาน", role:"พนักงานคลัง"}, type: "เบิกออก", product: {productID: "OFF-001", pname: "กระดาษ A4 Double A 80 แกรม"}, amount: 2, stock:5, remain: 3, note: {noteName: "ขาย", noteDescription: "ส่งให้ลูกค้า บจก.ABC"}},
        {date: new Date(), manager:{name: "สมชาย ใจดี", role:"พนักงานคลัง"}, type:"เบิกออก", product: {productID: "ELC-002", pname: "หมึกพิมพ์ Canon 810 สีดำ"}, amount: 3, stock:8, remain: 5, note: {noteName: "ขาย", noteDescription: ""}},
    ]
    return (
         <div className={StyleHistory.History}>
            <Header header="ประวัติการเคลื่อนไหวสต็อก" description="บันทึกการรับเข้า-เบิกออกทั้งหมดพร้อม Audit Trail" />
            <div className={StyleExport.search}>
                <p>เลือกสินค้า</p>
                <label htmlFor="search-request">
                    <img src="/Icon/4-Receive-issue/Icon.svg" />
                    <input type='text' placeholder='ค้นหาด้วย SKU หรือชื่อสินค้า' required />
                </label>
            </div>
            <div className={StyleHistory.table}>
                <div className={StyleHistory.pseudo}></div>
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
                {
                    data.map((item, index) => {
                        return <Log {...item} key={index} />
                    })
                }
            </div>
         </div>
    )
}