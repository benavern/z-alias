# Z-ALIAS

> Edit your bash aliases the funny way

[![npm](https://img.shields.io/npm/v/z-alias?style=for-the-badge)](https://www.npmjs.com/package/z-alias)

## About

This project provides an easy solution for using **aliases** from your command line. `z-alias` solves the hassle of remembering how to create / edit / delete your aliases.

## Install

```bash
npm i -g z-alias
```

## Usage

```bash
z-alias -h
```

```
  Usage
    $ z-alias
 
  Options
    --list, -l    List all aliases
    --open, -o    Open aliases file in editor
    --search, -s  Search in aliases
    --add, -a     Add an alias
    --edit, -e    Edit an alias
    --remove, -r  Remove an alias

    --help, -h    Display help
    --version, -v Print z-alias version
 
  Examples
    $ z-alias -l
    $ z-alias -o
    $ z-alias -s [<searchTerm> <searchTerm2> ...]
    $ z-alias -a [<aliasName> "<aliasCommand>"]
    $ z-alias -e [<aliasName> "<aliasCommand>"]
    $ z-alias -r [<aliasName> <aliasName2> ...]
```

## Config

In your `~/.bashrc`, `~/.zshrc`, ...

### Change aliases file path

If not set, defaults to : `~/.bash_aliases`


```
# Change aliases file path
export Z_ALIAS_FILE="/path/to/aliases"
```

### Add support to alternative shells (Zsh, ...)

```
# Add aliases to shell
if [ -f ~/.bash_aliases ]; then
    source ~/.bash_aliases
fi;
```