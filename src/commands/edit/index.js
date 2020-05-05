import inquirer from 'inquirer'
import chalk from 'chalk'
import { aliasCmdGuard } from '../guards'
import { replaceInFile, parseAliasFile, printableAlias } from '../../utils/aliases'

export default async function(input) {
    const aliases = await parseAliasFile()

    if (!aliases.length) {
        console.log(chalk.yellow(`🤷️ No aliases here, try to create one with ${chalk.black.bgWhite(' z-alias -a ')}.`))
        return
    }

    const editedAlias = await inquirer.prompt([
        {
            type: 'list',
            name: 'aliasName',
            message: 'Which alias do you want to edit ?',
            choices: aliases.map(alias => ({
                name: printableAlias(alias),
                value: alias.aliasName
            })),
            default: input[0]
        },
        {
            type: 'input',
            name: 'aliasCmd',
            message: 'What is the alias commande ?',
            default: ({aliasName}) => {
                return input[1] || aliases.find(alias => alias.aliasName === aliasName).aliasCmd
            },
            validate: aliasCmdGuard
        },
        {
            type: 'input',
            name: 'aliasDesc',
            message: 'What does the alias do ?',
            default: ({aliasName}) => {
                return aliases.find(alias => alias.aliasName === aliasName).aliasDesc
            }
        }
    ])

    await replaceInFile(editedAlias)
}