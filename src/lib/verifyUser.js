import { mockUsers } from "@/data/mockUsers";

export function verifyUser({ email, password, role }) {
    const user = mockUsers.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!user) {
        return { ok: false, code: "NOT_FOUND", message: "No account was found with this email." };
    }

    if (user.role !== role) {
        return {
            ok: false,
            code: "ROLE_MISMATCH",
            message: `This email is registered as a ${user.role}, not a ${role}. Pick the right role and try again.`,
        };
    }

    if (user.password !== password) {
        return { ok: false, code: "WRONG_PASSWORD", message: "Incorrect password." };
    }

    // Role-specific conditions
    if (role === "doctor" && user.licenseStatus !== "verified") {
        return {
            ok: false,
            code: "LICENSE_PENDING",
            message: "Your medical license is still under review. You can sign in once it is verified.",
        };
    }
    if (role === "patient" && !user.active) {
        return {
            ok: false,
            code: "ACCOUNT_DISABLED",
            message: "This patient account is disabled. Please contact support.",
        };
    }
    if (role === "pharma" && user.companyStatus !== "approved") {
        return {
            ok: false,
            code: "COMPANY_PENDING",
            message: "Your company is waiting for approval. We will notify you when it is done.",
        };
    }

    const { password: _pw, ...safeUser } = user; // never keep the password
    return { ok: true, user: safeUser };
}