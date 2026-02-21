import styleUser from './User.module.css';
import DeleteComponent from '../../../components/DeleteComponent/DeleteComponent.jsx'
import { useEffect, useState } from 'react'

export default function User({_id , src, username, realname, email, role, status, lastLogin}) {

    const [isShow, setIsShow] = useState(false)
    const [user, setUser] = useState("")

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
            await fetch(`http://localhost:3000/api/users/${_id}`, {method: "DELETE"})
            console.log("confirm")
            setIsShow(!isShow)
        } catch {
            setIsShow(!isShow)
        }
    }

    useEffect(() => {
        async function getUser() {
            const userRes = await fetch(`http://localhost:3000/api/users/${_id}`, {method: "GET"});
            const userJ = await userRes.json();
            setUser(userJ);
        }
        getUser()
    }, [])


    return(
        <div className={styleUser.User}>
            <div>
                {img}
                <p className={styleUser.thin}>{username}</p>
            </div>
            <p>{realname}</p>
            <p className={styleUser.thin}>{email}</p>
            <p className={styleUser[roleC]} style={roleColor()}>{role}</p>
            <p className={styleUser[statusC]}>{status}</p>
            <p className={styleUser.thin}>{lastLogin?.toLocaleDateString('th-TH') || "-"}</p>
            <div>
                <img src="/Icon/6-Categories/Icon-1.svg" style={{cursor: 'pointer'}} />
                <img src="/Icon/6-Categories/Icon.svg" onClick={handleDelete} style={{cursor: 'pointer'}} />
            </div>
            <DeleteComponent isShow={isShow} setIsShow={setIsShow} h3="ยืนยันการลบผู้ใช้" p={`คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้ "${user.username}" (${user.role})? การดำเนินการนี้ไม่สามารถยกเลิกได้`} onConfirm={confirmDelete} />
        </div>
    )
}