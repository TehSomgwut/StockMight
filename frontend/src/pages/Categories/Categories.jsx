import StyleCategories from './Categories.module.css'
import Category from './Category/Category'
import Header from '../../components/PageHeader/PageHeader'
import { Link, Route, Routes } from 'react-router-dom'
import AddCategory from '../AddCategory/AddCategory'

export default function Categories() {
    const data = [
        {Cname: "อิเล็กทรอนิกส์", amount: "45", status: "ใช้งาน"},
        {Cname: "เครื่องใช้ไฟฟ้า", amount: "32", status: "ใช้งาน"},
        {Cname: "เฟอร์นิเจอร์", amount: "28", status: "ใช้งาน"},
    ]
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
                    { data.map((item, index) => {
                        return <Category key={index} {...item} />
                    })}
                </div>
            </div>
         </div>
    )
}