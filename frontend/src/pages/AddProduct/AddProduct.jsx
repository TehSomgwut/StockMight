import StyleAddProduct from './AddProduct.module.css';
import Header from '../../components/PageHeader/PageHeader';
import InputField from '../../components/InputField/InputField';
import StyleInputField from '../../components/InputField/InputField.module.css';
import { useState } from 'react'

export default function AddProduct() {
    const [starterValue, setStarterValue] = useState(0);
    const [alertValue, setAlertValue] = useState(0);
    
    const addA = () => setAlertValue(prev => prev + 1);
    const minusA = () => setAlertValue(prev => (prev > 0 ? prev - 1 : 0));

    const addS = () => setStarterValue(prev => prev + 1);
    const minusS = () => setStarterValue(prev => (prev > 0 ? prev - 1 : 0));

    return (
         <div className={StyleAddProduct.addProduct}>
            <header>
                <img src="\Icon\3-Inventory-addnew\inventory\Icon-12.svg" />
                <Header header="เพิ่มสินค้าใหม่" description="เพิ่มสินค้าใหม่เข้าสู่ระบบ" />
            </header>
            <form>
                <InputField name="รหัสสินค้า (SKU/GTIN)" placeholder="เช่น ELC-001" description="รหัสต้องไม่ซ้ำกับสินค้าอื่น" isReq={true} />
                <InputField name="ชื่อสินค้า" placeholder="ระบุชื่อสินค้า" isReq={true} />
                <InputField name="คำอธิบายสินค้า" placeholder="ระบุรายระเอียดสินค้า" isReq={true} addClass={StyleInputField.long} />
                <div>
                    <p>รูปสินค้า</p>
                    <label htmlFor='input-product-image'>
                        <img src="/Icon/3-Inventory-addnew/inventory/Icon.svg" />
                        <p>คลิปเพื่ออัปโหลดรูปภาพ หรือลากไฟล์มาวาง</p>
                        <p className={StyleAddProduct.description}>รองรับไฟล์ PNG, JPG, JPEG (ขนาดไม่เกิน 5MB)</p>
                        <input type="file" id="input-product-image" name="input-product-image" />
                    </label>
                </div>
                <div className={StyleAddProduct["input-container"]}>
                    <div className={StyleInputField["input-field"]}>
                        <p>หมวดหมู่สินค้า</p>
                        <select className={StyleAddProduct.category} require >
                            <option value="">เลือกหมวดหมู่</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div className={StyleInputField["input-field"]}>
                        <p>หน่วยนับ</p>
                        <select className={StyleAddProduct.metric} required >
                            <option value="">เลือกหน่วยนับ</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>
                <div className={StyleAddProduct["input-container"]}>
                    <div className={StyleInputField["input-field"]}>
                        <p>จำนวนเริ่มต้น</p>
                        <div className={StyleAddProduct["number-input"]}>
                            <span onClick={minusS}>-</span>
                            <input type="number" min={0} required value={starterValue} onChange={(e) => setStarterValue(Number(e.target.value))} />
                            <span onClick={addS}>+</span>
                        </div>
                    </div>
                    <div className={StyleInputField["input-field"]}>
                        <p>จุดแจ้งเตือนสต๊อกต่ำ</p>
                        <div className={StyleAddProduct["number-input"]}>
                            <span onClick={minusA}>-</span>
                            <input type="number" min={0} required value={alertValue} onChange={(e) => setAlertValue(Number(e.target.value))} />
                            <span onClick={addA}>+</span>
                        </div>
                        <p className={StyleAddProduct.description}>แจ้งเตือนเมื่อสต๊อกต่ำกว่าจำนวนนี้</p>
                    </div>
                </div>
                <div className={StyleAddProduct["input-container"]}>
                    <div className={StyleInputField["input-field"]}>
                        <p>วันผลิต</p>
                        <input type="date" required />
                    </div>
                    <div className={StyleInputField["input-field"]}>
                        <p>วันหมดอายุ</p>
                        <input type="date" required />
                    </div>
                </div>
                <div className={StyleInputField["input-field"]}>
                    <p>สถานะ</p>
                    <select className={StyleAddProduct.metric} required >
                        <option value="">เลือกสถานะ</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
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