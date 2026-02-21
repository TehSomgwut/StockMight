import { useState } from "react";
import loginStyles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [isSubmitable, setIsSubmitable] = useState(false);
    const [ message, setMessage ] = useState(null)
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => {
            const newForm = { ...prev, [name]: value };
            
            if (newForm.username.trim() !== "" && newForm.password.trim() !== "") {
                setIsSubmitable(true);
            } else {
                setIsSubmitable(false);
            }
            
            return newForm;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isSubmitable) return;

        try {
            const res = await fetch("http://localhost:3000/api/users/login", {
                method: "POST", // ปกติ Login หรือตรวจสอบข้อมูลควรใช้ POST
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(form)
            });

            const data = await res.json();
            console.log(data)
            if (data.message === "Login สำเร็จ") {
                navigate("/pages/home");
            }
            else {
                setMessage(data.message);
            }

        } catch (error) {
            console.error("Fetch Error:", error);
            alert("SERVER ไม่ตอบสนอง")
        }
    };

    return (
        <div className={loginStyles["login-container"]}>
            <div className={loginStyles.wrapper}> 
                <div className={loginStyles["logo-container"]}>
                    <img src="/Icon/0-Login/Icon-4.svg" alt="logo"/> 
                    <div>
                        <h1>StockMight</h1>
                        <h4>ระบบจัดการคลังสินค้า</h4>
                    </div>
                </div>

                <form className={loginStyles["login-form"]} onSubmit={handleSubmit}>
                    <div>
                        <h2>เข้าสู่ระบบ</h2>
                        <p className={loginStyles.description}>กรุณาระบุข้อมูลเพื่อเข้าใช้งาน</p>
                    </div>

                    <div className={ message !== null ? loginStyles["message-container"] : {}}><p>{message}</p></div>
                    <div className={loginStyles["username-container"]}>
                        <h3>ชื่อผู้ใช้</h3>
                        <div className={loginStyles.input}>
                            <label htmlFor="username">
                                <img src="/Icon/0-Login/Icon-3.svg" alt="user-icon"/>
                            </label>
                            {/* name ต้องตรงกับใน State (username) */}
                            <input type="text" id="username" name="username" placeholder="กรอกชื่อผู้ใช้" onChange={handleChange} />
                        </div>
                    </div>

                    <div className={loginStyles["password-container"]}>
                        <h3>รหัสผ่าน</h3>
                        <div className={loginStyles.input}>
                            <label htmlFor="password">
                                <img src="/Icon/0-Login/Icon-2.svg" alt="pass-icon"/>
                            </label>
                            <input type="password" id="password" name="password" placeholder="กรอกรหัสผ่าน" onChange={handleChange} />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className={loginStyles["login-button"]} 
                        disabled={!isSubmitable}
                        style={!isSubmitable ? { filter: 'grayscale(1)', opacity: 0.5, cursor: 'not-allowed' } : {cursor: 'pointer'}}
                    >
                        <img src="/Icon/0-Login/Icon.svg" alt="login-icon"/>
                        <h3>เข้าสู่ระบบ</h3>
                    </button>
                </form>
            </div>
            <footer className={loginStyles["login-footer"]}>© 2026 StockMight. ระบบจัดการคลังสินค้า</footer>
        </div>
    );
}