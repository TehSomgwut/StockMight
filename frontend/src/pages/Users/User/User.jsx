import styleUser from './User.module.css';

export default function User({_id , src, username, realname, email, role, status, lastLogin}) {

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
                <img src="/Icon/6-Categories/Icon-1.svg" />
                <img src="/Icon/6-Categories/Icon.svg" />
            </div>
        </div>
    )
}