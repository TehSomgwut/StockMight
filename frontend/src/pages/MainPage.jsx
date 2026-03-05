import { Link, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io('https://stockmight-backend.onrender.com');

import Nav from '../components/Nav/Nav';
import Side from '../components/Side/Side';
import Dashboard from './Dashboard/Dashboard';
import mainStyles from './MainPage.module.css';
import Inventory from './Inventory/Inventory';
import AddProduct from './AddProduct/AddProduct';
import Request from './Request/Request';
import History from './History/History';
import Categories from './Categories/Categories';
import Metric from './Metric/Metric';
import Reports from './Reports/Report';
import Users from './Users/Users';
import AddCategory from './AddCategory/AddCategory';
import AddMetric from './AddMetric/AddMetric';
import UpdateCategory from './AddCategory/UpdateCategory/UpdateCategory';
import UpdateMetric from './AddMetric/UpdateMetric/UpdateMetric';
import UpdateProduct from './AddProduct/UpdateProduct/UpdateProduct';

export default function MainPage({ authentication }) {
    const user = authentication; 
    const [globalProducts, setGlobalProducts] = useState([]);
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('https://stockmight-backend.onrender.com/api/product/', { method: "GET" });
                if (res.ok) {
                    const data = await res.json();
                    setGlobalProducts(data);
                }
            } catch (err) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า", err);
            }
        }

        fetchProducts();
        const handleUpdate = () => fetchProducts();
        socket.on('updateSupply', handleUpdate);
        
        return () => {
            socket.off('updateSupply', handleUpdate);
        };
    }, []);
    
    console.log("Current User:", user);

    return (
        <div>
            <Nav />
            <div className={mainStyles["container"]}>
                <Side user={user} />
                
                <Routes>
                    <Route path={"/home"} element={<Dashboard productsData={globalProducts} />} />
                    <Route path={"/inventory"} element={<Inventory productsData={globalProducts} />} />
                    <Route path={"/add-product"} element={ <AddProduct /> } />
                    <Route path={"/request/*"} element={ <Request productsData={globalProducts} /> } />
                    <Route path={"/history"} element={ <History /> } />
                    <Route path={"/categories/*"} element={ <Categories productsData={globalProducts} /> } />
                    <Route path={"/metric/*"} element={ <Metric productsData={globalProducts} /> } />
                    <Route path={"/reports"} element={ <Reports productsData={globalProducts} /> } />
                    
                    { user?.role === 'admin' && (
                        <Route path={"/users"} element={ <Users /> } />
                    )}

                    <Route path={"/categories/add"} element={ <AddCategory />} />
                    <Route path={"/metric/add"} element={ <AddMetric />} />
                    <Route path={`/categories/update/:id`} element={ <UpdateCategory /> } />
                    <Route path={`/unit/:id`} element={ <UpdateMetric /> } />
                    <Route path={`/inventory/:id`} element={ <UpdateProduct /> } />
                </Routes>
            </div>
        </div>
    );
}