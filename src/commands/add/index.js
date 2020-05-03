import inquirer from 'inquirer'
import { aliasNameGuard, aliasCmdGuard } from '../guards'
import { addToFile, parseAliasFile } from '../../utils/aliases'

export default async function(input) {
    const aliases = await parseAliasFile()

    const newAlias = await inquirer.prompt([
        {
            type: 'input',
            name: 'aliasName',
            message: 'What is the alias name ?',
            default: input[0],
            validate: aliasNameGuard(aliases)
        },
        {
            type: 'input',
            name: 'aliasCmd', 
            message: 'What is the alias commande ?',
            default: input[1],
            validate: aliasCmdGuard
        },
        {
            type: 'input',
            name: 'aliasDesc',
            message: 'What does the alias do ?'
        }
    ])

    await addToFile(newAlias)
}