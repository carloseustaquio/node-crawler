function checkRequiredParams(params) {
  params.forEach((param) => {
    if (!param) {
      throw new Error(`Missing param ${param} in body.`);
    }
  });
}

module.exports = checkRequiredParams;
