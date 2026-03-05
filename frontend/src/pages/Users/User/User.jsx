import styleUser from './User.module.css';
import DeleteComponent from '../../../components/DeleteComponent/DeleteComponent.jsx'
import { useState } from 'react'
import StyleUsers from '../Users.module.css'
import InputField from '../../../components/InputField/InputField.jsx';

export default function User({_id , src, username, realname, email, role, status, lastLogin}) {

    const [isShow, setIsShow] = useState(false)
    const [user, setUser] = useState({_id: _id, src: src, username: username, realname: realname, email: email, role: role, status: status, lastLogin: lastLogin})
    const [showEdit, setShowEdit] = useState(false)

    function handleChange(e) {
        const { name, value } = e.target
        setUser((prev) => ({...prev, [name]: value}))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const res = fetch(`https://stockmight-backend.onrender.com/api/users/${_id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        })
    }

    const img = src ? <img src={src} /> : <h4>{username?.slice(0, 1)}</h4> || "-";
    const roleC = role == "ผู้จัดการ" ? "blue" : "green";
    const statusC = status == "ใช้งาน" ? "green" : "gray";
    function roleColor() {
        switch (role) {
            case "staff":
                return { backgroundColor: 'var(--main10)', color: 'var(--main)'}
            case "manager":
                return { backgroundColor: 'var(--safe10)', color: 'var(--safe)'}
            case "admin":
                return { backgroundColor: 'var(--danger10)', color: 'var(--danger)'}
        }
    }

    function handleDelete() {
        setIsShow(!isShow)
    }

    async function confirmDelete() {
        try {
            await fetch(`https://stockmight-backend.onrender.com/api/users/${_id}`, {method: "DELETE"})
            console.log("confirm")
            setIsShow(!isShow)
        } catch {
            setIsShow(!isShow)
        }
    }

    return(
        <div className={styleUser.User}>
            <div className={styleUser.content}>
                <div>
                    {img}
                    <p className={styleUser.thin}>{username}</p>
                </div>
                <p>{realname}</p>
                <p className={styleUser.thin}>{email}</p>
                <p className={styleUser[roleC]} style={roleColor()}>{role}</p>
                <p className={styleUser[statusC]}>{status}</p>
                <p className={styleUser.thin}>{lastLogin ? new Date(lastLogin).toLocaleDateString('th-TH') : "-"}</p>
                <div>
                    <img src="/Icon/6-Categories/Icon-1.svg" onClick={() => setShowEdit(!showEdit)} style={{cursor: 'pointer'}} />
                    <img src="/Icon/6-Categories/Icon.svg" onClick={handleDelete} style={{cursor: 'pointer'}} />
                </div>
                <DeleteComponent isShow={isShow} setIsShow={setIsShow} h3="ยืนยันการลบผู้ใช้" p={`คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้ "${user.username}" (${user.role})? การดำเนินการนี้ไม่สามารถยกเลิกได้`} onConfirm={confirmDelete} />
            </div>

            {/* Edit */}
            <div className={StyleUsers["add-user"]} style={showEdit ? {display: 'flex', textAlign: 'left'} : {display: 'none'}}>
                <div className={StyleUsers["black-filter"]}></div>
                <form className={StyleUsers.wrapper} onSubmit={handleSubmit}>
                    <header><img src="/Icon/9-Users/add-user-svgrepo-com.svg" />
                        <div>
                            <h4>แก้ไขข้อมูลผู้ใช้ "{user.username}"</h4>
                            <p>กรอกข้อมูลผู้ใช้</p>
                        </div>
                    </header>
                    <div>
                        <InputField name="ชื่อผู้ใช้" placeholder={user.username} formName={'username'} onChange={handleChange} />
                        <InputField name="ชื่อ-นามสกุล" placeholder={user.realname} formName={'realname'} onChange={handleChange} />
                    </div>
                    <InputField name="email" placeholder={user.email} formName={'email'} onChange={handleChange} />
                    <div className={StyleUsers.passwordField}>
                        <p>รหัสผ่าน <span className={StyleUsers.description}></span></p>
                        <input type="password" placeholder='กรอกรหัสผ่าน' name="password" onChange={handleChange} />
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
                        <button type="submit" onClick={() => setShowEdit(!showEdit)}>แก้ไขข้อมูลผู้ใช้</button>
                        <button type="reset" onClick={() => setShowEdit(!showEdit)}>ยกเลิก</button>
                    </div>
                </form>
            </div>
        </div>
    )
}