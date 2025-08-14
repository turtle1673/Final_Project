export interface User {
    id: number;
    userName: string;
    userEmail: string;
    userPassword: string;
    role: "CUSTOMER" | "EMPLOYEE" | "ADMIN";
    orders?: Order[];
    restocks?: Restock[];
}