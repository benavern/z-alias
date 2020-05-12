#!/usr/bin/env node
import meow from 'meow'
import commands from './commands'
import execCli from './utils/cli'
import { aliasFile } from './utils/aliases'

const shortAliasFilePath = aliasFile.replace(process.env.HOME, '~')

const cli = meow(`                            
    Usage:
      $ z-alias [options] [arguments]

      Options:
      --list, -l    List all aliases
      --open, -o    Open aliases file in your favorite editor
      --search, -s  Search in aliases
      --add, -a     Add an alias
      --edit, -e    Edit an alias
      --remove, -r  Remove an alias

      --help, -h    Display help
      --version, -v Print z-alias version

    Examples:
      $ z-alias -l
      $ z-alias -o
      $ z-alias -s [<searchTerm> <searchTerm2> ...]
      $ z-alias -a [<aliasName> "<aliasCommand>"]
      $ z-alias -e [<aliasName> "<aliasCommand>"]
      $ z-alias -r [<aliasName> <aliasName2> ...]

    Configuration:  
      * To change the path of the aliases file, paste and adapt this line
        at the end of your .bashrc file.

        export Z_ALIAS_FILE=${shortAliasFilePath}
      
      * To make your aliases available in all new shells paste this line
        at the end of your .bashrc file (adapt if above line has been added).

        if [ -f ${shortAliasFilePath} ]; then source ${shortAliasFilePath}; fi
`, {
    flags: {
      list: { type: 'boolean', alias: 'l' },
      open: { type: 'boolean', alias: 'o' },
      search: { type: 'boolean', alias: 's'},
      add: { type: 'boolean', alias: 'a' },
      edit: { type: 'boolean', alias: 'e' },
      remove: { type: 'boolean', alias: 'r' },

      help: { type: 'boolean', alias: 'h' },
      version: { type: 'boolean', alias: 'v'}
    }
})

export const options = {
    list: () => commands.list(),
    open: () => commands.open(),
    search: () => commands.search(cli.input),
    add: () => commands.add(cli.input),
    edit: () => commands.edit(cli.input),
    remove: () => commands.remove(cli.input)
}

execCli(cli, options)