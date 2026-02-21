import StyleUnit from './Unit.module.css'
import StyleCategory from '../../Categories/Category/Category.module.css'
import { useState, useEffect } from 'react'
import DeleteComponent from '../../../components/DeleteComponent/DeleteComponent';

export default function Unit({_id, name, description, status}) {
    const [isShow, setIsShow] = useState(false);
    const [ metric, setMetric] = useState({})
    useEffect(() => {
        async function getMetric() {
            const target = await fetch(`http://localhost:3000/api/metric/${_id}`, {method: "GET"})
            const C = await target.json()
            setMetric(C)
        }

        getMetric()
    }, [])

    async function confirmDelete() {
        try {
            await fetch(`http://localhost:3000/api/metric/${_id}`, {method: "DELETE"})
            alert("ลบสำเร็จ")
            setIsShow(!isShow)
        } catch {
            alert("การลบล้มเหลว")
            setIsShow(!isShow)
        }
    }

    if (status == "active") {
        status = "ใช้งาน"
    }
    else if (status == "inactive") {
        status = "ไม่ใช้งาน"
    }
    
    return (
         <div className={StyleCategory.Category}>
            <p>{name}</p>
            <p style={{color: "var(--gray)"}}>{description}</p>
            <p className={ status=="ใช้งาน" ? StyleCategory["in-use"] : StyleCategory["out-use"]}>{status}</p>
            <div className={StyleCategory.manage}>
                <img src="/Icon/6-Categories/Icon-1.svg" />
                <img src="/Icon/6-Categories/Icon.svg" onClick={() => setIsShow(!isShow)} />
            </div>
            <DeleteComponent isShow={isShow} setIsShow={setIsShow} p={`คุณแน่ใจหรือไม่ว่าต้องการลบหน่วยนับ ${metric.name}? การดำเนินการนี้ไม่สามารถยกเลิกได้`} h3={"ยืนยันการลบหน่วยนับ"} onConfirm={confirmDelete} />
         </div>
    )
}