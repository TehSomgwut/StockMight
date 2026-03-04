import StyleCategory from './Category.module.css'
import DeleteComponent from '../../../components/DeleteComponent/DeleteComponent'
import { useState, useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import UpdateCategory from '../../AddCategory/UpdateCategory/UpdateCategory'

export default function Category({name, amount, status, _id}) {
    const [ isShow, setIsShow ] = useState(false)

    async function onConfirm() {
        await fetch(`http://localhost:3000/api/category/${_id}`, {
            method: "DELETE"
        })
        setIsShow(!isShow)
    }

    if (status=='active') {
        status = "ใช้งาน"
    }
    else if (status=='inactive') {
        status = "ไม่ใช้งาน"
    }
    return (
         <div className={StyleCategory.Category}>
            <p>{name}</p>
            <p style={{color: "var(--gray)"}}>{amount} รายการ</p>
            <p className={ status=="ใช้งาน" ? StyleCategory["in-use"] : StyleCategory["out-use"]}>{status}</p>
            <div className={StyleCategory.manage}>
                <Link to={`/pages/categories/update/${_id}`} style={{textDecoration: 'none'}} >
                    <img src="/Icon/6-Categories/Icon-1.svg" />
                </Link>
                <img src="/Icon/6-Categories/Icon.svg" onClick={() => setIsShow(true)} />
            </div>
            <DeleteComponent isShow={isShow} setIsShow={setIsShow} h3={"ยืนยันการลบหมวดหมู่"} p={`คุณแน่ใจหรือไม่ว่าต้องการลบหมวดหมู่ ${name}? การดำเนินการนี้ไม่สามารถยกเลิกได้`} onConfirm={onConfirm} />
            <Routes>
                <Route path={`/update`} element={<UpdateCategory _id={_id} />} />
            </Routes>
         </div>
    )
}