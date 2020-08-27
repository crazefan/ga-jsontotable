export const getHeadLabelsFromRows = (rows) =>
  Array.isArray(rows) && rows.length > 0 && rows[0] && rows[0].data
    ? [null, ...Object.keys(rows[0].data), null]
    : [];
