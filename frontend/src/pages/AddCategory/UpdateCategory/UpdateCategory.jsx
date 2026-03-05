import styleC from '../AddCategory.module.css'
import PageHeader from '../../../components/PageHeader/PageHeader'
import InputField from '../../../components/InputField/InputField'
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateCategory() {
    const navigate = useNavigate();
    const [active, setActive] = useState("ใช้งาน");
    const [from, setForm] = useState({ชื่อหมวดหมู่: ""});
    const alert = useRef(null);
    const [ category, setCategory ] = useState({})
    const { id } = useParams()

    const handleConfirm = async () => {
        alert.current.style.display = 'none';
        
        // 🟢 แก้ไข: เปลี่ยนจาก from.status เป็นเช็คจาก State `active` โดยตรง
        let statusRes = active === "ใช้งาน" ? "active" : "inactive";
        
        const resFrom = {
            name: from.ชื่อหมวดหมู่ ?  from.ชื่อหมวดหมู่ : category.name,
            status: statusRes
        }

        try {
            await fetch(`https://stockmight-backend.onrender.com/api/category/${id}`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(resFrom)
            })
            navigate('/pages/categories')
        }
        catch {
            window.alert ("เกิดข้อผิดพลาดโปรดลองใหม่ภายหลัง")
        }
    }

    useEffect(() => {
        async function getCategory() {
            try {
                const res = await fetch(`https://stockmight-backend.onrender.com/api/category/${id}`, {method: "GET"})
                if (res.ok) {
                    const target = await res.json()
                    setCategory(target)
                    
                    // 🟢 เพิ่มเติม: เซ็ตสถานะเริ่มต้นให้ปุ่มตรงกับฐานข้อมูลตอนโหลดหน้า
                    setActive(target.status === 'active' ? "ใช้งาน" : "ไม่ใช้งาน");
                }
            } catch (err) {
                console.error("Fetch Error:", err);
            }
        }

        getCategory()
    }, [id]) // 🟢 แก้ไข: ใส่ [id] เพื่อป้องกัน Infinite Loop (ยิง API ซ้ำรัวๆ)

    const handleSubmit = (e) => {
        e.preventDefault();
        alert.current.style.display = 'flex';
    }

    const cancelConfirm = () => {
        alert.current.style.display = 'none'
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => {
            const newFrom = {...prev, [name]:value}
            return (newFrom)
        })
    }

    function handleReset() {
        setForm({ชื่อหมวดหมู่: ""})
        navigate('/pages/categories')
    }

    return (
        <div className={styleC.AddCategory}>
            <PageHeader header="แก้ไขหมวดหมู่" description={`แก้ไขหมวดหมู่สินค้า ${category.name}`} />
            <form>
                <div className={styleC.input}>
                    <InputField name="ชื่อหมวดหมู่" placeholder={category.name} onChange={handleChange} />
                    <p>สถานะ</p>
                    <div className={styleC.status}>
                        <p onClick={() => setActive("ใช้งาน")} className={active=="ใช้งาน" ? styleC.active : ""} >ใช้งาน</p>
                        <p onClick={() => setActive("ไม่ใช้งาน")} className={active=="ไม่ใช้งาน" ? styleC.active : ""} >ไม่ใช้งาน</p>
                    </div>
                    <div className={styleC.note}><h4>หมายเหตุ</h4>: การเพิ่มหมวดหมู่จะสามารถสร้างได้แค่จากหน้านี้</div>
                </div>
                <div className={styleC.button}>
                    <button onClick={handleSubmit} type="button"><img src="/Icon/10-Save-Category/Icon-1.svg" /><p>บันทึกการแก้ไข</p></button>
                    <button type="reset" onClick={() => handleReset()}><p>ยกเลิก</p></button>
                </div>
            </form>
            <div ref={alert} className={styleC.alert}>
                <div className={styleC["alert-wrapper"]}>
                    <h2>ยืนยันการแก้ไข</h2>
                    <p className={styleC.description}>คุณต้องการแก้ไขหมวดหมู่ "{category.name}" หรือไม่</p>
                    <div>
                        <div className={styleC.spaceB}>
                            <p>ชื่อหมวดหมู่:</p>
                            <p>{from.ชื่อหมวดหมู่ ? from.ชื่อหมวดหมู่ : category.name}</p>
                        </div>
                        <div className={styleC.spaceB}>
                            <p>สถานะ:</p>
                            <p style={active=="ใช้งาน" ? {color: 'var(--safe)'} : {color: 'var(--danger)'}}>{active}</p>
                        </div>
                    </div>
                    <div className={styleC["button-container"]}>
                        <button onClick={handleConfirm} type="submit">ยืนยัน</button>
                        <button onClick={cancelConfirm} type="reset">ยกเลิก</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}