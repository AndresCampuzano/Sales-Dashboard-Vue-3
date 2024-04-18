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

export interface Item {
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
  items: {
    item_id: string
    color: string
  }[]
  created_at?: string
  updated_at?: string
}

export interface SaleWithCustomerAndItemData {
  _id: string
  client_id: string
  client: Customer
  items: {
    item_id: string
    color: string
    price: number
  }[]
  original_items: Item[]
  total_sales: Sale[]
  created_at: string
  updated_at?: string
}

export interface SalesDataTable {
  id: string
  avatarItems: {
    id: number
    image_src: string
    name: string
  }[]
  clientName: string
  totalProducts: number
  totalPrice: number
  city: string
  department: string
  date: string
  isRecurrence?: boolean
  totalSales: Sale[]
  nestedTableData: {
    nestedItems: {
      id: number
      item_id: string
      name: string
      image_src: string
      color: string
      price: number
    }[]
    nestedClient: Customer
  }
}

export interface MonthlySalesAndExpensesInterface {
  month: string
  allItems?: SalesDataTable[]
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

export type ItemList = Item & { color: string }

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
