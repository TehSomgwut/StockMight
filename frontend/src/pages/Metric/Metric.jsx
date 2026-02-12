import StyleMetric from './Metric.module.css'
import Unit from './Unit/Unit'
import StyleCategories from '../Categories/Categories.module.css'
import Header from '../../components/PageHeader/PageHeader'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Metric() {
    
    const [data, setData] = useState([])
    
    useEffect(() => {
        async function getMetric() {
            try {
                const res = await fetch("http://localhost:3000/api/metric/", {
                    method: "GET"
                });
    
                if (res.ok) {
                    const dataMetric = await res.json();
                    console.log("Fetch Success:", dataMetric);
                    setData(dataMetric)
                } else {
                    alert("SERVER ผิดปกติ");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                alert("SERVER ไม่ตอบสนอง")
            }
        }
        getMetric();
    }, [])

    // getMetric().map((item) => {
    //     // data.push({Mname: item.name, description: item.description, status: item.status})
    // })

    // const data = [
    //     {Mname: "ชิ้น", description: "หน่วยนับทั่วไป", status: "ใช้งาน"},
    //     {Mname: "กล่อง", description: "สำหรับสินค้าบรรจุกล่อง", status: "ใช้งาน"},
    //     {Mname: "กิโลกรัม", description: "หน่วยน้ำหนัก", status: "ใช้งาน"},
    // ]
    return (
         <div className={StyleCategories.Categories}>
            <div className={StyleCategories.header}>
                <Header header="หน่วยนับ" description="แก้ไขข้อมูลสินค้า" />
                <Link to='add'>
                    <div className={StyleCategories["add-button"]}>
                        <img src="\Icon\6-Categories\Icon-2.svg" />
                        <p>เพิ่มหมวดหมู่</p>
                    </div>
                </Link>
            </div>
            <div className={StyleCategories.table}>
                <div className={StyleCategories.Thead}>
                    <p>ชื่อหน่วย</p>
                    <p>คำอธิบาย</p>
                    <p>สถานะ</p>
                    <p>การกระทำ</p>
                </div>
                <div className={StyleCategories.Tbody}>
                    { data.length == 0 ? <p style={{fontSize: "0.9em", color: "var(--gray)"}}>ไม่พบหน่วยนับ ลองเพิ่มดูสิ</p> :
                        data.map((item, index) => {
                            return <Unit key={index} {...item} />
                        })
                    }
                </div>
            </div>
         </div>
    )
}