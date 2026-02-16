import styleC from './AddCategory.module.css'
import PageHeader from '../../components/PageHeader/PageHeader'
import InputField from '../../components/InputField/InputField'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddCategory() {
    const navigate = useNavigate();
    const [active, setActive] = useState("ใช้งาน");
    const [from, setForm] = useState({ชื่อหมวดหมู่: ""});
    const alert = useRef(null);

    const handleConfirm = async () => {
        alert.current.style.display = 'none';
        let statusRes = from.status=="ใช้งาน" ? "active" : "inactive";
        const resFrom = {
            name: from.ชื่อหมวดหมู่,
            status: statusRes
        }

        try {
            const res = await fetch('http://localhost:3000/api/category/', {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(resFrom)
            })
            console.log("Save: ", res);
            navigate('/pages/categories')
        }
        catch {
            window.alert ("เกิดข้อผิดพลาดโปรดลองใหม่ภายหลัง")
        }
    }

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

    return (
        <div className={styleC.AddCategory}>
            <PageHeader header="เพิ่มหมวดหมู่" description="เพิ่มหมวดหมู่สินค้า" />
            <form>
                <div className={styleC.input}>
                    <InputField name="ชื่อหมวดหมู่" placeholder="อิเล็กทรอนิกส์" isReq={true} onChange={handleChange} />
                    <p>สถานะ</p>
                    <div className={styleC.status}>
                        <p onClick={() => setActive("ใช้งาน")} className={active=="ใช้งาน" ? styleC.active : ""} >ใช้งาน</p>
                        <p onClick={() => setActive("ไม่ใช้งาน")} className={active=="ไม่ใช้งาน" ? styleC.active : ""} >ไม่ใช้งาน</p>
                    </div>
                    <div className={styleC.note}><h4>หมายเหตุ</h4>: การเพิ่มหมวดหมู่จะสามารถสร้างได้แค่จากหน้านี้</div>
                </div>
                <div className={styleC.button}>
                    <button onClick={handleSubmit} type="submit"><img src="/Icon/10-Save-Category/Icon-1.svg" /><p>บันทึกการแก้ไข</p></button>
                    <button type="reset" onClick={() => setForm({ชื่อหมวดหมู่: ""})}><p>ยกเลิก</p></button>
                </div>
            </form>
            <div ref={alert} className={styleC.alert}>
                <div className={styleC["alert-wrapper"]}>
                    <h2>ยืนยันการบันทึก</h2>
                    <p className={styleC.description}>คุณต้องการบันทึกหมวดหมู่ "เครื่องใช้ไฟฟ้า" หรือไม่</p>
                    <div>
                        <div className={styleC.spaceB}>
                            <p>ชื่อหมวดหมู่:</p>
                            <p>{from.ชื่อหมวดหมู่}</p>
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