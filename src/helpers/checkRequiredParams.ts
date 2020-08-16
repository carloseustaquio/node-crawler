export default function checkRequiredParams(params: Array<string | number>) {
  params.forEach((param) => {
    if (!param) {
      throw new Error(`Missing param ${param} in body.`);
    }
  });
}
