import { Link, Route, Routes } from 'react-router-dom';
import Nav from '../components/Nav/Nav'
import Side from '../components/Side/Side'
import Dashboard from './Dashboard/Dashboard';
import mainStyles from './MainPage.module.css';

export default function MainPage() {
    return (
        <div>
            <Nav />
            <div className={mainStyles["container"]}>
                <Side />
                <Routes>
                    <Route path={"/home"} element={<Dashboard />} />
                </Routes>
                {/* <Dashboard /> */}
            </div>
        </div>
    )
}