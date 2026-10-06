import Link from 'next/link';
import React from 'react';
import { FaUserMd } from 'react-icons/fa';

const doctorPage = () => {
    return (
        <div className='flex justify-center flex-col items-center text-blue-700'>
            <h2>Welcome Doctor</h2>
            <h1 className='text-7xl'><FaUserMd/></h1> 
            <Link href={"/signin"}>
                    <button className='btn btn-outline-success'>SignIn First</button>
            </Link>
        </div>
    );
};

export default doctorPage;