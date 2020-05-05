import chalk from 'chalk'
import { parseAliasFile, printableAlias } from '../../utils/aliases'

export default async function(input) {
    const aliases = await parseAliasFile()
    
    if (!input.length) {
        console.log(chalk.yellow(`⚠️ You must provide at least 1 word to look for. ${chalk.reset.dim('eg. $ z-alias -s vim')}`))
        return
    }

    const result = aliases
        .filter(alias => input.some(term => alias.aliasName.includes(term) || alias.aliasDesc.includes(term) || alias.aliasCmd.includes(term)))
    
    if (result.length) {
        result.forEach(alias => console.log(`➖️ ${printableAlias(alias)}`))
    } else {
        console.log(chalk.yellow(`🤷️ No alias matches with : ${input.map(term => chalk.black.bgCyan(term)).join(', ')}.`))
    }
}