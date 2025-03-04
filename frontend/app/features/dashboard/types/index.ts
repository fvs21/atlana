export type Message = {
    id: string;
    sender: string;
    email: string;
    subject: string;
    content: string;
    date: string;
    read: boolean;
}
export interface Order {
    id: string;
    customer: string;
    date: string;
    status: string;
    amount: number;
    transactions?: Transaction[];
}

export interface Transaction {
    id: string;
    orderId: string;
    date: string;
    type: string;
    amount: number;
    status: string;
}
