import type { SummarySale, SaleWithCustomerAndItemData } from '../types/types.ts'

export const prepareDataSales = (data: SaleWithCustomerAndItemData[]): SummarySale[] => {
  // Sorting by date
  const sortedArray = data.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  // Mapping data
  return sortedArray.map((sale) => ({
    _id: sale._id,
    totalPrice: sale.items.reduce((acc, item) => acc + (item?.price || 0), 0),
    date: sale.created_at as string,
    isRecurrence: sale.total_sales.length > 1,
    totalSales: sale.total_sales,
    items: sale.items.map((item, index) => ({
      id: index, // since item_id can be the same item multiple times without an id from DB, that's why we use index as id
      item_id: item.item_id,
      name: sale.original_items.find((x) => x._id === item.item_id)?.name || '',
      image_src: sale.original_items.find((x) => x._id === item.item_id)?.image || '',
      color: item.color,
      price: item.price || 0
    })),
    customerSnapshot: sale?.client_snapshot || sale.client
  }))
}
