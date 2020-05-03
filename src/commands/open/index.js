import { exec } from 'child_process'
import chalk from 'chalk'
import { aliasFile } from '../../utils/aliases'

export default async function() {
    let opener;
  
    // platform specific command
    if (process.platform === 'darwin') {
        opener = 'open'
    } else if(process.platform === 'linux') {
        opener = 'xdg-open'
    } else {
        console.log(chalk.red(`Your platform "${process.platform}" is not supported, try to open manualy "${aliasFile}".`))
        return
    }

    // open the file
    exec(opener + ' "' + escape(aliasFile) + '"', (err) => {
        if (err) console.log(chalk.red(`An error occured, try to open manualy "${aliasFile}".`))
    })
}