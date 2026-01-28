import React from "react";
import "./Login.css";

export default function Login() {
    return (
        <div className="login-container">
            <div className="wrapper">
                <div className="logo-container">
                    <img src="#" alt="logo"/>
                    <h1>StockMight</h1>
                    <h4>ระบบจัดการคลังสินค้า</h4>
                </div>
                <form className="login-form">
                    <div>
                        <h2>เข้าสู่ระบบ</h2>
                        <p className="description">กรุณาระบุข้อมูลเพื่อเข้าใช้งาน</p>
                    </div>
                    <div className="alert"><p>กรุณาระบุชื่อผู้ใช้ระรหัสผ่าน</p></div>
                    <div className="username-container">
                        <h3>ชื่อผู้ใช้</h3>
                        <div className="input">
                            <label htmlFor="username"></label>
                            <input type="text" id="username" name="username" placeholder="กรอกชื่อผู้ใช้" />
                        </div>
                    </div>
                    <div className="password-container">
                        <h3>รหัสผ่าน</h3>
                        <div className="input">
                            <label htmlFor="password"></label>
                            <input type="password" id="password" name="password" placeholder="กรอกรหัสผ่าน" />
                            <img src="#" alt="eye-icon" className="eye-icon"/>
                        </div>
                    </div>
                    <button type="submit" className="login-button"><img src="#"/><h3>เข้าสู่ระบบ</h3></button>
                </form>
            </div>
            <footer>© 2026 StockMight. ระบบจัดการคลังสินค้า</footer>
        </div>
    )
}