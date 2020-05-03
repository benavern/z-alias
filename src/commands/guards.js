export function aliasNameGuard(existingAliases = []) {
    return function(input) {
        if (!input) return 'The alias must be at least 1 character'
        if (/[^a-zA-Z0-9\-]/.test(input)) return 'The alias must be only 1 word or multiple with dash separator (-)'
        if (existingAliases.includes(input)) return `The alias "${input}" already exists`
        return true
    }
}

export function aliasCmdGuard(input) {
    if (!input) return 'The alias command must be at least 1 character'
    return true
}