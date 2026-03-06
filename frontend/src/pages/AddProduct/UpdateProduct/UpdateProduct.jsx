import StyleAddProduct from '../AddProduct.module.css';
import Header from '../../../components/PageHeader/PageHeader';
import InputField from '../../../components/InputField/InputField';
import StyleInputField from '../../../components/InputField/InputField.module.css';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateProduct() {
    const [starterValue, setStarterValue] = useState(0);
    const [alertValue, setAlertValue] = useState(0);
    const [form, setForm] = useState({quantity: starterValue, minStock: alertValue});
    const [categories, setCategories] = useState([])
    const [metric, setMetric] = useState([])
    const [isShow, setIsShow] = useState(false)
    const [image, setImage] = useState(null)
    const [product, setProduct] = useState({})
    const { id } = useParams()
    
    // 🟢 นำ State สำหรับจัดการ Checkbox มาจาก AddProduct
    const [showDate, setShowDate] = useState({showMFG: false, showEXP: false, showClearStock: false})
    const navigate = useNavigate()
    
    const addA = () => setAlertValue(prev => prev + 1);
    const minusA = () => setAlertValue(prev => (prev > 0 ? prev - 1 : 0));

    const addS = () => setStarterValue(prev => prev + 1);
    const minusS = () => setStarterValue(prev => (prev > 0 ? prev - 1 : 0));
    
    function handleChange(e) {
        const { value, name } = e.target
        setForm(prev => ({...prev, [name]: value}))
    }

    // 🟢 ฟังก์ชันจัดการ Checkbox ที่ถูกต้อง (Clean Code)
    function handleCheckBoxChange(e) {
        const { name, checked } = e.target;
        setShowDate(prev => ({
            ...prev, 
            [name]: checked 
        }));
    }

    function handleImageChange(e) {
        const file = e.target.files[0]
        setImage(file);
        setIsShow(URL.createObjectURL(file))
    }

    async function handleSubmit(e) { 
        e.preventDefault();

        const formData = new FormData();
        formData.append("code", form.code || "");
        formData.append("name", form.name || "");
        formData.append("description", form.description || "");
        formData.append("category", form.category || "");
        formData.append("metric", form.metric || "");
        formData.append("quantity", starterValue || 0);
        formData.append("minStock", alertValue || 0);
        formData.append("MFG", (showDate.showMFG && form.MFG) ? form.MFG : "");
        formData.append("EXP", (showDate.showEXP && form.EXP) ? form.EXP : "");
        formData.append("clearStock", (showDate.showClearStock && form.clearStock) ? form.clearStock : "");
        
        formData.append("status", form.status || "active");
        
        if (image) {
            formData.append("image", image);
        }

        try {
            const res = await fetch(`https://stockmight-backend.onrender.com/api/product/${id}`, {
                method: "PUT",
                body: formData 
            });

            if (res.ok) {
                window.alert("บันทึกการแก้ไขเสร็จสิ้น");
                console.log(formData)
                navigate('/pages/inventory')
            }
            else {
                const resJson = await res.json()
                console.log(resJson)
                window.alert(resJson.message)
            }
            
        } catch (err) {
            console.log("ERR : ", err);
        }
    }

    const formatForInput = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toISOString().split('T')[0];
    };

    useEffect(()=> {
        async function getMetric() {
            try {
                const res = await fetch("https://stockmight-backend.onrender.com/api/metric/", { method: "GET" });
                if (res.ok) {
                    const dataMetric = await res.json();
                    const activeM = dataMetric.filter((item) => item.status === 'active')
                    setMetric(activeM)
                }
            } catch (error) {
                console.error("Fetch Error:", error);
            }
        }

        async function getCategories() {
            try {
                const res = await fetch("https://stockmight-backend.onrender.com/api/category", { method: "GET" })
                if (res.ok) {
                    const dataCategory = await res.json();
                    const activeC = dataCategory.filter((item) => item.status === 'active')
                    setCategories(activeC)
                }
            } catch (error) {
                console.error("Fetch Error: ", error);
            }
        }

        async function getProduct() {
            try {
                const res = await fetch(`https://stockmight-backend.onrender.com/api/product/${id}`, { method: "GET"})
                if (res.ok) {
                    const target = await res.json()
                    setProduct(target)
                    setStarterValue(target.quantity)
                    setAlertValue(target.minStock)
                    setForm(target)

                    // ติ๊ก Checkbox ให้อัตโนมัติ ถ้ามีข้อมูลวันผลิต/วันหมดอายุอยู่แล้ว
                    setShowDate({
                        showMFG: !!target.MFG, 
                        showEXP: !!target.EXP, 
                        showClearStock: !!target.clearStock 
                    });
                } else {
                    window.alert(`NOT FOUND ${id}`)
                }
            } catch (err) {
                console.error("Fetch Product Error:", err)
            }
        }

        getMetric();
        getCategories();
        getProduct();
    }, [id])

    return (
         <div className={StyleAddProduct.addProduct}>
            <header>
                <Header header={`แก้ไขสินค้า ${product.name || ""}`} description={`แก้ไขข้อมูลสินค้าลงสู่ระบบ`} />
            </header>
            <form onSubmit={handleSubmit}>
                <InputField name="รหัสสินค้า (SKU/GTIN)" placeholder={product.code} description="รหัสต้องไม่ซ้ำกับสินค้าอื่น" formName="code" onChange={handleChange} value={form.code} />
                <InputField name="ชื่อสินค้า" placeholder={product.name} formName="name" onChange={handleChange} value={form.name} />
                <InputField name="คำอธิบายสินค้า" placeholder="ระบุรายละเอียดสินค้า" addClass={StyleInputField.long} formName="description" onChange={handleChange} value={form.description} />
                
                <div>
                    <p>รูปสินค้า</p>
                    <label htmlFor='input-product-image'>
                        <input type="file" id="input-product-image" name="image" onChange={handleImageChange} />
                        { isShow ? (
                            <img className={StyleAddProduct["preview-image"]} src={isShow} alt="Preview" />
                        ) : product.image ? (
                            <img className={StyleAddProduct["preview-image"]} src={`https://stockmight-backend.onrender.com${product.image}`} alt="Current Product" />
                        ) : (
                            <div style={{padding: '20px', border: '1px dashed #ccc', textAlign: 'center'}}>ไม่มีรูปภาพ (คลิกเพื่อเพิ่ม)</div>
                        )}
                    </label>
                </div>
                
                <div className={StyleAddProduct["input-container"]}>
                    <div className={StyleInputField["input-field"]}>
                        <p>หมวดหมู่สินค้า</p>
                        <select className={StyleAddProduct.category} name="category" onChange={handleChange} value={form.category || ""} >
                            <option value="">เลือกหมวดหมู่</option>
                            { categories.map((item) => (
                                <option key={item._id} value={item._id}>{item.name}</option>
                            )) }
                        </select>
                    </div>
                    <div className={StyleInputField["input-field"]}>
                        <p>หน่วยนับ</p>
                        <select className={StyleAddProduct.metric} name="metric" onChange={handleChange} value={form.metric || ""} >
                            <option value="">เลือกหน่วยนับ</option>
                            { metric.map((item) => (
                                <option key={item._id} value={item._id}>{item.name}</option>
                            )) }
                        </select>
                    </div>
                </div>

                <div className={StyleAddProduct["input-container"]}>
                    <div className={StyleInputField["input-field"]}>
                        <p>จำนวนเริ่มต้น</p>
                        <div className={StyleAddProduct["number-input"]}>
                            <span onClick={minusS}>-</span>
                            <input type="number" min={0} value={starterValue} onChange={(e) => setStarterValue(Number(e.target.value))} name="quantity" />
                            <span onClick={addS}>+</span>
                        </div>
                        <p className={StyleAddProduct.description}>จำนวนสินค้าคงเหลือปัจจุบัน</p>
                    </div>
                    <div className={StyleInputField["input-field"]}>
                        <p>จุดแจ้งเตือนสต๊อกต่ำ</p>
                        <div className={StyleAddProduct["number-input"]}>
                            <span onClick={minusA}>-</span>
                            <input type="number" min={0} value={alertValue} onChange={(e) => setAlertValue(Number(e.target.value))} name="minStock" />
                            <span onClick={addA}>+</span>
                        </div>
                        <p className={StyleAddProduct.description}>แจ้งเตือนเมื่อสต๊อกต่ำกว่าจำนวนนี้</p>
                    </div>
                </div>

                {/* 🟢 ส่วนของ Checkbox และ ช่องเลือกวันที่ */}
                <div className={StyleAddProduct["input-container"]}>
                    <div className={StyleAddProduct["checkbox-container"]}>
                        <p>สินค้านี้มี</p>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                            <label htmlFor='showMFG'>
                                วันผลิต
                            </label>
                                <input id='showMFG' name='showMFG' type='checkbox' checked={showDate.showMFG} onChange={handleCheckBoxChange} />
                            
                            <label htmlFor='showEXP'>
                                วันหมดอายุ
                            </label>
                                <input id='showEXP' name='showEXP' type='checkbox' checked={showDate.showEXP} onChange={handleCheckBoxChange} />

                            <label htmlFor='showClearStock'>
                                วันที่ควรล้าง Stock
                            </label>
                                <input id='showClearStock' name='showClearStock' type='checkbox' checked={showDate.showClearStock} onChange={handleCheckBoxChange} />
                        </div>
                    </div>
                </div>

                {/* แสดงช่องวันที่ตามการติ๊ก Checkbox */}
                <div className={StyleAddProduct["input-container"]}>
                    {showDate.showMFG && (
                        <div className={StyleInputField["input-field"]}>
                            <p>วันผลิต</p>
                            <input type="date" name='MFG' onChange={handleChange} value={formatForInput(form.MFG)} />
                        </div>
                    )}
                    
                    {showDate.showEXP && (
                        <div className={StyleInputField["input-field"]}>
                            <p>วันหมดอายุ</p>
                            <input type="date" name='EXP' onChange={handleChange} value={formatForInput(form.EXP)} />
                        </div>
                    )}

                    {showDate.showClearStock && (
                        <div className={StyleInputField["input-field"]}>
                            <p>วันล้างสต๊อกสินค้า</p>
                            <input type="date" name='clearStock' onChange={handleChange} value={formatForInput(form.clearStock)} />
                        </div>
                    )}
                </div>

                <div className={StyleInputField["input-field"]} style={{ marginTop: '20px' }}>
                    <p>สถานะ</p>
                    <select className={StyleAddProduct.metric} onChange={handleChange} name="status" value={form.status || ""} >
                        <option value="">เลือกสถานะ</option>
                        <option value="active">ใช้งาน</option>
                        <option value="inactive">ไม่ใช้งาน</option>
                    </select>
                </div>

                <div className={StyleAddProduct["input-container"]} style={{ marginTop: '30px' }}>
                    <button type="button" onClick={() => navigate('/pages/inventory')} style={{ backgroundColor: 'var(--gray)', color: 'white' }}>ยกเลิก</button>
                    <button type="submit">บันทึกการแก้ไข</button>
                </div>
            </form>
         </div>
    )
}