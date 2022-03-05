//currency coverter function
export const formatPrice = (num) => {
  const newNumber = Intl.NumberFormat('en',{
    style:'currency',
    currency:'EUR',
  }).format(num / 100)
  return newNumber
}

export const getUniqueValues = () => {}
