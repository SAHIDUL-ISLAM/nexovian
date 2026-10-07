// src/app/verify/verifyUser.js

export function verifyUser(pending) {
  if (!pending) {
    return {
      ok: false,
      code: "INVALID_REQUEST",
      message: "No login data found. Please try again.",
    };
  }

  const { email, password, role } = pending;

  // ---------- Basic validation ----------
  if (!email || !password) {
    return {
      ok: false,
      code: "MISSING_FIELDS",
      message: "Email and password are required.",
    };
  }

  if (!role || !["doctor", "patient", "pharma"].includes(role)) {
    return {
      ok: false,
      code: "INVALID_ROLE",
      message: "Please select a valid role (Doctor / Patient / Pharma).",
    };
  }

  // ---------- Allowed accounts ----------
  const ACCOUNTS = {
    doctor: [
      {
        email: "dr.rahman@nexovian.com",
        password: "Doctor@123",
        name: "Dr. Rahman Ahmed",
        status: "verified",
      },
      {
        email: "dr.sadia@nexovian.com",
        password: "Doctor@123",
        name: "Dr. Sadia Islam",
        status: "license_pending",
      },
    ],
    patient: [
      {
        email: "nusrat@example.com",
        password: "Patient@123",
        name: "Nusrat Jahan",
        status: "verified",
      },
      {
        email: "tanvir@example.com",
        password: "Patient@123",
        name: "Tanvir Alam",
        status: "account_disabled",
      },
      {
        email: "sadia@example.com",     // ✅ NEW
        password: "Patient@123",        // ✅ NEW
        name: "Sadia Islam",            // ✅ NEW
        status: "verified",             // ✅ verified → can login
      },
    ],
    pharma: [
      {
        email: "admin@acmepharma.com",
        password: "Pharma@123",
        name: "Acme Pharma Ltd.",
        status: "verified",
      },
      {
        email: "contact@betahealth.com",
        password: "Pharma@123",
        name: "Beta Health Ltd.",
        status: "company_pending",
      },
    ],
  };

  // ---------- Find account ----------
  const roleAccounts = ACCOUNTS[role] || [];
  const account = roleAccounts.find(
    (a) => a.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (!account) {
    return {
      ok: false,
      code: "INVALID_CREDENTIALS",
      message: "No account found with this email for the selected role.",
    };
  }

  if (account.password !== password) {
    return {
      ok: false,
      code: "INVALID_CREDENTIALS",
      message: "Incorrect password. Please try again.",
    };
  }

  // ---------- Status check ----------
  switch (account.status) {
    case "verified":
      return {
        ok: true,
        user: {
          name: account.name,
          email: account.email,
          role,
        },
      };

    case "license_pending":
      return {
        ok: false,
        code: "LICENSE_PENDING",
        message: "Your medical license verification is pending. Please wait for admin approval.",
      };

    case "company_pending":
      return {
        ok: false,
        code: "COMPANY_PENDING",
        message: "Your company registration is pending approval. We'll notify you soon.",
      };

    case "account_disabled":
      return {
        ok: false,
        code: "ACCOUNT_DISABLED",
        message: "Your account has been disabled. Please contact support.",
      };

    default:
      return {
        ok: false,
        code: "UNKNOWN_STATUS",
        message: "Account status is invalid.",
      };
  }
}