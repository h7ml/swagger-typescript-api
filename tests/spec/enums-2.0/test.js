const { generateApiForTest } = require("../../helpers/generateApiForTest");
const { resolve } = require("node:path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemaInfos = require("../../helpers/createSchemaInfos");
const assertGeneratedModule = require("../../helpers/assertGeneratedModule");

const schemas = createSchemaInfos({
  absolutePathToSchemas: resolve(__dirname, "./"),
});

schemas.forEach(({ absolutePath, apiFileName }) => {
  generateApiForTest({
    testName: "enums-2.0 option test",
    silent: true,
    name: apiFileName,
    input: absolutePath,
    output: resolve(__dirname, "./"),
    extractRequestParams: true,
    extractRequestBody: true,
    extractResponseBody: true,
    extractResponseError: true,
    generateClient: false,
  }).then(() => {
    validateGeneratedModule(resolve(__dirname, `./${apiFileName}`));
    assertGeneratedModule(
      resolve(__dirname, `./${apiFileName}`),
      resolve(__dirname, "./expected.ts"),
    );
  });
});
