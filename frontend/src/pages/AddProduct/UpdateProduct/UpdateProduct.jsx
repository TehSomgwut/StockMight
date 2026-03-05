import StyleAddProduct from '../AddProduct.module.css';
import Header from '../../../components/PageHeader/PageHeader';
import InputField from '../../../components/InputField/InputField';
import StyleInputField from '../../../components/InputField/InputField.module.css';
import { useState, useEffect } from 'react'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';

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
    const navigate = useNavigate()
    
    const addA = () => setAlertValue(prev => prev + 1);
    const minusA = () => setAlertValue(prev => (prev > 0 ? prev - 1 : 0));

    const addS = () => setStarterValue(prev => prev + 1);
    const minusS = () => setStarterValue(prev => (prev > 0 ? prev - 1 : 0));
    
    function handleChange(e) {
        const { value, name } = e.target
        setForm(prev => ({...prev, [name]: value}))
    }

    function handleImageChange(e) {
        const file = e.target.files[0]
        setImage(file);
        setIsShow(URL.createObjectURL(file))
    }

    async function handleSubmit(e) { //เต้ลืมว่า object FormData มีอยู่จริง เลยเพิ่งมาใช้
        e.preventDefault();

        //ใช้ FormData แทน Object ปกติ
        const formData = new FormData();
        formData.append("code", form.code);
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("category", form.category);
        formData.append("metric", form.metric);
        formData.append("quantity", starterValue);
        formData.append("minStock", alertValue);
        formData.append("MFG", form.MFG);
        formData.append("EXP", form.EXP);
        formData.append("status", form.status);
        if (image) {
            formData.append("image", image);
        }

        try {
            const res = await fetch(`http://stockmight-backend.onrender.com/api/product/${id}`, {
                method: "PUT",
                // Browser จะใส่ 'multipart/form-data' พร้อม Boundary ให้เอง
                body: formData 
            });

            if (res.ok) {
                window.alert("บันทึกเสร็จสิ้น");
                navigate('/pages/inventory')
            }
        } catch (err) {
            console.log("ERR : ", err);
        }
    }

    const [DateMFG, setDateMFG] = useState(new Date);
    const [DateEXP, setDateEXP] = useState(new Date);
    const formatForInput = (dateString) => {
        if (!dateString) return "";
        
        return new Date(dateString).toISOString().split('T')[0];
    };

    useEffect(()=> {
        async function getMetric() {
            try {
                const res = await fetch("http://stockmight-backend.onrender.com/api/metric/", {
                    method: "GET"
                });
    
                if (res.ok) {
                    const dataMetric = await res.json();
                    const activeM = dataMetric.filter((item) => item.status == 'active')
                    setMetric(activeM)
                } else {
                    alert("SERVER ผิดปกติ");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                alert("SERVER ไม่ตอบสนอง")
            }
        }

        async function getCategories() {
            try {
                const res = await fetch("http://stockmight-backend.onrender.com/api/category", {
                    method: "GET"
                })
                if (res.ok) {
                    const dataCategory = await res.json();
                    const activeC = dataCategory.filter((item) => item.status == 'active')
                    setCategories(activeC)
                } else {
                    window.alert("SERVER ผิดปกติ")
                }
            } catch (error) {
                console.error("Fetch Error: ", error);
                window.alert("SERVER ไม่ตอบสนอง")
            }
        }

        async function getProduct() {
            const res = await fetch(`http://stockmight-backend.onrender.com/api/product/${id}`, { method: "GET"})
            if (res.ok) {
                const target = await res.json()
                setProduct(target)
                setStarterValue(target.quantity)
                setAlertValue(target.minStock)
                setDateMFG(target.MFG)
                setDateEXP(target.EXP)
                setForm(target)
            }
            else {
                window.alert(`NOT FOUND ${id}`)
            }
            
        }

        getMetric();
        getCategories();
        getProduct();
    }, [])

    return (
         <div className={StyleAddProduct.addProduct}>
            <header>
                <img src="\Icon\3-Inventory-addnew\inventory\Icon-12.svg" />
                <Header header={`แก้ไขสินค้า ${product.name}`} description={`แก้ไขสินค้า ${product.name} ลงสู่ระบบ`} />
            </header>
            <form onSubmit={handleSubmit}>
                <InputField name="รหัสสินค้า (SKU/GTIN)" placeholder={product.code} description="รหัสต้องไม่ซ้ำกับสินค้าอื่น" formName="code" onChange={handleChange} />
                <InputField name="ชื่อสินค้า" placeholder={product.name} formName="name" onChange={handleChange} />
                <InputField name="คำอธิบายสินค้า" placeholder="ระบุรายระเอียดสินค้า" addClass={StyleInputField.long} formName="description" onChange={handleChange} />
                <div>
                    <p>รูปสินค้า</p>
                    <label htmlFor='input-product-image'>
                        <input type="file" id="input-product-image" name="image" onChange={handleImageChange} />
                        { isShow ? <img className={StyleAddProduct["preview-image"]} src={isShow} /> : <img className={StyleAddProduct["preview-image"]} src={`http://stockmight-backend.onrender.com${product.image}`} /> }
                    </label>
                </div>
                <div className={StyleAddProduct["input-container"]}>
                    <div className={StyleInputField["input-field"]}>
                        <p>หมวดหมู่สินค้า</p>
                        <select className={StyleAddProduct.category} require name="category" onChange={handleChange} value={form.category} >
                            <option value="">เลือกหมวดหมู่</option>
                            { categories.map((item) => {
                                return <option key={item._id} value={item._id}>{item.name}</option>
                            }) }
                        </select>
                    </div>
                    <div className={StyleInputField["input-field"]}>
                        <p>หน่วยนับ</p>
                        <select className={StyleAddProduct.metric} name="metric" onChange={handleChange} value={form.metric} >
                            <option value="">เลือกหน่วยนับ</option>
                            { metric.map((item) => {
                                return <option key={item._id} value={item._id}>{item.name}</option>
                            }) }
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
                <div className={StyleAddProduct["input-container"]}>
                    <div className={StyleInputField["input-field"]}>
                        <p>วันผลิต</p>
                        <input type="date" name='MFG' onChange={handleChange} value={formatForInput(form.MFG)} />
                    </div>
                    <div className={StyleInputField["input-field"]}>
                        <p>วันหมดอายุ</p>
                        <input type="date" name='EXP' onChange={handleChange} value={formatForInput(form.EXP)} />
                    </div>
                </div>
                <div className={StyleInputField["input-field"]}>
                    <p>สถานะ</p>
                    <select className={StyleAddProduct.metric} onChange={handleChange} name="status" value={form.status} >
                        <option value="">เลือกสถานะ</option>
                        <option value="active">ใช้งาน</option>
                        <option value="inactive">ไม่ใช้งาน</option>
                    </select>
                </div>
                <div className={StyleAddProduct["input-container"]}>
                    <button type="reset">ยกเลิก</button>
                    <button type="submit">แก้ไขสินค้า</button>
                </div>
            </form>
         </div>
    )
}