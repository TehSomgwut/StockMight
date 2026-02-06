import StyleRequest from './Request.module.css'
import Export from './Export/Export'
import Import from './Import/Import'
import Header from '../../components/PageHeader/PageHeader';
import { Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react';

export default function Request() {
    const [active, setActive] = useState("import")
    return (
         <div className={StyleRequest.Request}>
            <Header header="รับเข้า / เบิกออกสินค้า" description="บันทึกการรรับเข้าและเบิกออกสินค้าพร้อมระบุเหตุผล" />
            <div className={StyleRequest["request-container"]}>
                <div className={StyleRequest.options}>
                    <Link to="/pages/request/import" style={{ textDecoration: 'none', color: 'inherit' }} >
                        <div className={`${StyleRequest["import-option"]} ${active === 'import' ? StyleRequest.active : ""}`} onClick={() => setActive("import")}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.3332 5.83333L11.2498 12.9167L7.08317 8.74999L1.6665 14.1667" stroke={active == 'import' ? "#1904FC" : "#4A5565"} stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13.3335 5.83333H18.3335V10.8333" stroke={active == 'import' ? "#1904FC" : "#4A5565"} stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                            <p>รับเข้าสินค้า</p>
                        </div>
                    </Link>
                    <Link to="/pages/request/export" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className={`${StyleRequest["export-option"]} ${active == 'export' ? StyleRequest.active : ""}`} onClick={() => setActive("export")}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.3332 14.1667L11.2498 7.08333L7.08317 11.25L1.6665 5.83333" stroke={active == 'export' ? "#1904FC" : "#4A5565"} stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13.3335 14.1667H18.3335V9.16667" stroke={active == 'export' ? "#1904FC" : "#4A5565"} stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p>เบิกออกสินค้า</p>
                        </div>
                    </Link>
                </div>
                <Routes>
                    <Route path="/" element={<Export/>} />
                    <Route path="import" element={<Export/>} />
                    <Route path="export" element={<Export/>} />
                </Routes>
            </div>
         </div>
    )
}