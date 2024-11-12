function calculateTotalSpentByCategory(transactions) {
  const categoryWiseExpenditure = {};
  transactions.forEach((transaction) => {
    if (!categoryWiseExpenditure[transaction.category]) {
      categoryWiseExpenditure[transaction.category] = 0;
    }
    categoryWiseExpenditure[transaction.category] += transaction.price;
  });
  return Object.keys(categoryWiseExpenditure).map((category) => ({
    category,
    totalSpent: categoryWiseExpenditure[category],
  }));
}

module.exports = calculateTotalSpentByCategory;