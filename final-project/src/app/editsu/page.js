import Link from 'next/link'
import Image from 'next/image'
import BackButton from "../components/BackButton.jsx"
import Login from '../components/Login.jsx'
export default function EditSU() {
    return (
        <main>
            <BackButton/>
            <h1>Edit Service User</h1>
            <Login pageName={"editpage"}/>
        </main>
    )
}
