import type { ExpenseInterface, MonthlySalesAndExpensesInterface, SummarySale } from '@/types/types'
import { sortArrayByMonthAndYear } from './dates.ts'

interface groupSalesByMonthInterface {
  salesWithExpenses: MonthlySalesAndExpensesInterface[]
}

/**
 * Groups sales and expenses by month
 */
export function groupSalesByMonth({
  sales,
  expenses
}: {
  sales: SummarySale[]
  expenses: ExpenseInterface[]
}): groupSalesByMonthInterface {
  // Create an empty array to store monthly sales and expenses data.
  const monthlySales: Omit<
    MonthlySalesAndExpensesInterface,
    'revenueWithoutExpenses' | 'expenses' | 'areAllCurrenciesCOP' | 'sortedExpenses'
  >[] = []

  // Loop through each sale data in the sales array.
  for (const sale of sales) {
    const saleDate = new Date(sale.date)
    const monthKey = `${saleDate.toLocaleString('en-US', {
      month: 'long'
    })} ${saleDate.getFullYear()}`

    const existingMonth = monthlySales.find((monthlySale) => monthlySale.month === monthKey)

    // If the month already exists in the monthlySales array, add the sale data to its allItems array and update the revenue.
    if (existingMonth) {
      if (existingMonth.allItems && existingMonth.revenue) {
        existingMonth.allItems.push(sale)
        existingMonth.revenue += sale.totalPrice
      }
    } else {
      // If the month doesn't exist in the monthlySales array, create a new MonthlySalesInterface object.
      monthlySales.push({
        month: monthKey,
        allItems: [sale],
        revenue: sale.totalPrice,
        // Filter the expenses array to find expenses that match the same month and year as the sale.
        allExpenses: expenses.filter((x) => {
          const expenseMonthDate = new Date(x.created_at as string).getMonth()
          const expenseYear = new Date(x.created_at as string).getFullYear()
          const saleMonthDate = new Date(sale.date).getMonth()
          const saleYear = new Date(sale.date).getFullYear()
          return expenseMonthDate === saleMonthDate && expenseYear === saleYear
        })
      })
    }
  }

  // Loops all expenses to find if there are any expense in the month with no sales
  for (const expense of expenses) {
    const expenseDate = new Date(expense.created_at as string)
    const monthKey = `${expenseDate.toLocaleString('en-US', {
      month: 'long'
    })} ${expenseDate.getFullYear()}`

    const existingMonth = monthlySales.find((monthlySale) => monthlySale.month === monthKey)

    const expenseMonthDate = new Date(expense.created_at as string).getMonth()
    const expenseYear = new Date(expense.created_at as string).getFullYear()
    const isSomeOnIt = sales.some((sale) => {
      const saleMonthDate = new Date(sale.date).getMonth()
      const saleYear = new Date(sale.date).getFullYear()
      return expenseMonthDate === saleMonthDate && expenseYear === saleYear
    })
    if (!isSomeOnIt) {
      if (existingMonth) {
        existingMonth.allExpenses.push(expense)
      } else {
        monthlySales.push({
          month: monthKey,
          allExpenses: [expense]
        })
      }
    }
  }

  /**
   * Checks if all currencies are COP
   */
  const areAllCurrenciesCOPfunc = (items: ExpenseInterface[]): boolean => {
    return items.every((expense) => {
      // If there is no currency, it belongs to COP value
      if (!expense.currency) {
        return true
      } else {
        return expense.currency === 'COP'
      }
    })
  }

  /**
   * Sorts all expenses by currency
   */
  const sortExpensesByCurrency = (items: ExpenseInterface[]) => {
    const expensesWithCurrency = items.map((x) => ({
      ...x,
      currency: x.currency || 'COP'
    }))

    type sortedExpensesType = {
      currencyKey: string
      items: ExpenseInterface[]
    }

    const sortedExpenses: sortedExpensesType[] = []

    expensesWithCurrency.forEach((item) => {
      const existingCurrency = sortedExpenses.find((x) => x.currencyKey === item.currency)

      if (existingCurrency) {
        existingCurrency.items.push(item)
      } else {
        sortedExpenses.push({
          currencyKey: item.currency,
          items: [item]
        })
      }
    })
    return sortedExpenses
  }

  // Calculate profit for each month and return the updated data.

  const salesWithExpenses = monthlySales.map((x) => {
    const sales = x.revenue || 0
    const expenses = x.allExpenses.reduce((a, b) => a + b.price, 0)
    return {
      ...x,
      revenue: sales - expenses, // This is useless if areAllCurrenciesCOP = true
      revenueWithoutExpenses: sales,
      expenses: expenses, // This is useless if areAllCurrenciesCOP = true
      areAllCurrenciesCOP: areAllCurrenciesCOPfunc(x.allExpenses),
      sortedExpenses: sortExpensesByCurrency(x.allExpenses)
    }
  })

  return {
    // Sort the array of objects using the custom comparator function
    salesWithExpenses: sortArrayByMonthAndYear(salesWithExpenses)
  }
}
