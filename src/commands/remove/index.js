import inquirer from 'inquirer'
import chalk from 'chalk'
import { parseAliasFile, removeFromFile, printableAlias } from '../../utils/aliases'

export default async function(input) {
    const aliases = await parseAliasFile()

    if (!aliases.length) {
        console.log(chalk.yellow(`🤷️ No aliases here, try to create one with ${chalk.black.bgWhite(' z-alias -a ')}.`))
        return
    }

    const { aliasName: aliasesToRemove } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'aliasName',
            message: 'What is/are the alias(es) you want to remove ?',
            choices: aliases.map(alias => ({
                name: printableAlias(alias),
                value: alias.aliasName
            })),
            default: input
        }
    ])

    await removeFromFile(aliasesToRemove)
}