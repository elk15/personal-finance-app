import { Budget, Pot, Theme, Transaction, TransactionCategory } from "../types"

const today = new Date();

export const transactions: Transaction[] = [
  {
    id: 'mock-transaction-1',
    name: "Emma Richardson",
    category: TransactionCategory.General,
    date: "2024-08-19T14:23:11Z",
    amount: 75.50,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-2',
    name: "Savory Bites Bistro",
    category: TransactionCategory.DiningOut,
    date: "2024-08-19T20:23:11Z",
    amount: -55.50,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-3',
    name: "Daniel Carter",
    category: TransactionCategory.General,
    date: "2024-08-18T09:45:32Z",
    amount: -42.30,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-4',
    name: "Sun Park",
    category: TransactionCategory.General,
    date: "2024-08-17T16:12:05Z",
    amount: 120.00,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-5',
    name: "Urban Services Hub",
    category: TransactionCategory.General,
    date: "2024-08-17T21:08:09Z",
    amount: -65.00,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-6',
    name: "Liam Hughes",
    category: TransactionCategory.Groceries,
    date: "2024-08-15T18:20:33Z",
    amount: 65.75,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-7',
    name: "Lily Ramirez",
    category: TransactionCategory.General,
    date: "2024-08-14T13:05:27Z",
    amount: 50.00,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-8',
    name: "Ethan Clark",
    category: TransactionCategory.DiningOut,
    date: "2024-08-13T20:15:59Z",
    amount: -32.50,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-9',
    name: "James Thompson",
    category: TransactionCategory.Entertainment,
    date: "2024-08-11T15:45:38Z",
    amount: -5.00,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-10',
    name: "Pixel Playground",
    category: TransactionCategory.Entertainment,
    date: "2024-08-11T18:45:38Z",
    amount: -10.00,
    recurring: true,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-11',
    name: "Ella Phillips",
    category: TransactionCategory.DiningOut,
    date: "2024-08-10T19:22:51Z",
    amount: -45.00,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-12',
    name: "Sofia Peterson",
    category: TransactionCategory.Transportation,
    date: "2024-08-08T08:55:17Z",
    amount: -15.00,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-13',
    name: "Mason Martinez",
    category: TransactionCategory.Lifestyle,
    date: "2024-08-07T17:40:29Z",
    amount: -35.25,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-14',
    name: "Green Plate Eatery",
    category: TransactionCategory.Groceries,
    date: "2024-08-06T08:25:44Z",
    amount: -78.50,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-15',
    name: "Sebastian Cook",
    category: TransactionCategory.Transportation,
    date: "2024-08-06T10:05:44Z",
    amount: -22.50,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-16',
    name: "William Harris",
    category: TransactionCategory.PersonalCare,
    date: "2024-08-05T14:30:56Z",
    amount: -10.00,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-17',
    name: "Elevate Education",
    category: TransactionCategory.Education,
    date: "2024-08-04T11:15:22Z",
    amount: -50.00,
    recurring: true,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-18',
    name: "Serenity Spa & Wellness",
    category: TransactionCategory.PersonalCare,
    date: "2024-08-03T14:00:37Z",
    amount: -30.00,
    recurring: true,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-19',
    name: "Spark Electric Solutions",
    category: TransactionCategory.Bills,
    date: "2024-08-02T09:25:11Z",
    amount: -100.00,
    recurring: true,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-20',
    name: "Rina Sato",
    category: TransactionCategory.Bills,
    date: "2024-08-02T13:31:11Z",
    amount: -50.00,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-21',
    name: "Swift Ride Share",
    category: TransactionCategory.Transportation,
    date: "2024-08-01T18:40:33Z",
    amount: -18.75,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-22',
    name: "Aqua Flow Utilities",
    category: TransactionCategory.Bills,
    date: "2024-07-30T13:20:14Z",
    amount: -100.00,
    recurring: true,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-23',
    name: "EcoFuel Energy",
    category: TransactionCategory.Bills,
    date: "2024-07-29T11:55:29Z",
    amount: -35.00,
    recurring: true,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-24',
    name: "Yuna Kim",
    category: TransactionCategory.DiningOut,
    date: "2024-07-29T13:51:29Z",
    amount: -28.50,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-25',
    name: "Flavor Fiesta",
    category: TransactionCategory.DiningOut,
    date: "2024-07-27T20:15:06Z",
    amount: -42.75,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-26',
    name: "Harper Edwards",
    category: TransactionCategory.Shopping,
    date: "2024-07-26T09:43:23Z",
    amount: -89.99,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-27',
    name: "Buzz Marketing Group",
    category: TransactionCategory.General,
    date: "2024-07-26T14:40:23Z",
    amount: 3358.00,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-28',
    name: "TechNova Innovations",
    category: TransactionCategory.Shopping,
    date: "2024-07-25T16:25:37Z",
    amount: -29.99,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-29',
    name: "ByteWise",
    category: TransactionCategory.Lifestyle,
    date: "2024-07-23T09:35:14Z",
    amount: -49.99,
    recurring: true,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-30',
    name: "Nimbus Data Storage",
    category: TransactionCategory.Bills,
    date: "2024-07-21T10:05:42Z",
    amount: -9.99,
    recurring: true,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-31',
    name: "Emma Richardson",
    category: TransactionCategory.General,
    date: "2024-07-20T17:30:55Z",
    amount: -25.00,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-32',
    name: "Daniel Carter",
    category: TransactionCategory.General,
    date: "2024-07-19T12:45:09Z",
    amount: 50.00,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-33',
    name: "Sun Park",
    category: TransactionCategory.General,
    date: "2024-07-18T19:20:23Z",
    amount: -38.50,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-34',
    name: "Harper Edwards",
    category: TransactionCategory.Shopping,
    date: "2024-07-17T14:55:37Z",
    amount: -29.99,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-35',
    name: "Liam Hughes",
    category: TransactionCategory.Groceries,
    date: "2024-07-16T10:10:51Z",
    amount: -52.75,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-36',
    name: "Lily Ramirez",
    category: TransactionCategory.General,
    date: "2024-07-15T16:35:04Z",
    amount: 75.00,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-37',
    name: "Ethan Clark",
    category: TransactionCategory.DiningOut,
    date: "2024-07-14T20:50:18Z",
    amount: -41.25,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-38',
    name: "Rina Sato",
    category: TransactionCategory.Entertainment,
    date: "2024-07-13T09:15:32Z",
    amount: -10.00,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-39',
    name: "James Thompson",
    category: TransactionCategory.Bills,
    date: "2024-07-12T13:40:46Z",
    amount: -95.50,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-40',
    name: "Ella Phillips",
    category: TransactionCategory.DiningOut,
    date: "2024-07-11T18:05:59Z",
    amount: -33.75,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-41',
    name: "Yuna Kim",
    category: TransactionCategory.DiningOut,
    date: "2024-07-10T12:30:13Z",
    amount: -27.50,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-42',
    name: "Sofia Peterson",
    category: TransactionCategory.Transportation,
    date: "2024-07-09T08:55:27Z",
    amount: -12.50,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-43',
    name: "Mason Martinez",
    category: TransactionCategory.Lifestyle,
    date: "2024-07-08T15:20:41Z",
    amount: -65.00,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-44',
    name: "Sebastian Cook",
    category: TransactionCategory.Transportation,
    date: "2024-07-07T11:45:55Z",
    amount: -20.00,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-45',
    name: "William Harris",
    category: TransactionCategory.General,
    date: "2024-07-06T17:10:09Z",
    amount: 20.00,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-46',
    name: "Elevate Education",
    category: TransactionCategory.Education,
    date: "2024-07-05T11:15:22Z",
    amount: -50.00,
    recurring: true,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-47',
    name: "Serenity Spa & Wellness",
    category: TransactionCategory.PersonalCare,
    date: "2024-07-03T14:00:37Z",
    amount: -30.00,
    recurring: true,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-48',
    name: "Spark Electric Solutions",
    category: TransactionCategory.Bills,
    date: "2024-07-02T09:25:51Z",
    amount: -100.00,
    recurring: true,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-transaction-49',
    name: "Swift Ride Share",
    category: TransactionCategory.Transportation,
    date: "2024-07-02T19:50:05Z",
    amount: -16.50,
    recurring: false,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const budgets: Budget[] = [
  {
    id: 'mock-budget-1',
    category: TransactionCategory.Entertainment,
    max_amount: 50.00,
    theme: Theme.Green,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-budget-2',
    category: TransactionCategory.Bills,
    max_amount: 750.00,
    theme: Theme.Cyan,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-budget-3',
    category: TransactionCategory.DiningOut,
    max_amount: 75.00,
    theme: Theme.Yellow,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-budget-4',
    category: TransactionCategory.PersonalCare,
    max_amount: 100.00,
    theme: Theme.Navy,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];
export const pots: Pot[] = [
  {
    id: 'mock-pot-1',
    name: "Savings",
    target: 2000.00,
    total_saved: 159.00,
    theme: Theme.Green,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-pot-2',
    name: "Concert Ticket",
    target: 150.00,
    total_saved: 110.00,
    theme: Theme.Navy,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-pot-3',
    name: "Gift",
    target: 150.00,
    total_saved: 110.00,
    theme: Theme.Cyan,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-pot-4',
    name: "New Laptop",
    target: 1000.00,
    total_saved: 10.00,
    theme: Theme.Yellow,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-pot-5',
    name: "Holiday",
    target: 1440.00,
    total_saved: 531.00,
    theme: Theme.Purple,
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];