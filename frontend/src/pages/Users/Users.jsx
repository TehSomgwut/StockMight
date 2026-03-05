import StyleUsers from './Users.module.css'
import User from './User/User';
import Header from '../../components/PageHeader/PageHeader'
import Card from '../Inventory/AllProductCard/Card'
import StyleExport from '../Request/Export/Export.module.css'
import InputField from '../../components/InputField/InputField';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io("http://stockmight-backend.onrender.com");

export default function Users() {

    const [showAdd, setShowAdd] = useState(false);
    const [form, setForm] = useState({role: "staff", status: "ใช้งาน"})
    const [userData, setUserData] = useState([])
    const [allUser, setAllUser] = useState([])
    const [showFilter, setShowFilter] = useState(false)
    
    // 🟢 1. State ถังเก็บเงื่อนไขการกรองและการค้นหาทั้งหมด
    const [filters, setFilters] = useState({
        keyword: "",
        roles: [],
        status: "all" 
    });

    function handleChange(e) {
        const { name, value } = e.target
        setForm((prev) => ({...prev, [name]: value}))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await fetch('http://stockmight-backend.onrender.com/api/users/', {
                method: 'POST',
                headers: {"content-type": "application/json"},
                body: JSON.stringify(form)
            })
            if (res.status == 200) {
                setShowAdd(false);
            }
            else if (res.status == 409) {
                window.alert("ผู้ใช้นี้อาจมีอยู่แล้ว")
            }
        } catch {
            window.alert("ไม่สามารถเชื่อมต่อได้")
            setShowAdd(false);
        }
    }
    
    useEffect(() => {
        async function getUsers() {
            try {
                const res = await fetch('http://stockmight-backend.onrender.com/api/users/', {method: "GET"});
                if (res.ok) {
                    const userD = await res.json()
                    setAllUser(userD) 
                }
            }
            catch {
                window.alert("การเชื่อมต่อผู้ใช้มีปัญหา")
            }
        }
        getUsers()

        socket.on('userUpdate', () => {
            getUsers()
        })
        socket.on('connect', () => getUsers())

        return () => {
            socket.off('userUpdate')
        }
    }, [])

    useEffect(() => {
        let result = [...allUser];

        if (filters.keyword) {
            result = result.filter(item => 
                item.username.toLowerCase().includes(filters.keyword) || 
                item.email.toLowerCase().includes(filters.keyword)
            );
        }

        // (Checkbox - OR Logic)
        if (filters.roles.length > 0) {
            result = result.filter(item => filters.roles.includes(item.role));
        }

        // Status (Radio)
        if (filters.status !== "all") {
            result = result.filter(item => item.status === filters.status);
        }

        setUserData(result);
        
    }, [filters, allUser]);


    function handleSearchChange(e) {
        const value = e.target.value.toLowerCase();
        setFilters(prev => ({ ...prev, keyword: value }));
    }

    // 🟢 4. ฟังก์ชันจัดการเมื่อกด Checkbox (Role)
    function handleRoleChange(e) {
        const { value, checked } = e.target;
        setFilters(prev => {
            if (checked) {
                return { ...prev, roles: [...prev.roles, value] };
            } else {
                return { ...prev, roles: prev.roles.filter(role => role !== value) };
            }
        });
    }

    // 🟢 5. ฟังก์ชันจัดการเมื่อกด Radio (Status)
    function handleStatusChange(e) {
        const { value } = e.target;
        setFilters(prev => ({ ...prev, status: value }));
    }

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
                <Card text="ผู้ใช้งานทั้งหมด" value={allUser.length} src='/Icon/9-Users/Icon-6.svg' CN="blue" />
                <Card text="ใช้งาน" value={allUser.filter((item) => item.status === "ใช้งาน").length} src='/Icon/9-Users/Icon-5.svg' CN="green" />
                <Card text="ปิดการใช้งาน" value={allUser.filter((item) => item.status === "ปิดการใช้งาน").length} src='/Icon/9-Users/Icon-4.svg' />
            </div>

            <div className={`${StyleExport.search} ${StyleUsers.search}`}>
                <p>ค้นหาผู้ใช้</p>
                <div>
                    <label>
                        <img src="/Icon/4-Receive-issue/Icon.svg" />
                        <input type='text' placeholder='ค้นหาผู้ใช้ด้วยชื่อ หรืออีเมล' required onChange={handleSearchChange} />
                    </label>
                    <label onClick={() => setShowFilter(!showFilter)} style={{cursor: 'pointer'}}>
                        <img src="/Icon/2-Inventory/Icon-3.svg" />
                        <p>กรองผู้ใช้</p>
                    </label>
                    <div className={StyleUsers["filter-container"]} style={showFilter ? {display: 'flex'} : {display: 'none'}}>
                        <div className="role-filter">
                            <label><input type='checkbox' value='manager' onChange={handleRoleChange} />manager</label>
                            <label><input type='checkbox' value='staff' onChange={handleRoleChange} />staff</label>
                            <label><input type='checkbox' value='admin' onChange={handleRoleChange} />admin</label>
                        </div>
                        <div className='status-filter'>
                            <label><input type='radio' name='status' value='all' defaultChecked onChange={handleStatusChange} />ทั้งหมด</label>
                            <label><input type='radio' name='status' value='ใช้งาน' onChange={handleStatusChange} />กำลังใช้งาน</label>
                            <label><input type='radio' name='status' value='ปิดการใช้งาน' onChange={handleStatusChange} />ปิดการใช้งาน</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className={StyleUsers["Users-table"]}>
                <p className={StyleUsers.Thead}>ชื่อผู้ใช้</p>
                <p className={StyleUsers.Thead}>ชื่อ-นามสกุล</p>
                <p className={StyleUsers.Thead}>อีเมล</p>
                <p className={StyleUsers.Thead}>บทบาท</p>
                <p className={StyleUsers.Thead}>สถานะ</p>
                <p className={StyleUsers.Thead}>เข้าสู่ระบบล่าสุด</p>
                <p className={StyleUsers.Thead}>จัดการ</p>

                { userData.length != 0 ? userData.map((item, index) => {
                    return <User key={item._id || index} {...item} />
                }) : <p style={{color: 'var(--gray)', position: 'absolute', fontSize: '1.2em', marginLeft: '33%', marginTop: '40px'}}>ไม่พบข้อมูลผู้ใช้งาน</p>}
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
                        <button type="reset" onClick={() => setShowAdd(false)}>ยกเลิก</button>
                    </div>
                </form>
            </div>
         </div>
    )
}