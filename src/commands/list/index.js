import chalk from 'chalk'
import { parseAliasFile, printableAlias } from '../../utils/aliases'

export default async function() {
    const aliases = await parseAliasFile()

    if (aliases.length) {
        aliases.forEach(alias => console.log(`➖ ${printableAlias(alias)}`))
    } else {
        console.log(chalk.yellow(`🤷️ No aliases here, try to create one with ${chalk.black.bgWhite(' z-alias -a ')}.`))
    }
}