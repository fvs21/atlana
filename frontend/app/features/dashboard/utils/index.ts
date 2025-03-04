import type { Order, Transaction, Message } from "../types";

// Mock data for the dashboard
const orders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Smith",
    date: "2023-03-01T10:30:00Z",
    status: "Completed",
    amount: 125.99,
    transactions: [
      {
        id: "TRX-001",
        orderId: "ORD-001",
        date: "2023-03-01T10:35:00Z",
        type: "Payment",
        amount: 125.99,
        status: "Completed",
      },
    ],
  },
  {
    id: "ORD-002",
    customer: "Jane Doe",
    date: "2023-03-02T14:20:00Z",
    status: "Processing",
    amount: 89.5,
    transactions: [
      {
        id: "TRX-002",
        orderId: "ORD-002",
        date: "2023-03-02T14:25:00Z",
        type: "Payment",
        amount: 89.5,
        status: "Completed",
      },
    ],
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    date: "2023-03-03T09:15:00Z",
    status: "Shipped",
    amount: 210.75,
    transactions: [
      {
        id: "TRX-003",
        orderId: "ORD-003",
        date: "2023-03-03T09:20:00Z",
        type: "Payment",
        amount: 210.75,
        status: "Completed",
      },
    ],
  },
  {
    id: "ORD-004",
    customer: "Emily Wilson",
    date: "2023-03-04T16:45:00Z",
    status: "Pending",
    amount: 45.25,
    transactions: [
      {
        id: "TRX-004",
        orderId: "ORD-004",
        date: "2023-03-04T16:50:00Z",
        type: "Payment",
        amount: 45.25,
        status: "Pending",
      },
    ],
  },
  {
    id: "ORD-005",
    customer: "Michael Brown",
    date: "2023-03-05T11:10:00Z",
    status: "Cancelled",
    amount: 150.0,
    transactions: [
      {
        id: "TRX-005",
        orderId: "ORD-005",
        date: "2023-03-05T11:15:00Z",
        type: "Payment",
        amount: 150.0,
        status: "Refunded",
      },
      {
        id: "TRX-006",
        orderId: "ORD-005",
        date: "2023-03-06T09:30:00Z",
        type: "Refund",
        amount: 150.0,
        status: "Completed",
      },
    ],
  },
  {
    id: "ORD-006",
    customer: "Sarah Miller",
    date: "2023-03-06T13:25:00Z",
    status: "Completed",
    amount: 78.5,
    transactions: [
      {
        id: "TRX-007",
        orderId: "ORD-006",
        date: "2023-03-06T13:30:00Z",
        type: "Payment",
        amount: 78.5,
        status: "Completed",
      },
    ],
  },
  {
    id: "ORD-007",
    customer: "David Garcia",
    date: "2023-03-07T10:05:00Z",
    status: "Shipped",
    amount: 65.99,
    transactions: [
      {
        id: "TRX-008",
        orderId: "ORD-007",
        date: "2023-03-07T10:10:00Z",
        type: "Payment",
        amount: 65.99,
        status: "Completed",
      },
    ],
  },
  {
    id: "ORD-008",
    customer: "Lisa Rodriguez",
    date: "2023-03-08T15:40:00Z",
    status: "Processing",
    amount: 120.25,
    transactions: [
      {
        id: "TRX-009",
        orderId: "ORD-008",
        date: "2023-03-08T15:45:00Z",
        type: "Payment",
        amount: 120.25,
        status: "Completed",
      },
    ],
  },
]

