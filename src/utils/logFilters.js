export const filterLogsBySearch = (logs, searchTerm, isStockLog = false) => {
  if (!searchTerm) return logs;
  
  return logs.filter(log => {
    const searchFields = [
      log.user?.toLowerCase() || '',
      log.action?.toLowerCase() || '',
      log.details?.toLowerCase() || ''
    ];
    
    if (isStockLog && log.product) {
      searchFields.push(log.product.toLowerCase());
    }
    
    return searchFields.some(field => 
      field.includes(searchTerm.toLowerCase())
    );
  });
};

export const filterLogsByType = (logs, filterType) => {
  if (filterType === 'all') return logs;
  return logs.filter(log => log.type === filterType);
};

export const filterLogsByDate = (logs, dateFilter) => {
  if (dateFilter === 'all') return logs;
  
  const now = new Date();
  let filterDate = new Date();
  
  switch (dateFilter) {
    case 'today':
      filterDate.setHours(0, 0, 0, 0);
      break;
    case 'week':
      filterDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      filterDate.setMonth(now.getMonth() - 1);
      break;
    default:
      return logs;
  }

  return logs.filter(log => new Date(log.timestamp) >= filterDate);
};