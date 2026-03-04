import StyleExport from './Export.module.css';
import { useState, useEffect } from 'react';
import StyleInputField from '../../../components/InputField/InputField.module.css';
import StyleAddProduct from '../../AddProduct/AddProduct.module.css';
import InputField from '../../../components/InputField/InputField';
import { useNavigate } from 'react-router-dom';

export default function Export({ type, productsData }) {
    const [amount, setAmount] = useState(0);
    const [findShow, setFindShow] = useState(false);
    const [select, setSelect] = useState([]);
    const [allSupplies, setAllSupplies] = useState([]);
    const [supplies, setSupplies] = useState([]);
    const [Note, setNote] = useState({ reason: "", note: "-" });

    const navigate = useNavigate();

    const addA = () => setAmount(prev => prev + 1);
    const minusA = () => setAmount(prev => (prev > 0 ? prev - 1 : 0));
    useEffect(() => {
        setAllSupplies(productsData || []);
        setSupplies(productsData || []);
    }, [productsData]);

    function handleSearchChange(e) {
        const value = e.target.value.toLowerCase();
        if (value !== "") {
            setFindShow(true);
            setSupplies(allSupplies.filter((item) => 
                item.name.toLowerCase().includes(value) || 
                item.code.toLowerCase().includes(value)
            ));
        } else {
            setFindShow(false);
        }
    }

    function handleNoteChange(e) {
        const { value, name } = e.target;
        setNote(prev => ({ ...prev, [name]: value }));
    }

    function chooseProduct(item) {
        setSelect(prev => {
            if(prev.find(p => p._id === item._id)) return prev;
            return [...prev, item];
        });
        setFindShow(false);
    }

    function delChoose(item) {
        setSelect(prev => prev.filter((i) => i._id !== item._id));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const resMe = await fetch('http://localhost:3000/api/users/me', {
                method: 'GET',
                credentials: 'include'
            });
            const user = await resMe.json();
            const resType = type ?? 'import';
            const resForm = {
                amount: amount,
                type: resType,
                user: user._id,
                note: Note.note,
                reason: Note.reason
            };
            const promises = select.map(item => {
                const payload = { ...resForm, product: item._id }; 
                return fetch(`http://localhost:3000/api/transaction/${item._id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
            });
            const results = await Promise.all(promises);
            const dataResults = await Promise.all(results.map(res => res.json()));
            const errorResponse = results.find(res => !res.ok);
            const errorIndex = results.findIndex(res => !res.ok);

            if (errorResponse) {
                alert(`เกิดข้อผิดพลาด: ${dataResults[errorIndex].message}`);
            } else {
                alert("บันทึกข้อมูลสำเร็จ");
                setSelect([]);
                setAmount(0);
                navigate('/pages/inventory');
            }
        } catch (err) {
            console.error("Submit Error:", err);
            alert('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
        }
    }

    return (
         <form className={StyleExport["export-form"]} onSubmit={handleSubmit}>
            <div className={StyleExport.search}>
                <p>เลือกสินค้า</p>
                <label htmlFor="search-request">
                    <img src="/Icon/4-Receive-issue/Icon.svg" alt="search" />
                    { select.map((item) => {
                        return (
                            <div key={item._id} className={StyleExport.choose}>
                                <img src="/Icon/2-Inventory/Icon-1.svg" onClick={() => delChoose(item)} style={{cursor: 'pointer'}} alt="delete" />
                                <p>{item.code} : {item.name}</p>
                            </div>
                        )
                    }) }
                    <input type='text' placeholder='ค้นหาด้วย SKU หรือชื่อสินค้า' onChange={handleSearchChange} />
                </label>
                <div className={StyleExport.find} style={findShow ? {} : {height: '0', padding: '0', overflow: 'hidden'}}>
                    { supplies.map((item) => {
                        return <p key={item._id} onClick={() => chooseProduct(item)} style={{cursor: 'pointer'}}>{item.code} : {item.name}</p>
                    }) }
                </div>
            </div>
            
            { select.length === 0 ? (
                <div className={StyleExport.detail}>
                    <p>- คงเหลือปัจจุบัน</p>
                    <h3>- หน่วย</h3>
                    <p>เลือกสินค้าเพื่อดูจำนวนคงเหลือ</p>
                </div>
            ) : select.map((item) => {
                return (
                    <div key={item._id} className={StyleExport.detail}>
                        <p>จำนวนคงเหลือปัจจุบันของ {item.name}</p>
                        <h3>{item.quantity} {item.metric?.name || "หน่วย"}</h3>
                    </div>
                )
            })}
            
            <div className={StyleInputField["input-field"]}>
                <p>จำนวน</p>
                <div className={StyleAddProduct["number-input"]}>
                    <span onClick={minusA} style={{cursor: 'pointer'}}>-</span>
                    <input type="number" min={0} required value={amount} onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))} />
                    <span onClick={addA} style={{cursor: 'pointer'}}>+</span>
                </div>
            </div>
            
            <InputField onChange={handleNoteChange} formName={"reason"} name="เหตุผล" placeholder="ระบุเหตุผล" isReq={true} />
            <InputField onChange={handleNoteChange} formName={"note"} name="หมายเหตุ" placeholder="ระบุรายละเอียดเพิ่มเติม (ไม่บังคับ)" addClass={StyleInputField["long"]} />
            
            <div className={StyleAddProduct["input-container"]}>
                <button type="button" onClick={() => { setSelect([]); setAmount(0); }}>ยกเลิก</button>
                <button type="submit" disabled={select.length === 0 || amount === 0}>
                    { type === 'import' ? "ยืนยันการรับเข้า" : "ยืนยันการเบิกออก"}
                </button>
            </div>
         </form>
    );
}