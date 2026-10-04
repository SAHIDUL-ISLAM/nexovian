"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaShieldAlt, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import { verifyUser } from "@/lib/verifyUser";

const WAITING_CODES = ["LICENSE_PENDING", "COMPANY_PENDING", "ACCOUNT_DISABLED"];

export default function VerifyPage() {
    const router = useRouter();
    const [status, setStatus] = useState("checking"); // checking | success | error
    const [result, setResult] = useState(null);

    useEffect(() => {
        const raw = sessionStorage.getItem("pendingLogin");
        if (!raw) {
            router.replace("/signin");
            return;
        }

        let pending;
        try {
            pending = JSON.parse(raw);
        } catch {
            router.replace("/signin");
            return;
        }

        let redirectTimer;
        const timer = setTimeout(() => {
            const res = verifyUser(pending);
            sessionStorage.removeItem("pendingLogin");
            setResult(res);

            if (res.ok) {
                const store = pending.remember ? localStorage : sessionStorage;
                store.setItem("nexovianUser", JSON.stringify(res.user));
                setStatus("success");
                redirectTimer = setTimeout(() => router.replace(`/${res.user.role}`), 1500);
            } else {
                setStatus("error");
            }
        }, 1200);

        return () => {
            clearTimeout(timer);
            clearTimeout(redirectTimer);
        };
    }, [router]);

    const isWaiting = status === "error" && WAITING_CODES.includes(result?.code);

    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#CBD5E1] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center">
                {status === "checking" && (
                    <>
                        <div className="mx-auto w-16 h-16 rounded-full bg-[#6550E4]/10 flex items-center justify-center mb-5">
                            <FaShieldAlt className="text-2xl text-[#6550E4]" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">Verifying your account</h1>
                        <p className="text-slate-500 mt-2 mb-6">Please wait while we check your details.</p>
                        <span className="loading loading-spinner loading-lg text-[#6550E4]" />
                    </>
                )}

                {status === "success" && (
                    <>
                        <FaCheckCircle className="mx-auto text-6xl text-green-600 mb-4" />
                        <h1 className="text-2xl font-bold text-slate-900">Verified</h1>
                        <p className="text-slate-500 mt-2">
                            Welcome, <span className="font-semibold text-slate-800">{result.user.name}</span>.
                            Taking you to your dashboard…
                        </p>
                        <button
                            onClick={() => router.replace(`/${result.user.role}`)}
                            className="btn mt-6 w-full h-12 rounded-xl bg-[#6550E4] hover:bg-[#5340c9] text-white border-none"
                        >
                            Go to dashboard now
                        </button>
                    </>
                )}

                {status === "error" && (
                    <>
                        {isWaiting ? (
                            <FaClock className="mx-auto text-6xl text-amber-500 mb-4" />
                        ) : (
                            <FaTimesCircle className="mx-auto text-6xl text-red-500 mb-4" />
                        )}
                        <h1 className="text-2xl font-bold text-slate-900">
                            {isWaiting ? "Not available yet" : "Verification failed"}
                        </h1>
                        <p className="text-slate-500 mt-2">{result?.message}</p>
                        <Link
                            href="/signin"
                            className="btn mt-6 w-full h-12 rounded-xl bg-[#6550E4] hover:bg-[#5340c9] text-white border-none"
                        >
                            Back to sign in
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}