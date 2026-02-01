import React from "react";
import loginStyles from "./Login.module.css";

export default function Login() {
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

                <form className={loginStyles["login-form"]}>
                    <div>
                        <h2>เข้าสู่ระบบ</h2>
                        <p className={loginStyles.description}>กรุณาระบุข้อมูลเพื่อเข้าใช้งาน</p>
                    </div>
                    <div className={loginStyles.alert}>
                        <p>กรุณาระบุชื่อผู้ใช้และรหัสผ่าน</p>
                    </div>

                    <div className={loginStyles["username-container"]}>
                        <h3>ชื่อผู้ใช้</h3>
                        <div className={loginStyles.input}>
                            <label htmlFor="username">
                                <img src="/Icon/0-Login/Icon-3.svg" alt="user-icon"/>
                            </label>
                            <input type="text" id="username" name="username" placeholder="กรอกชื่อผู้ใช้" />
                        </div>
                    </div>

                    <div className={loginStyles["password-container"]}>
                        <h3>รหัสผ่าน</h3>
                        <div className={loginStyles.input}>
                            <label htmlFor="password">
                                <img src="/Icon/0-Login/Icon-2.svg" alt="pass-icon"/>
                            </label>
                            <input type="password" id="password" name="password" placeholder="กรอกรหัสผ่าน" />
                        </div>
                    </div>

                    <button type="submit" className={loginStyles["login-button"]}>
                        <img src="/Icon/0-Login/Icon.svg" alt="login-icon"/>
                        <h3>เข้าสู่ระบบ</h3>
                    </button>
                </form>
            </div>
            <footer className={loginStyles["login-footer"]}>© 2026 StockMight. ระบบจัดการคลังสินค้า</footer>
        </div>
    );
}