import { Link, Route } from 'react-router-dom';
import Nav from '../components/Nav/Nav'
import Side from '../components/Side/Side'

export default function MainPage() {
    return (
        <div>
            <Nav />
            <Side />
        </div>
    )
}