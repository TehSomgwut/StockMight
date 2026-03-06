import StyleAddProduct from './AddProduct.module.css';
import Header from '../../components/PageHeader/PageHeader';
import InputField from '../../components/InputField/InputField';
import StyleInputField from '../../components/InputField/InputField.module.css';
import { useState, useEffect } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

export default function AddProduct() {
    const [starterValue, setStarterValue] = useState(0);
    const [alertValue, setAlertValue] = useState(0);
    const [form, setForm] = useState({quantity: starterValue, minStock: alertValue});
    const [categories, setCategories] = useState([])
    const [metric, setMetric] = useState([])
    const [isShow, setIsShow] = useState(false)
    const [image, setImage] = useState(null)
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

    function handleCheckBoxChange(e) {
        const { name } = e.target
        setShowDate(prev => ({...prev, [name]: !prev[name]}))
    }

    function handleImageChange(e) {
        const file = e.target.files[0]
        setImage(file);
        setIsShow(URL.createObjectURL(file))
    }

    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     const payload = {
    //         ...form,
    //         minStock: alertValue,
    //         quantity: starterValue,
    //         image: image
    //     };
    //     setForm(payload);
    //     console.log("Data to send:", payload);
    //     try {
    //         const res = fetch('https://stockmight-backend.onrender.com/api/product/', {
    //             method: "POST",
    //             // headers: {"content-type": "application/json"},
    //             body: form
    //         })

    //         if (res.ok) {
    //             window.alert(form.name, " บันทึกเสร็จสิ้น")
    //             navigate('/pages/inventory')
    //         }

    //         else {
    //             window.alert(res.message)
    //         }
    //     } catch (err) {
    //         console.log("ERR : ", err)
    //     }
    // }

    async function handleSubmit(e) { //เต้ลืมว่า object FormData มีอยู่จริง เลยเพิ่งมาใช้
        e.preventDefault();

        //ใช้ FormData แทน Object ปกติ
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
            const res = await fetch('https://stockmight-backend.onrender.com/api/product/', {
                method: "POST",
                // Browser จะใส่ 'multipart/form-data' พร้อม Boundary ให้เอง
                body: formData 
            });
            
            if (res.ok) {
                window.alert("บันทึกเสร็จสิ้น");
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

    useEffect(()=> {
        async function getMetric() {
            try {
                const res = await fetch("https://stockmight-backend.onrender.com/api/metric/", {
                    method: "GET"
                });
    
                if (res.ok) {
                    const dataMetric = await res.json();
                    const activeM = dataMetric.filter((item) => item.status == 'active')
                    console.log(activeM)
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
                const res = await fetch("https://stockmight-backend.onrender.com/api/category", {
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

        getMetric();
        getCategories();
    }, [])

    return (
         <div className={StyleAddProduct.addProduct}>
            <header>
                <img src="\Icon\3-Inventory-addnew\inventory\Icon-12.svg" />
                <Header header="เพิ่มสินค้าใหม่" description="เพิ่มสินค้าใหม่เข้าสู่ระบบ" />
            </header>
            <form onSubmit={handleSubmit}>
                <InputField name="รหัสสินค้า (SKU/GTIN)" placeholder="เช่น ELC-001" description="รหัสต้องไม่ซ้ำกับสินค้าอื่น" isReq={true} formName="code" onChange={handleChange} />
                <InputField name="ชื่อสินค้า" placeholder="ระบุชื่อสินค้า" isReq={true} formName="name" onChange={handleChange} />
                <InputField name="คำอธิบายสินค้า" placeholder="ระบุรายระเอียดสินค้า" isReq={true} addClass={StyleInputField.long} formName="description" onChange={handleChange} />
                <div>
                    <p>รูปสินค้า</p>
                    <label htmlFor='input-product-image'>
                        <img src="/Icon/3-Inventory-addnew/inventory/Icon.svg" style={ isShow ? {display: 'none'} : {}} />
                        <p style={ isShow ? {display: 'none'} : {}}>คลิปเพื่ออัปโหลดรูปภาพ หรือลากไฟล์มาวาง</p>
                        <p className={StyleAddProduct.description} style={ isShow ? {display: 'none'} : {}}>รองรับไฟล์ PNG, JPG, JPEG (ขนาดไม่เกิน 5MB)</p>
                        <input type="file" id="input-product-image" name="image" onChange={handleImageChange} />
                        { isShow ? <img className={StyleAddProduct["preview-image"]} src={isShow} /> : <div></div> }
                    </label>
                </div>
                <div className={StyleAddProduct["input-container"]}>
                    <div className={StyleInputField["input-field"]}>
                        <p>หมวดหมู่สินค้า</p>
                        <select className={StyleAddProduct.category} require name="category" onChange={handleChange} >
                            <option value="">เลือกหมวดหมู่</option>
                            { categories.map((item) => {
                                return <option value={item._id}>{item.name}</option>
                            }) }
                        </select>
                    </div>
                    <div className={StyleInputField["input-field"]}>
                        <p>หน่วยนับ</p>
                        <select className={StyleAddProduct.metric} required name="metric" onChange={handleChange} >
                            <option value="">เลือกหน่วยนับ</option>
                            { metric.map((item) => {
                                return <option value={item._id}>{item.name}</option>
                            }) }
                        </select>
                    </div>
                </div>
                <div className={StyleAddProduct["input-container"]}>
                    <div className={StyleInputField["input-field"]}>
                        <p>จำนวนเริ่มต้น</p>
                        <div className={StyleAddProduct["number-input"]}>
                            <span onClick={minusS}>-</span>
                            <input type="number" min={0} required value={starterValue} onChange={(e) => setStarterValue(Number(e.target.value))} name="quantity" />
                            <span onClick={addS}>+</span>
                        </div>
                        <p className={StyleAddProduct.description}>จำนวนที่รับเข้ามาครั้งแรก หรือจำนวนเริ่มต้นเมื่อเพิ่มสินค้าเข้ามา</p>
                    </div>
                    <div className={StyleInputField["input-field"]}>
                        <p>จุดแจ้งเตือนสต๊อกต่ำ</p>
                        <div className={StyleAddProduct["number-input"]}>
                            <span onClick={minusA}>-</span>
                            <input type="number" min={0} required value={alertValue} onChange={(e) => setAlertValue(Number(e.target.value))} name="minStock" />
                            <span onClick={addA}>+</span>
                        </div>
                        <p className={StyleAddProduct.description}>แจ้งเตือนเมื่อสต๊อกต่ำกว่าจำนวนนี้</p>
                    </div>
                </div>
                <div className={StyleAddProduct["input-container"]}>
                    <div className={StyleAddProduct["checkbox-container"]} style={{}}>
                        <p>สินค้านี้มี</p>
                        <div>
                            <label htmlFor='showMFG'>
                                วันผลิต
                            </label>
                                <input id='showMFG' name='showMFG' value="showMFG" type='checkbox' onChange={handleCheckBoxChange} />

                            <label htmlFor='showEXP'>
                                วันหมดอายุ
                            </label>
                                <input id='showEXP' name='showEXP' value="showEXP" type='checkbox' onChange={handleCheckBoxChange} />

                            <label htmlFor='showClearStock'>
                                วันที่ควรล้าง Stock
                            </label>
                                <input id='showClearStock' name='showClearStock' value="showClearStock" type='checkbox' onChange={handleCheckBoxChange} />
                        </div>
                    </div>
                    <div className={StyleInputField["input-field"]} style={{display: showDate.showMFG ? '' : 'none'}}>
                        <p>วันผลิต</p>
                        <input type="date" name='MFG' onChange={handleChange} />
                    </div>
                    <div className={StyleInputField["input-field"]} style={{display: showDate.showEXP ? '' : 'none'}}>
                        <p>วันหมดอายุ</p>
                        <input type="date" name='EXP' onChange={handleChange} />
                    </div>
                    <div className={StyleInputField["input-field"]} style={{display: showDate.showClearStock ? '' : 'none'}}>
                        <p>วันล้างสต๊อกสินค้า</p>
                        <input type="date" name='clearStock' onChange={handleChange} />
                    </div>
                </div>
                <div className={StyleInputField["input-field"]}>
                    <p>สถานะ</p>
                    <select className={StyleAddProduct.metric} required onChange={handleChange} name="status" >
                        <option value="">เลือกสถานะ</option>
                        <option value="active">ใช้งาน</option>
                        <option value="inactive">ไม่ใช้งาน</option>
                    </select>
                </div>
                <div className={StyleAddProduct["input-container"]}>
                    <button type="reset">ยกเลิก</button>
                    <button type="submit">เพิ่มสินค้า</button>
                </div>
            </form>
         </div>
    )
}