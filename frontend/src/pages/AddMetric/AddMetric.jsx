import styleC from '../AddCategory/AddCategory.module.css'
import PageHeader from '../../components/PageHeader/PageHeader'
import InputField from '../../components/InputField/InputField'
import { useState } from 'react'
import StyleInputField from '../../components/InputField/InputField.module.css';

export default function AddMetric() {
    const [active, setActive] = useState("ใช้งาน");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({ ชื่อหน่วยนับ: "", คำอธิบาย: "" });

    const handleConfirm = async () => {
        setIsModalOpen(false);
        const statusRes = active === "ใช้งาน" ? "active" : "inactive";
        
        const resform = {
            name: form.ชื่อหน่วยนับ,
            status: statusRes,
            description: form.คำอธิบาย
        }

        try {
            const res = await fetch('http://localhost:3000/api/metric/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(resform)
            });
            
            if (res.ok) {
                window.alert(`${resform.name} ถูกบันทึกเรียบร้อย`);
            }
        } catch {
            window.alert("เกิดข้อผิดพลาด โปรดลองใหม่ภายหลัง");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    return (
        <div className={styleC.AddCategory}>
            <PageHeader header="เพิ่มหน่วยนับ" description="เพิ่มหน่วยนับสินค้า" />
            
            <form onSubmit={handleSubmit}>
                <div className={styleC.input}>
                    <InputField name="ชื่อหน่วยนับ" placeholder="ชิ้น" isReq={true} onChange={handleChange} />
                    <InputField name="คำอธิบาย" addClass={StyleInputField.long} onChange={handleChange} />
                    
                    <p>สถานะ</p>
                    <div className={styleC.status}>
                        <p onClick={() => setActive("ใช้งาน")} className={active === "ใช้งาน" ? styleC.active : ""} >ใช้งาน</p>
                        <p onClick={() => setActive("ไม่ใช้งาน")} className={active === "ไม่ใช้งาน" ? styleC.active : ""} >ไม่ใช้งาน</p>
                    </div>
                    
                    <div className={styleC.note}><h4>หมายเหตุ</h4>: การเพิ่มหน่วยนับจะสามารถสร้างได้แค่จากหน้านี้</div>
                </div>

                <div className={styleC.button}>
                    <button type="submit">
                        <img src="/Icon/10-Save-Category/Icon-1.svg" alt="save" />
                        <p>บันทึกการแก้ไข</p>
                    </button>
                    <button type="reset" onClick={() => setForm({ ชื่อหน่วยนับ: "", คำอธิบาย: "" })}>
                        <p>ยกเลิก</p>
                    </button>
                </div>
            </form>
            {isModalOpen && (
                <div className={styleC.alert} style={{ display: 'flex' }}>
                    <div className={styleC["alert-wrapper"]}>
                        <h2>ยืนยันการบันทึก</h2>
                        <p className={styleC.description}>คุณต้องการบันทึกข้อมูลหน่วยนับหรือไม่?</p>
                        
                        <div className={styleC.summary}>
                            <div className={styleC.spaceB}>
                                <p>ชื่อหน่วยนับ:</p>
                                <p>{form.ชื่อหน่วยนับ}</p>
                            </div>
                            <div className={styleC.spaceB}>
                                <p>คำอธิบาย:</p>
                                <p style={{ width: '50%', fontSize: '0.9em', color: 'var(--gray)', textAlign: 'right' }}>
                                    {form.คำอธิบาย || "-"}
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
                            <button onClick={handleConfirm} type="submit">ยืนยัน</button>
                            <button onClick={() => setIsModalOpen(false)} type="reset">ยกเลิก</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}