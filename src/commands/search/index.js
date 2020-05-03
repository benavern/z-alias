import { parseAliasFile, printableAlias } from '../../utils/aliases'
import chalk from 'chalk'

export default async function(input) {
    const aliases = await parseAliasFile()

    const result = aliases
        .filter(alias => input.some(term => alias.aliasName.includes(term) ||alias.aliasDesc.includes(term) ))
    
    if (result.length) {
        result.forEach(alias => console.log(`* ${printableAlias(alias)}`))
    } else {
        console.log(`No alias matches "${chalk.yellow(input.join(', '))}".`)
    }
}