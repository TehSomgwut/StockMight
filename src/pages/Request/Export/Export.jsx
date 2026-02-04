import StyleExport from './Export.module.css'
import { useState } from 'react'
import StyleInputField from '../../../components/InputField/InputField.module.css';
import StyleAddProduct from '../../AddProduct/AddProduct.module.css';
import InputField from '../../../components/InputField/InputField';

export default function Export() {

    const [amount, setAmount] = useState(0)
    const addA = () => setAmount(prev => prev + 1);
    const minusA = () => setAmount(prev => (prev > 0 ? prev - 1 : 0));
    return (
         <form className={`{${StyleExport["export-form"]} ${StyleAddProduct["addProduct"]}}`}>
            <div className={StyleExport.search}>
                <p>เลือกสินค้า</p>
                <label htmlFor="search-request">
                    <img src="/Icon/4-Receive-issue/Icon.svg" />
                    <input type='text' placeholder='ค้นหาด้วย SKU หรือชื่อสินค้า' required />
                </label>
            </div>
            <div className={StyleExport.detail}>
                <p>- คงเหลือปัจจุบัน</p>
                <h3>- หน่วย</h3>
                <p>เลือกสินค้าเพื่อดูจำนวนคงเหลือ</p>
            </div>
            <div className={StyleInputField["input-field"]}>
                <p>จำนวน</p>
                <div className={StyleAddProduct["number-input"]}>
                    <span onClick={minusA}>-</span>
                    <input type="number" min={0} required value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                    <span onClick={addA}>+</span>
                </div>
            </div>
            <InputField name="เหตุผล" placeholder="ระบุเหตุผล" isReq={true} />
            <InputField name="หมายเหตุ" placeholder="ระบุรายละเอียดเพิ่มเติม (ไม่บังคับ)" addClass={StyleInputField["long"]} />
            <div className={StyleAddProduct["input-container"]}>
                <button type="reset">ยกเลิก</button>
                <button type="submit">ยืนยันรับเข้า</button>
            </div>
         </form>
    )
}