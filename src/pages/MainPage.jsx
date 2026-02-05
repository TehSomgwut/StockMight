import { Link, Route, Routes } from 'react-router-dom';
import Nav from '../components/Nav/Nav'
import Side from '../components/Side/Side'
import Dashboard from './Dashboard/Dashboard';
import mainStyles from './MainPage.module.css';
import Inventory from './Inventory/Inventory';
import AddProduct from './AddProduct/AddProduct';
import Request from './Request/Request';
import History from './History/History';
import Categories from './Categories/Categories';
import Metric from './Metric/Metric';

export default function MainPage() {
    return (
        <div>
            <Nav />
            <div className={mainStyles["container"]}>
                <Side />
                <Routes>
                    <Route path={"/home"} element={<Dashboard />} />
                    <Route path={"/inventory"} element={<Inventory />} />
                    <Route path={"/add-product"} element={ <AddProduct /> } />
                    <Route path={"/request/*"} element={ <Request /> } />
                    <Route path={"/history"} element={ <History /> } />
                    <Route path={"/categories"} element={ <Categories /> } />
                    <Route path={"/metric"} element={ <Metric /> } />
                </Routes>
                {/* <Dashboard /> */}
            </div>
        </div>
    )
}