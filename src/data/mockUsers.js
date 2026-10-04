export const mockUsers = [
    // Doctors (must have a verified license)
    {
        id: 1, role: "doctor", name: "Dr. Rahman Ahmed",
        email: "dr.rahman@nexovian.com", password: "Doctor@123",
        licenseStatus: "verified",
    },
    {
        id: 2, role: "doctor", name: "Dr. Sadia Karim",
        email: "dr.sadia@nexovian.com", password: "Doctor@123",
        licenseStatus: "pending",
    },

    // Patients (must have an active account)
    {
        id: 3, role: "patient", name: "Nusrat Jahan",
        email: "nusrat@example.com", password: "Patient@123",
        active: true,
    },
    {
        id: 4, role: "patient", name: "Tanvir Hasan",
        email: "tanvir@example.com", password: "Patient@123",
        active: false,
    },

    // Pharma companies (must be approved)
    {
        id: 5, role: "pharma", name: "Acme Pharma Ltd.",
        email: "admin@acmepharma.com", password: "Pharma@123",
        companyStatus: "approved",
    },
    {
        id: 6, role: "pharma", name: "Beta Healthcare",
        email: "contact@betahealth.com", password: "Pharma@123",
        companyStatus: "pending",
    },
];