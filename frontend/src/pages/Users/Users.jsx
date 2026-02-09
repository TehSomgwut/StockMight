import StyleUsers from './Users.module.css'
import User from './User/User';
import Header from '../../components/PageHeader/PageHeader'
import Card from '../Inventory/AllProductCard/Card'
import StyleExport from '../Request/Export/Export.module.css'

export default function Users() {
    const userData = [
        {username: "Tae1231212121", realname: "Songwut Phosri", email: "Songwut123@example.com", role: "ผู้จัดการ", status: "กำลังใช้งาน", recent: new Date()},
        {username: "BotaHaKeeTak", realname: "Kittinat K.", email: "BOBOBOBO@example.com", role: "ผู้จัดการ", status: "ไม่ได้ใช้งาน", recent: new Date()},
        {username: "Jackkkkkkkkkkkkkson michael", realname: "Jirakrit mula", email: "Keerajid321@example.com", role: "พนักงานคลัง", status: "กำลังใช้งาน", recent: new Date()},
    ]
    return (
         <div className={StyleUsers.Users}>
            <Header header="จัดการผู้ใช้" description="จัดการบัญชีผู้ใช้งานระบบ (สามารถจัดการ ผู้จัดการ และพนักงานคลัง)" />
            <div className={StyleUsers["card-container"]}>
                <Card text="ผู้ใช้งานทั้งหมด" value={6} src='/Icon/9-Users/Icon-6.svg' CN="blue" />
                <Card text="ใช้งาน" value={5} src='/Icon/9-Users/Icon-5.svg' CN="green" />
                <Card text="ปิดการใช้งาน" value={1} src='/Icon/9-Users/Icon-4.svg' />
            </div>
            <div className={StyleExport.search}>
                <p>เลือกสินค้า</p>
                <label htmlFor="search-request">
                    <img src="/Icon/4-Receive-issue/Icon.svg" />
                    <input type='text' placeholder='ค้นหาด้วย SKU หรือชื่อสินค้า' required />
                </label>
            </div>
            <div className={StyleUsers.Thead}>
                <p>ชื่อผู้ใช้</p>
                <p>ชื่อ-นามสกุล</p>
                <p>อีเมล</p>
                <p>บทบาท</p>
                <p>สถานะ</p>
                <p>เข้าสู่ระบบล่าสุด</p>
                <p>จัดการ</p>
            </div>
            <div className={StyleUsers.Tbody}>
                { userData.map((item, index) => {
                    return <User key={index} {...item} />
                })}
            </div>
         </div>
    )
}