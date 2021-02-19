export const createPaginatedQuery = (
  sqlTable: string,
  cursor: Date,
  order: string,
  dbLimit: number,
  filter: any
) => {
  let createdAt = null;

  if (cursor) {
    createdAt = `'${cursor.toISOString()}'`;
  }

  console.log(createdAt);

  let whereQuery = "";

  if (createdAt) {
    whereQuery = ` WHERE ${sqlTable}."createdAt" ${order === "ASC" ? ">" : "<"} ${createdAt}`;
  }

  let filterQuery = "";

  if (filter) {
    filterQuery = Object.keys(filter).reduce((a, v) => `${a} "${v}"=${filter[v]}`, false ? " AND" : " WHERE");
  }

  let orderQuery = "";

  if (order) {
    orderQuery = ` ORDER BY ${sqlTable}."createdAt" ${order}`;
  }

  let limitQuery = ` LIMIT ${dbLimit + 1}`;

  return `SELECT * FROM ${sqlTable}` + whereQuery + filterQuery + orderQuery + limitQuery;
}