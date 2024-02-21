import pg from "pg";

export const executeQuery = async (
  query: string,
  parameters: Array<any>,
  pgClient: pg.Client
) => {
  try {
    const response = await pgClient.query(query, parameters);
    return response;
  } catch (error:any) {
    console.error("error occoured in db", error);
    return;
  }
};
