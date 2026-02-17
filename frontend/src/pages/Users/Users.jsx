import StyleUsers from './Users.module.css'
import User from './User/User';
import Header from '../../components/PageHeader/PageHeader'
import Card from '../Inventory/AllProductCard/Card'
import StyleExport from '../Request/Export/Export.module.css'
import InputField from '../../components/InputField/InputField';
import { useState, useEffect } from 'react';

export default function Users() {

    const [showAdd, setShowAdd] = useState(false);
    const [ form, setForm ] = useState({role: "staff", status: "ใช้งาน"})
    const [ userData, setUserData ] =useState([])
    
    function handleChange(e) {
        const { name, value } = e.target
        setForm((prev) => ({...prev, [name]: value}))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:3000/api/users/', {
                method: 'POST',
                headers: {"content-type": "application/json"},
                body: JSON.stringify(form)
            })
            window.alert(form.username ,"บันทึกเรียบร้อย")
            if (res.ok) {
                setShowAdd(!showAdd);
            }
            else {
                window.alert("ผู้ใช้นี้อาจมีอยู่แล้ว")
            }
        } catch {
                window.alert("ไม่สามารถเชื่อมต่อได้")
        }
        console.log(form)
    }

    
    useEffect(() => {
        async function getUsers() {
            try {
                const res = await fetch('http://localhost:3000/api/users/', {method: "GET"});
                if (res.ok) {
                    console.log(res);
                    const userD = await res.json()
                    console.log("JSON: ", userD)
                    setUserData(userD)
                }
            }
            catch {
                window.alert("การเชื่อมต่อผู้ใช้มีปัญหา")
            }
        }
        getUsers()
    }, [])
    // const userData = [
    //     {username: "Tae1231212121", realname: "Songwut Phosri", email: "Songwut123@example.com", role: "ผู้จัดการ", status: "กำลังใช้งาน", recent: new Date()},
    //     {username: "BotaHaKeeTak", realname: "Kittinat K.", email: "BOBOBOBO@example.com", role: "ผู้จัดการ", status: "ไม่ได้ใช้งาน", recent: new Date()},
    //     {username: "Jackkkkkkkkkkkkkson michael", realname: "Jirakrit mula", email: "Keerajid321@example.com", role: "พนักงานคลัง", status: "กำลังใช้งาน", recent: new Date()},
    // ]

    return (
         <div className={StyleUsers.Users}>
            <div className={StyleUsers.header}>

                <Header header="จัดการผู้ใช้" description="จัดการบัญชีผู้ใช้งานระบบ (สามารถจัดการ ผู้จัดการ และพนักงานคลัง)" />
                <div className={StyleUsers["add-button"]} onClick={() => setShowAdd(!showAdd)}>
                    <img src="\Icon\6-Categories\Icon-2.svg" />
                    <p>เพิ่มผู้ใช้งานใหม่</p>
                </div>
            </div>
            <div className={StyleUsers["card-container"]}>
                <Card text="ผู้ใช้งานทั้งหมด" value={userData.length} src='/Icon/9-Users/Icon-6.svg' CN="blue" />
                <Card text="ใช้งาน" value={userData.filter((item) => item.status === "ใช้งาน").length} src='/Icon/9-Users/Icon-5.svg' CN="green" />
                <Card text="ปิดการใช้งาน" value={userData.filter((item) => item.status === "ปิดการใช้งาน").length} src='/Icon/9-Users/Icon-4.svg' />
            </div>
            <div className={StyleExport.search}>
                <p>ค้าหาผู้ใช้</p>
                <label htmlFor="search-request">
                    <img src="/Icon/4-Receive-issue/Icon.svg" />
                    <input type='text' placeholder='ค้นหาผู้ใช้ด้วยชื่อ หรืออีเมล' required />
                </label>
            </div>
            <div className={StyleUsers.Thead}>
                <p>ชื่อผู้ใช้</p>
                <p>ชื่อ-นามสกุล</p>
                <p>อีเมล</p>
                <p>บทบาท</p>
                <p>สถานะ</p>
                <p>เข้าสู่ระบบล่าสุด</p>
                <p>จัดการ</p>
            </div>
            <div className={StyleUsers.Tbody}>
                { userData.length != 0 ? userData.map((item, index) => {
                    return <User key={index} {...item} />
                }) : <p style={{color: 'var(--gray)', position: 'absolute', fontSize: '1.2em', marginLeft: '33%'}}>ไม่พบข้อมูลผู้ใช้งาน</p>}
            </div>
            <div className={StyleUsers["add-user"]} style={showAdd ? {display: 'flex'} : {display: 'none'}}>
                <div className={StyleUsers["black-filter"]}></div>
                <form className={StyleUsers.wrapper} onSubmit={handleSubmit}>
                    <header><img src="/Icon/9-Users/add-user-svgrepo-com.svg" />
                        <div>
                            <h4>เพิ่มผู้ใช้ใหม่</h4>
                            <p>กรอกข้อมูลผู้ใช้ใหม่</p>
                        </div>
                    </header>
                    <div>
                        <InputField name="ชื่อผู้ใช้" placeholder="manager" isReq={true} formName={'username'} onChange={handleChange} />
                        <InputField name="ชื่อ-นามสกุล" placeholder="กรอกชื่อ-นามสกุล" isReq={true} formName={'realname'} onChange={handleChange} />
                    </div>
                    <InputField name="email" placeholder="กรอกอีเมล" isReq={true} formName={'email'} onChange={handleChange} />
                    <div className={StyleUsers.passwordField}>
                        <p>รหัสผ่าน <span className={StyleUsers.description}></span></p>
                        <input type="password" placeholder='กรอกรหัสผ่าน' required name="password" onChange={handleChange} />
                    </div>
                    <div className={StyleUsers.selectField}>
                        <div>
                            <p>บทบาท</p>
                            <select name="role" onChange={handleChange}>
                                <option value="staff">staff</option>
                                <option value="admin">admin</option>
                                <option value="manager">manager</option>
                            </select>
                        </div>
                        <div>
                            <p>สถานะ</p>
                            <select name="status" onChange={handleChange}>
                                <option value="ใช้งาน">ใช้งาน</option>
                                <option value="ปิดการใช้งาน">ปิดการใช้งาน</option>
                            </select>
                        </div>
                    </div>
                    <div className={StyleUsers["button-container"]}>
                        <button type="submit">เพิ่มผู้ใช้งาน</button>
                        <button type="reset" onClick={() => setShowAdd(!showAdd)}>ยกเลิก</button>
                    </div>
                </form>
            </div>
         </div>
    )
}