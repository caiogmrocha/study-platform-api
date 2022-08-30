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
      {
        type: 'confirm',
        name: 'shouldIncludeController',
        message: 'Include HTTP controller?',
        default: true,
      },
      {
        type: 'list',
        name: 'httpMethod',
        message: 'HTTP method',
        choices: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        default: 'GET',
        when: (answers) => {
          return answers.shouldIncludeController
        },
      },
      {
        type: 'input',
        name: 'httpPath',
        message: 'HTTP route path',
        when: (answers) => {
          return answers.shouldIncludeController
        },
      },
    ],
    actions: (answers) => {
      const actions = [
        {
          type: 'add',
          path: '../src/modules/{{module}}/{{dashCase name}}/{{dashCase name}}-use-case.ts',
          templateFile: 'templates/usecase/usecase.ts.hbs',
          skipIfExists: true,
        },
        {
          type: 'add',
          path: '../src/modules/{{module}}/{{dashCase name}}/{{dashCase name}}-use-case.spec.ts',
          templateFile: 'templates/usecase/usecase.spec.ts.hbs',
          skipIfExists: true,
        },
      ]

      if (answers.shouldIncludeController) {
        actions.push({
          type: 'add',
          path: '../src/modules/{{module}}/{{dashCase name}}/{{dashCase name}}-controller.ts',
          templateFile: 'templates/usecase/controller.ts.hbs',
          skipIfExists: true,
        })

        actions.push({
          type: 'add',
          path: '../src/modules/{{module}}/{{dashCase name}}/{{dashCase name}}-controller.test.ts',
          templateFile: 'templates/usecase/controller.test.ts.hbs',
          skipIfExists: true,
        })

        actions.push({
          type: 'add',
          path: '../src/modules/{{module}}/{{dashCase name}}/{{dashCase name}}-controller-factory.ts',
          templateFile: 'templates/usecase/controller-factory.ts.hbs',
          skipIfExists: true,
        })
      }

      return actions
    }
  })
}
