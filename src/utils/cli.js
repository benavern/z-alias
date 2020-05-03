/**
 * Execute the corresponding command to the passed flag
 * 
 * @param {import("meow").Result} cli - the current cli context
 * @param {{add: Function, remove: Function, help: Function}} options - the available options
 */
export default function (cli, options) {
    // filter the flags that are used
    const usedFlags = Object.keys(cli.flags)
        .filter(flag => options[flag] && cli.flags[flag])

    if (usedFlags.length) {
        // if flags present, then execut first flags corresponding command
        return options[usedFlags[0]]()
    }
    // if no flag present (or no flag recognized), then display help screen
    return cli.showHelp()
}
