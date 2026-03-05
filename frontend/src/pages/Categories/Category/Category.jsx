import StyleCategory from './Category.module.css'
import DeleteComponent from '../../../components/DeleteComponent/DeleteComponent'
import { useState, useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import UpdateCategory from '../../AddCategory/UpdateCategory/UpdateCategory'

export default function Category({ name, amount, status, _id, productsData }) {
    const [isShow, setIsShow] = useState(false)
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        if (Array.isArray(productsData)) {
            const count = productsData.filter(p => {
                if (!p.category) return false;
                const categoryId = p.category._id || p.category;
                
                return categoryId === _id;
            }).length;
            
            setProductCount(count);
        } else {
            setProductCount(amount || 0);
        }
    }, [productsData, _id, amount]);

    async function onConfirm() {
        try {
            await fetch(`https://stockmight-backend.onrender.com/api/category/${_id}`, {
                method: "DELETE"
            });
            setIsShow(false);
            // หมายเหตุ: ตอนนี้ลบสำเร็จแล้ว ข้อมูลจะอัปเดตเองผ่าน Socket ในหน้า Categories.jsx
        } catch (err) {
            console.error("ลบหมวดหมู่ไม่สำเร็จ:", err);
            alert("เกิดข้อผิดพลาดในการลบหมวดหมู่");
        }
    }

    // สร้างตัวแปรใหม่สำหรับแสดงผล แทนการเขียนทับค่า Prop เดิม (status = "...") เพื่อไม่ให้ผิดหลัก React
    const displayStatus = status === 'active' ? "ใช้งาน" : "ไม่ใช้งาน";

    return (
         <div className={StyleCategory.Category}>
            <p>{name}</p>
            <p style={{color: "var(--gray)"}}>{productCount} รายการ</p>
            <p className={ displayStatus === "ใช้งาน" ? StyleCategory["in-use"] : StyleCategory["out-use"]}>
                {displayStatus}
            </p>
            
            <div className={StyleCategory.manage}>
                <Link to={`/pages/categories/update/${_id}`} style={{textDecoration: 'none'}} >
                    <img src="/Icon/6-Categories/Icon-1.svg" alt="edit" />
                </Link>
                <img src="/Icon/6-Categories/Icon.svg" onClick={() => setIsShow(true)} style={{cursor: 'pointer'}} alt="delete" />
            </div>

            <DeleteComponent 
                isShow={isShow} 
                setIsShow={setIsShow} 
                h3={"ยืนยันการลบหมวดหมู่"} 
                p={`คุณแน่ใจหรือไม่ว่าต้องการลบหมวดหมู่ ${name}? การดำเนินการนี้ไม่สามารถยกเลิกได้`} 
                onConfirm={onConfirm} 
            />

            <Routes>
                <Route path={`/update`} element={<UpdateCategory _id={_id} />} />
            </Routes>
         </div>
    )
}