const transactions: Transaction[] = [
  {
    id: "TRX-001",
    orderId: "ORD-001",
    date: "2023-03-01T10:35:00Z",
    type: "Payment",
    amount: 125.99,
    status: "Completed",
  },
  {
    id: "TRX-002",
    orderId: "ORD-002",
    date: "2023-03-02T14:25:00Z",
    type: "Payment",
    amount: 89.5,
    status: "Completed",
  },
  {
    id: "TRX-003",
    orderId: "ORD-003",
    date: "2023-03-03T09:20:00Z",
    type: "Payment",
    amount: 210.75,
    status: "Completed",
  },
  {
    id: "TRX-004",
    orderId: "ORD-004",
    date: "2023-03-04T16:50:00Z",
    type: "Payment",
    amount: 45.25,
    status: "Pending",
  },
  {
    id: "TRX-005",
    orderId: "ORD-005",
    date: "2023-03-05T11:15:00Z",
    type: "Payment",
    amount: 150.0,
    status: "Refunded",
  },
  {
    id: "TRX-006",
    orderId: "ORD-005",
    date: "2023-03-06T09:30:00Z",
    type: "Refund",
    amount: 150.0,
    status: "Completed",
  },
  {
    id: "TRX-007",
    orderId: "ORD-006",
    date: "2023-03-06T13:30:00Z",
    type: "Payment",
    amount: 78.5,
    status: "Completed",
  },
  {
    id: "TRX-008",
    orderId: "ORD-007",
    date: "2023-03-07T10:10:00Z",
    type: "Payment",
    amount: 65.99,
    status: "Completed",
  },
  {
    id: "TRX-009",
    orderId: "ORD-008",
    date: "2023-03-08T15:45:00Z",
    type: "Payment",
    amount: 120.25,
    status: "Completed",
  },
]

const messages: Message[] = [
  {
    id: "MSG-001",
    sender: "John Smith",
    email: "john.smith@example.com",
    subject: "Order Confirmation",
    content:
      "Thank you for your order! I wanted to confirm that I received the items and everything looks great. The packaging was excellent and the products are exactly what I expected. I'll definitely be ordering from you again in the future.",
    date: "2023-03-01T11:00:00Z",
    read: true,
  },
  {
    id: "MSG-002",
    sender: "Customer Support",
    email: "support@yourstore.com",
    subject: "Your Recent Order",
    content:
      "We noticed you recently placed an order with us. We wanted to check in and make sure everything is to your satisfaction. If you have any questions or concerns about your purchase, please don't hesitate to reply to this message.",
    date: "2023-03-02T15:30:00Z",
    read: false,
  },
  {
    id: "MSG-003",
    sender: "Emily Wilson",
    email: "emily.wilson@example.com",
    subject: "Question about my order",
    content:
      "Hello, I recently placed an order (#ORD-004) and I was wondering if it's possible to change the shipping address? I accidentally entered the wrong apartment number. Please let me know if this is possible. Thank you!",
    date: "2023-03-04T17:15:00Z",
    read: true,
  },
  {
    id: "MSG-004",
    sender: "Michael Brown",
    email: "michael.brown@example.com",
    subject: "Refund Request",
    content:
      "I would like to request a refund for my recent order (#ORD-005). The product doesn't meet my expectations and I'd like to return it. I've already packaged it up and can ship it back as soon as I receive return instructions. Thank you for your understanding.",
    date: "2023-03-05T12:45:00Z",
    read: true,
  },
  {
    id: "MSG-005",
    sender: "Marketing Team",
    email: "marketing@yourstore.com",
    subject: "New Products Available!",
    content:
      "We're excited to announce that we've just added several new products to our inventory! As a valued customer, we wanted to give you a first look. Check out our website to see what's new. Use code NEWPRODUCT10 for 10% off your next purchase!",
    date: "2023-03-07T09:00:00Z",
    read: false,
  },
]

// Helper functions to get data
export async function getRecentOrders(limit = 5): Promise<Order[]> {
  // In a real app, this would fetch from a database or API
  return orders.slice(0, limit)
}

export async function getRecentTransactions(limit = 5): Promise<Transaction[]> {
  // In a real app, this would fetch from a database or API
  return transactions.slice(0, limit)
}

export async function getAllOrders(): Promise<Order[]> {
  // In a real app, this would fetch from a database or API
  return orders
}

export async function getAllTransactions(): Promise<Transaction[]> {
  // In a real app, this would fetch from a database or API
  return transactions
}

export async function getAllMessages(): Promise<Message[]> {
  // In a real app, this would fetch from a database or API
  return messages
}

export const translateUserType = (type: 'buyer' | 'seller' | 'both' | undefined): string => {
  if (!type) return '';

  switch (type) {
    case 'buyer':
      return 'Comprador'
    case 'seller':
      return 'Vendedor'
    case 'both':
      return 'Comprador y Vendedor'
  }
}