import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer className="border-t border-slate-100 bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
              N
            </div>
            <span className="font-bold text-slate-800">Nexovian</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link href="/doctor" className="hover:text-teal-600 transition">Doctor</Link>
            <Link href="/patient" className="hover:text-teal-600 transition">Patient</Link>
            <Link href="/pharma" className="hover:text-teal-600 transition">Pharma</Link>
          </div>

          <p className="text-xs text-slate-400">
            © 2024 Nexovian. All rights reserved.
          </p>
        </div>
      </footer>
        </div>
    );
};

export default Footer;