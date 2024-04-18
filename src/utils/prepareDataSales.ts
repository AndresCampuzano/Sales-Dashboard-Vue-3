import type { SalesDataTable, SaleWithCustomerAndItemData } from '../types/types.ts'

export const prepareDataSales = (data: SaleWithCustomerAndItemData[]): SalesDataTable[] => {
  // Sorting by date
  const sortedArray = data.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  // Mapping data
  return sortedArray.map((sale) => ({
    id: sale._id,
    avatarItems: sale.items.map((item, index) => ({
      id: index,
      image_src: sale.original_items.find((x) => x._id === item.item_id)?.image || '',
      name: sale.original_items.find((x) => x._id === item.item_id)?.name || ''
    })),
    clientName: sale.client.name,
    totalProducts: sale.items.length,
    totalPrice: sale.items.reduce((acc, item) => acc + (item?.price || 0), 0),
    city: sale.client.city,
    department: sale.client.department,
    date: sale.created_at as string,
    isRecurrence: sale.total_sales.length > 1,
    totalSales: sale.total_sales,
    nestedTableData: {
      nestedItems: sale.items.map((item, index) => ({
        id: index,
        item_id: item.item_id,
        name: sale.original_items.find((x) => x._id === item.item_id)?.name || '',
        image_src: sale.original_items.find((x) => x._id === item.item_id)?.image || '',
        color: item.color,
        price: item.price || 0
      })),
      nestedClient: sale.client
    }
  }))
}
