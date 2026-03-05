export function createUser() {
    return {
        first_name: "Irina",
        last_name: "Kishinek",
        dob: "1990-06-12",
        address: {
            street: "Ukmerges",
            postal_code: "603000",
            city: "London",
            state: "LA",
            country: "ES"
        },
        phone: "34000665578",
        email: `irina${Date.now()}@gmail.com`,
        password: "Groza12#$",
        newPassword: "Akropol56&*"
    };
}