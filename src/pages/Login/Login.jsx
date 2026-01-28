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
                    <h2>เข้าสู่ร่ะบบ</h2>
                    <p className="description">กรุณาระบุข้อมูลเพื่อเข้าใช้งาน</p>
                    <div className="alert"><p>กรุณาระบุชื่อผู้ใช้ระรหัสผ่าน</p></div>
                    <div className="username-container">
                        <h3>ชื่อผู้ใช้</h3>
                        <label htmlFor="username"></label>
                        <input type="text" id="username" name="username" placeholder="กรอกชื่อผู้ใช้" />
                    </div>
                    <div className="password-container">
                        <h3>รหัสผ่าน</h3>
                        <label htmlFor="password"></label>
                        <input type="password" id="password" name="password" placeholder="กรอกรหัสผ่าน" />
                        <img src="#" alt="eye-icon" className="eye-icon"/>
                    </div>
                    <button type="submit" className="login-button"><img src="#"/><h3>เข้าสู่ระบบ</h3></button>
                    <hr/>
                </form>
                <div className="detail-container">
                    <h3>ข้อมูลทดสอบ:</h3>
                    <div className="validation-list">
                        <div className="validation">
                            <p className="role">ผู้ดูแลระบบ:</p>
                            <p className="manager-name">admin / admin123</p>
                        </div>
                    </div>
                    
                </div>
            </div>
            <footer>© 2026 StockMight. ระบบจัดการคลังสินค้า</footer>
        </div>
    )
}