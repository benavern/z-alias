import { exec } from 'child_process'
import chalk from 'chalk'
import { aliasFile, createFileIfNeeded } from '../../utils/aliases'

export default async function() {
    let opener;
  
    // platform specific command
    if (process.platform === 'darwin') {
        opener = 'open'
    } else if(process.platform === 'linux') {
        opener = 'xdg-open'
    } else {
        console.log(chalk.red(`🚨️ Your platform ${chalk.black.bgCyan(process.platform)} is not supported, try to open manualy ${chalk.black.bgWhite(aliasFile)}.`))
        return
    }
    
    // Create the file if it does not exist
    await createFileIfNeeded()

    // open the file
    exec(opener + ' "' + escape(aliasFile) + '"', (err) => {
        if (err) {
            console.log(chalk.red(`🚨️ An error occured, try to open manualy ${chalk.black.bgWhite(aliasFile)}.`))
            return
        }
        console.log(chalk.green(`🗒️ The file ${chalk.black.bgWhite(aliasFile)} has been opened in your favorit editor.`))
    })
}