import React from 'react';

const Footer = () => {
    return (
        <div className="footer-horizontal footer-center bg-[#244D3F]  rounded pt-10 pb-5 text-white">
            <div className='max-w-10xl m-auto space-y-5'>
                <h1 className='text-3xl sm:text-5xl font-bold'>NEXOVIAN</h1>
                <p className='text-[#efeaeacc]'>Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.</p>
                <div className='sm:flex justify-between items-center w-full border-t-2 border-[#97959540] text-[gray] max-w-7xl m-auto px-3.5'>
                    <p className='text-[#efeaeacc]'>© 2026 Nexovian. All rights reserved.</p>
                    <div className='flex flex-col  sm:flex-row justify-evenly gap-0 sm:gap-6 items-center'>
                            <a href="">Privacy Policy</a>
                            <a href="">Terms of Service</a>
                            <a href="">Cookies</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;