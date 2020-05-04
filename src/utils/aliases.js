import path from 'path'
import os from 'os'
import fs from 'fs'
import chalk from 'chalk'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const checkFile = promisify(fs.exists)

export const aliasFile = process.env.Z_ALIAS_FILE || path.join(os.homedir(), '.bash_aliases')

/**
 * Create a string from an alias object
 * 
 * @param {{aliasName: String, aliasCmd: String, aliasDesc: String}} alias 
 */
export function aliasToString(alias) {
    return `alias ${alias.aliasName}='${alias.aliasCmd.replace(/'/g, '"')}' ${alias.aliasDesc ? `# ${alias.aliasDesc}` : ''}`
}

/**
 * Create an alias object from a string
 * 
 * @param {String} str - the alias string
 */
export function strToAlias(str) {
    // @Todo: Better parse strategy...
    const [makealias, aliasDesc = ''] = str.split('#')
    const [aliasName, aliasCmd] = makealias.split('=')

    return {
        aliasName: aliasName.replace('alias', '').trim(), 
        aliasCmd: aliasCmd.replace(/'/g, '').trim(), 
        aliasDesc: aliasDesc.trim()
    }
}

/**
 * Create a human readable alias string
 * 
 * @param {{aliasName: String, aliasCmd: String, aliasDesc: String}} alias 
 * 
 * @returns {String} - a printable version of the alias
 */
export function printableAlias(alias) {
    return ` ${alias.aliasName} ${chalk.dim(`- ${chalk.cyan(alias.aliasDesc || '')} - ${chalk.italic.green(alias.aliasCmd)}`)}`
}

/**
 * Parse the files
 * 
 * @returns {{aliasName: String, aliasCmd: String, aliasDesc: String}[]}
 */
export async function parseAliasFile() {
    await createFileIfNeeded()

    const data = await readFile(aliasFile)

    // parse lines
    return data.toString()
        .split(/\r?\n/)
        .filter(line => line.startsWith('alias'))
        .map(strToAlias)
}

/**
 * Remove aliases from the file
 * 
 * @param {String[]} - the list of aliasNames to remove
 * 
 * @returns {Promise}
 */
export async function removeFromFile(aliasesToRemove = []) {
    if (!aliasesToRemove.length) {
        console.log(chalk.green('Nothing has been removed.'))
        return
    }

    const aliases = await parseAliasFile()
    const newAliases = aliases.filter(alias => !aliasesToRemove.includes(alias.aliasName))

    await writeAliasFile(newAliases)
    console.log(chalk.green(`"${chalk.cyan(aliasesToRemove.join(', '))}" have been removed from ${chalk.yellow(aliasFile)}.`))
}

/**
 * Replace aliase from the file
 * 
 * @param {{aliasName: String, aliasCmd: String, aliasDesc: String}} aliasToReplace- the alias to be replaced
 * 
 * @returns {Promise}
 */
export async function replaceInFile(aliasToReplace) {
    const aliases = await parseAliasFile()
    const newAliases = aliases.map(alias => {
        if (alias.aliasName === aliasToReplace.aliasName) return aliasToReplace
        return alias
    })

    await writeAliasFile(newAliases)
    console.log(chalk.green(`The alias "${chalk.cyan(aliasToReplace.aliasName)}" has been edited in ${chalk.yellow(aliasFile)}.`))
}

/**
 * Add a new alias to the file
 * 
 * @param {{aliasName: String, aliasCmd: String, aliasDesc: String}} newAlias 
 */
export async function addToFile(newAlias) {
    const aliases = await parseAliasFile()
    const newAliases = [...aliases, newAlias]

    await writeAliasFile(newAliases)
    console.log(chalk.green(`New alias "${chalk.cyan(newAlias.aliasName)}" has been added to ${chalk.yellow(aliasFile)}.`))
}

/**
 * Write to the file
 * 
 * @param {{aliasName: String, aliasCmd: String, aliasDesc: String}[]} - the aliases to write
 */
export async function writeAliasFile(aliases) {
    const aliasesStr = aliases.map(alias => aliasToString(alias)).join('\n')

    await writeFile(aliasFile, aliasesStr)
}

/**
 * Create the file if it doesn't already exist
 * 
 * @returns {void}
 */
export async function createFileIfNeeded() {
    const exists = await checkFile(aliasFile)
    
    if (!exists) {
        await writeFile(aliasFile, '')
        console.log(chalk.green(`The file ${chalk.yellow(aliasFile)} has been created.`))
    }
}