const { readdirSync } = require('fs')
const path = require('path')

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

module.exports = function (plop) {
  plop.setGenerator('usecase', {
    description: 'Base Use Case',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name',
      },
    ],
    actions: (answers) => {
      const actions = [
        {
          type: 'add',
          path: '../src/validations/rules/{{dashCase name}}-validator.ts',
          templateFile: 'templates/validator/validator.ts.hbs',
          skipIfExists: true,
        },
        {
          type: 'add',
          path: '../src/validations/rules/{{dashCase name}}-validator.spec.ts',
          templateFile: 'templates/validator/validator.spec.ts.hbs',
          skipIfExists: true,
        },
        {
          type: 'add',
          path: '../src/validations/errors/{{dashCase name}}-error.ts',
          templateFile: 'templates/validator/error.ts.hbs',
          skipIfExists: true,
        },
      ]

      return actions
    }
  })
}
