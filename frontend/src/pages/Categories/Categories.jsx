import StyleCategories from './Categories.module.css'
import Category from './Category/Category'
import Header from '../../components/PageHeader/PageHeader'
import { Link, Route, Routes } from 'react-router-dom'
import AddCategory from '../AddCategory/AddCategory'
import { useState, useEffect } from 'react'

export default function Categories() {

    const [data, setData] = useState([])

    useEffect(() => {
        async function getC() {
            try {
                const res = await fetch('http://localhost:3000/api/category/', {
                    method: "GET"
                })
                if (res.ok) {
                    const dataC = await res.json();
                    console.log("Fetch Success:", dataC);
                    setData(dataC)
                } else {
                    alert("SERVER ผิดปกติ");
                }

            }
            catch {
                window.alert("เชื่อมต่อฐานข้อมูลไม่สำเร็จ โปรดลองอีกครั้งภายหลัง")
            }
        }

        getC();
    }, [])
    console.log(data)

    // const data = [
    //     {Cname: "อิเล็กทรอนิกส์", amount: "45", status: "ใช้งาน"},
    //     {Cname: "เครื่องใช้ไฟฟ้า", amount: "32", status: "ใช้งาน"},
    //     {Cname: "เฟอร์นิเจอร์", amount: "28", status: "ใช้งาน"},
    // ]
    return (
         <div className={StyleCategories.Categories}>
            <div className={StyleCategories.header}>
                <Header header="หมวดหมู่สินค้า" description="จัดการหมวดหมู่สินค้า" />
                <Link to="add">
                    <div className={StyleCategories["add-button"]}>
                        <img src="\Icon\6-Categories\Icon-2.svg" />
                        <p>เพิ่มหมวดหมู่</p>
                    </div>
                </Link>
            </div>
            <div className={StyleCategories.table}>
                <div className={StyleCategories.Thead}>
                    <p>ชื่อหมวดหมู่</p>
                    <p>จำนวนสินค้า</p>
                    <p>สถานะ</p>
                    <p>การกระทำ</p>
                </div>
                <div className={StyleCategories.Tbody}>
                    { data.length == 0 ? <p style={{fontSize: "0.9em", color: "var(--gray)"}}>ไม่พบหมวดหมู่ใดๆ ลองเพิ่มดูสิ</p> : data.map((item, index) => {
                        return <Category key={index} {...item} />
                    })}
                </div>
            </div>
         </div>
    )
}