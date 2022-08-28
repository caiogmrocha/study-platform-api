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
      {
        type: 'list',
        name: 'module',
        message: 'Module',
        choices: getDirectories(path.resolve(__dirname, '../src/modules'))
      },
    ],
    actions: (answers) => {
      const actions = [
        {
          type: 'add',
          path: '../src/modules/{{module}}/{{dashCase name}}/{{dashCase name}}-use-case.ts',
          templateFile: 'templates/usecase.ts.hbs',
          skipIfExists: true,
        },
        {
          type: 'add',
          path: '../src/modules/{{module}}/{{dashCase name}}/{{dashCase name}}-use-case.spec.ts',
          templateFile: 'templates/usecase.spec.ts.hbs',
          skipIfExists: true,
        },
      ]

      return actions
    }
  })
}
