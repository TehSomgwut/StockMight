import StyleExport from './Export.module.css'
import { useState, useEffect } from 'react'
import StyleInputField from '../../../components/InputField/InputField.module.css';
import StyleAddProduct from '../../AddProduct/AddProduct.module.css';
import InputField from '../../../components/InputField/InputField';
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
const socket = io('http://localhost:3000')

export default function Export({type}) {

    const [amount, setAmount] = useState(0)
    const addA = () => setAmount(prev => prev + 1);
    const minusA = () => setAmount(prev => (prev > 0 ? prev - 1 : 0));
    const [findShow, setFindShow] = useState(false);
    const [select, setSelect] = useState([])
    const [allSupplies, setAllSupplies] = useState([])
    const [supplies, setSupplies] = useState([])
    const [Note, setNote] = useState({reason: "", note: "-"})

    const navigate = useNavigate()

    function handleSearchChange(e) {
        const { value } = e.target
        if(value !== "") {
            setFindShow(true)
            setSupplies(allSupplies.filter((item) => item.name.toLowerCase().includes(value) || item.code.includes(value)))
        }
        else {
            setFindShow(false)
        }
    }

    function handleNoteChange(e) {
        const { value, name } = e.target
        setNote(prev => ({...prev, [name]: value}))
    }

    function chooseProduct(item) {
        setSelect(prev => [...prev, item])
        console.log(item.name + " ถูกเพิ่มสำเร็จ")
    }

    function delChoose(item) {
        setSelect(prev => prev.filter((i) => i._id !== item._id))
        console.log(item.name + " ถูกลบสำเร็จ")
    }

    

    useEffect(() => {
        async function getSupplies() {
            const res = await fetch('http://localhost:3000/api/product/', {method: "GET"}).catch(() => window.alert("ไม่พบข้อมูล"))
            const resJson = await res.json()
            setAllSupplies(resJson)
            setSupplies(resJson)
        }

        getSupplies()
        socket.on('updateSupply', () => {
            getSupplies()
        })
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        const resMe = await fetch('http://localhost:3000/api/users/me', {
            method: 'GET',
            credentials: 'include'
        })
        const resType = type ?? 'import'
        const user = await resMe.json()
        const resForm = {
            amount: amount,
            type: resType,
            user: user._id,
            note: Note.note,
            reason: Note.reason
        }
        console.log(resForm)
        const promises = 
        select.map(item => fetch(`http://localhost:3000/api/transaction/${item._id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(resForm)
        }))

        const result = await Promise.all(promises)

        const dataResults = await Promise.all(result.map(res => {return res.json()}));
        if (result[0].status == 400 && dataResults) {
            alert(dataResults[0].message)
        }
        else if (result[0].ok) {
            alert("บันทึกข้อมูลสำเร็จ")
            navigate('/pages/inventory')
            console.log(dataResults)
        }
        else {
            alert('เกิดข้อผิดพลาด')
        }
        
    }

    return (
         <form className={StyleExport["export-form"]} onSubmit={handleSubmit}>
            <div className={StyleExport.search}>
                <p>เลือกสินค้า</p>
                <label htmlFor="search-request">
                    <img src="/Icon/4-Receive-issue/Icon.svg" />
                    { select.map((item) => {
                        return <div className={StyleExport.choose}>
                                    <img src="\Icon\2-Inventory\Icon-1.svg" key={item._id} onClick={() => delChoose(item)} style={{cursor: 'pointer'}} />
                                    <p>{item.code} : {item.name}</p>
                                </div>
                    }) }
                    <input type='text' placeholder='ค้นหาด้วย SKU หรือชื่อสินค้า' onChange={handleSearchChange} />
                </label>
                <div className={StyleExport.find} style={findShow ? {} : {height: '0', padding: '0'}}>
                    { supplies.map((item) => {
                        return <p onClick={() => chooseProduct(item)}>{item.code} : {item.name}</p>
                    }) }
                </div>
            </div>
            { select.length == 0 ? <div className={StyleExport.detail}>
                <p>- คงเหลือปัจจุบัน</p>
                <h3>- หน่วย</h3>
                <p>เลือกสินค้าเพื่อดูจำนวนคงเหลือ</p>
            </div> : select.map((item) => {
                return <div className={StyleExport.detail}>
                    <p>จำนวนคงเหลือปัจจุบันของ {item.name}</p>
                    <h3>{item.quantity} {(item.metric?.name)}</h3>
                </div>
            })}
            
            <div className={StyleInputField["input-field"]}>
                <p>จำนวน</p>
                <div className={StyleAddProduct["number-input"]}>
                    <span onClick={minusA}>-</span>
                    <input type="number" min={0} required value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                    <span onClick={addA}>+</span>
                </div>
            </div>
            <InputField onChange={handleNoteChange} formName={"reason"} name="เหตุผล" placeholder="ระบุเหตุผล" isReq={true} />
            <InputField onChange={handleNoteChange} formName={"note"} name="หมายเหตุ" placeholder="ระบุรายละเอียดเพิ่มเติม (ไม่บังคับ)" addClass={StyleInputField["long"]} />
            <div className={StyleAddProduct["input-container"]}>
                <button type="reset">ยกเลิก</button>
                <button type="submit">{ type==='import' ? "ยืนยันการรับเข้า" : "ยืนยันการเบิกออก"}</button>
            </div>
         </form>
    )
}