import styleC from '../../AddCategory/AddCategory.module.css'
import PageHeader from '../../../components/PageHeader/PageHeader'
import InputField from '../../../components/InputField/InputField'
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StyleInputField from '../../../components/InputField/InputField.module.css';

export default function UpdateMetric() {
    const navigate = useNavigate();
    const [active, setActive] = useState("ใช้งาน");
    const [form, setForm] = useState({ ชื่อหน่วยนับ: "", คำอธิบาย: "" });
    const alert = useRef(null);
    const [metric, setMetric] = useState({});
    const { id } = useParams();

    const handleConfirm = async () => {
        alert.current.style.display = 'none';
        
        let statusRes = active === "ใช้งาน" ? "active" : "inactive";
        
        const resForm = {
            name: form.ชื่อหน่วยนับ ? form.ชื่อหน่วยนับ : metric.name,
            description: form.คำอธิบาย ? form.คำอธิบาย : metric.description,
            status: statusRes
        }

        try {
            const res = await fetch(`http://stockmight-backend.onrender.com/api/metric/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(resForm)
            });
            
            if (res.ok) {
                navigate('/pages/metric');
            }
        } catch {
            window.alert("เกิดข้อผิดพลาดโปรดลองใหม่ภายหลัง");
        }
    }

    useEffect(() => {
        async function getMetric() {
            const res = await fetch(`http://stockmight-backend.onrender.com/api/metric/${id}`, { method: "GET" })
            const target = await res.json()
            setMetric(target)
            setActive(target.status === "inactive" ? "ไม่ใช้งาน" : "ใช้งาน")
        }

        getMetric()
    }, [id]); // ป้องกัน Infinite Loop

    const handleSubmit = (e) => {
        e.preventDefault();
        alert.current.style.display = 'flex';
    }

    const cancelConfirm = () => {
        alert.current.style.display = 'none';
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => {
            const newForm = { ...prev, [name]: value }
            return newForm;
        });
    }

    function handleReset() {
        setForm({ ชื่อหน่วยนับ: "", คำอธิบาย: "" });
        navigate('/pages/metric');
    }

    return (
        <div className={styleC.AddCategory}>
            <PageHeader header="แก้ไขหน่วยนับ" description={`แก้ไขข้อมูลหน่วยนับสินค้า ${metric.name || ""}`} />
            
            <form>
                <div className={styleC.input}>
                    <InputField name="ชื่อหน่วยนับ" placeholder={metric.name} onChange={handleChange} />
                    <InputField name="คำอธิบาย" addClass={StyleInputField.long} placeholder={metric.description} onChange={handleChange} />
                    
                    <p>สถานะ</p>
                    <div className={styleC.status}>
                        <p onClick={() => setActive("ใช้งาน")} className={active === "ใช้งาน" ? styleC.active : ""} >ใช้งาน</p>
                        <p onClick={() => setActive("ไม่ใช้งาน")} className={active === "ไม่ใช้งาน" ? styleC.active : ""} >ไม่ใช้งาน</p>
                    </div>
                    
                    <div className={styleC.note}><h4>หมายเหตุ</h4>: การเพิ่มหน่วยนับจะสามารถสร้างได้แค่จากหน้านี้</div>
                </div>

                <div className={styleC.button}>
                    <button onClick={handleSubmit} type="submit">
                        <img src="/Icon/10-Save-Category/Icon-1.svg" alt="save" />
                        <p>บันทึกการแก้ไข</p>
                    </button>
                    <button type="reset" onClick={handleReset}>
                        <p>ยกเลิก</p>
                    </button>
                </div>
            </form>

            {/* Modal แจ้งเตือนยืนยัน */}
            <div ref={alert} className={styleC.alert} style={{ display: 'none' }}>
                <div className={styleC["alert-wrapper"]}>
                    <h2>ยืนยันการบันทึก</h2>
                    <p className={styleC.description}>คุณต้องการบันทึกข้อมูลหน่วยนับ "{metric.name}" หรือไม่?</p>
                    
                    <div className={styleC.summary}>
                        <div className={styleC.spaceB}>
                            <p>ชื่อหน่วยนับ:</p>
                            <p>{form.ชื่อหน่วยนับ ? form.ชื่อหน่วยนับ : metric.name}</p>
                        </div>
                        <div className={styleC.spaceB}>
                            <p>คำอธิบาย:</p>
                            <p style={{ width: '50%', fontSize: '0.9em', color: 'var(--gray)', textAlign: 'right' }}>
                                {form.คำอธิบาย ? form.คำอธิบาย : (metric.description || "-")}
                            </p>
                        </div>
                        <div className={styleC.spaceB}>
                            <p>สถานะ:</p>
                            <p style={active === "ใช้งาน" ? { color: 'var(--safe)' } : { color: 'var(--danger)' }}>
                                {active}
                            </p>
                        </div>
                    </div>

                    <div className={styleC["button-container"]}>
                        <button onClick={handleConfirm} type="button">ยืนยัน</button>
                        <button onClick={cancelConfirm} type="reset">ยกเลิก</button>
                    </div>
                </div>
            </div>
        </div>
    )
}