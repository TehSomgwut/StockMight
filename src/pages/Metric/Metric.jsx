import StyleMetric from './Metric.module.css'
import Unit from './Unit/Unit'
import StyleCategories from '../Categories/Categories.module.css'
import Header from '../../components/PageHeader/PageHeader'

export default function Metric() {
    const data = [
        {Mname: "ชิ้น", description: "หน่วยนับทั่วไป", status: "ใช้งาน"},
        {Mname: "กล่อง", description: "สำหรับสินค้าบรรจุกล่อง", status: "ใช้งาน"},
        {Mname: "กิโลกรัม", description: "หน่วยน้ำหนัก", status: "ใช้งาน"},
    ]
    return (
         <div className={StyleCategories.Categories}>
            <div className={StyleCategories.header}>
                <Header header="หมวดหมู่สินค้า" description="จัดการหมวดหมู่สินค้า" />
                <div className={StyleCategories["add-button"]}>
                    <img src="\Icon\6-Categories\Icon-2.svg" />
                    <p>เพิ่มหมวดหมู่</p>
                </div>
            </div>
            <div className={StyleCategories.table}>
                <div className={StyleCategories.Thead}>
                    <p>ชื่อหน่วย</p>
                    <p>คำอธิบาย</p>
                    <p>สถานะ</p>
                    <p>การกระทำ</p>
                </div>
                <div className={StyleCategories.Tbody}>
                    { data.map((item, index) => {
                        return <Unit key={index} {...item} />
                    })}
                </div>
            </div>
         </div>
    )
}