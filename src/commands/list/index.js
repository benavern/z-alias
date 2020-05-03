import { parseAliasFile, printableAlias } from '../../utils/aliases'

export default async function() {
    const aliases = await parseAliasFile()
    aliases.forEach(alias => console.log(`* ${printableAlias(alias)}`))
}