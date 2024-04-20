export interface Customer {
  _id?: string
  name: string
  instagram_account: string
  address: string
  department: string
  city: string
  phone: number
  comments?: string
  created_at?: string
  updated_at?: string
}

export interface Product {
  _id?: string
  name: string
  price: number
  image: string
  available_colors: string[]
  created_at?: string
  updated_at?: string
}

export interface Sale {
  _id?: string
  client_id: string
  client_snapshot?: Customer
  items: {
    item_id: string
    color: string
    price: number
  }[]
  created_at?: string
  updated_at?: string
}

export interface SaleWithCustomerAndItemData {
  _id: string
  client_id: string
  client: Customer
  client_snapshot?: Customer
  items: {
    item_id: string
    color: string
    price: number
  }[]
  original_items: Product[]
  total_sales: Sale[]
  created_at: string
  updated_at?: string
}

export interface SummarySale {
  _id: string
  totalPrice: number
  date: string
  isRecurrence?: boolean
  totalSales: Sale[]
  items: {
    id: number
    item_id: string
    name: string
    image_src: string
    color: string
    price: number
  }[]
  customerSnapshot: Customer
}

export interface MonthlySalesAndExpensesInterface {
  month: string
  allItems?: SummarySale[]
  revenue?: number
  revenueWithoutExpenses: number
  allExpenses: ExpenseInterface[]
  sortedExpenses: {
    currencyKey: string
    items: ExpenseInterface[]
  }[]
  areAllCurrenciesCOP: boolean
  expenses: number
}

export interface ExpenseInterface {
  _id?: string
  name: string
  price: number
  type: string
  currency?: string
  description?: string
  created_at?: string
  updated_at?: string
}
