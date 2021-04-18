export const isImage = (file: any): boolean => {
  return file && file["type"].split("/")[0] === "image";
};
