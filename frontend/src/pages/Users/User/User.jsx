import styleUser from './User.module.css';

export default function User({src, username, realname, email, role, status, recent}) {

    const img = src ? <img src={src} /> : <h4>{username?.slice(0, 1)}</h4> || "-";
    const roleC = role == "ผู้จัดการ" ? "blue" : "green";
    const statusC = status == "กำลังใช้งาน" ? "green" : "gray";
    return(
        <div className={styleUser.User}>
            <div>
                {img}
                <p className={styleUser.thin}>{username}</p>
            </div>
            <p>{realname}</p>
            <p className={styleUser.thin}>{email}</p>
            <p className={styleUser[roleC]}>{role}</p>
            <p className={styleUser[statusC]}>{status}</p>
            <p className={styleUser.thin}>{recent?.toLocaleDateString('th-TH') || "-"}</p>
            <div>
                <img src="/Icon/6-Categories/Icon-1.svg" />
                <img src="/Icon/6-Categories/Icon.svg" />
            </div>
        </div>
    )
}