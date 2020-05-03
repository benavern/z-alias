import inquirer from 'inquirer'
import { parseAliasFile, removeFromFile, printableAlias } from '../../utils/aliases'

export default async function(input) {
    const aliases = await parseAliasFile()

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

    if(aliasesToRemove.length) {
        await removeFromFile(aliasesToRemove)
    } else {
        console.log('Nothing to delete, you\'ve changed your mind...')
    }
}