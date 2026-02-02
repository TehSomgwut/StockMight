import { Link, Route, Routes } from 'react-router-dom';
import Nav from '../components/Nav/Nav'
import Side from '../components/Side/Side'
import Dashboard from './Dashboard/Dashboard';
import mainStyles from './MainPage.module.css';
import Inventory from './Inventory/Inventory';

export default function MainPage() {
    return (
        <div>
            <Nav />
            <div className={mainStyles["container"]}>
                <Side />
                <Routes>
                    <Route path={"/home"} element={<Dashboard />} />
                    <Route path={"/inventory"} element={<Inventory />} />
                </Routes>
                {/* <Dashboard /> */}
            </div>
        </div>
    )
}