export const getHeadLabelsFromRows = (rows) => {
  return Array.isArray(rows) && rows.length > 0 && rows[0] && rows[0].data
    ? [null, ...Object.keys(rows[0].data), null]
    : [];
};

export const getRowKids = (rowData) => {
  if (!rowData || !rowData.kids) {
    return null;
  }

  const key = Object.keys(rowData.kids).find(
    (key) => rowData.kids[key] && rowData.kids[key].records
  );

  return key ? { key, records: rowData.kids[key].records } : null;
};
