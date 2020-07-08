module.exports = {
    account: {
        deleted: `Account deleted.`,
        updated: `Account updated.`
    },
    api: {
        notFound: `This route does not exist.`
    },
    application: {
        online: (port, env) => `ONLINE: Port[${port}] Environment[${env}].`,
    },
    attach: {
        add: type => `${type.charAt(0).toUpperCase() + type.slice(1)} added.`,
        alreadyExists: type => `This ${type} has already been attached to this entry.`,
        remove: type => `${type.charAt(0).toUpperCase() + type.slice(1)} removed.`
    },
    auth: {
        incorrectPassword: `The password you entered was incorrect.`,
        login: name => `Welcome back, ${name}!`,
        notAuthorized: `You are not authorized to make this request.`,
        notFound: `No user with that e-mail address exists.`,
        signup: name => `Welcome to your saga, ${name}!`,
        tooManyRequests: s => `You have made too many requests${s ? `: Retry again in ${s} second(s).` : '.'}`,
        unsupported: `The authorization type is not supported.`,
        userExists: `A user with this e-mail address already exists.`
    },
    database: {
        alreadySeeded: `Database already seeded.`,
        connect: `Application connected.`,
        connectionErr: e => `Unable to connect: ${e}.`,
        created: `Database created.`,
        error: e => `Database startup failed: ${e}.`,
        seeding: log => `Seeding data... \n${log}`,
        seeded: `Database seeded.`,
        sync: `Models synced.`,
    },
    entry: {
        created: `Entry created.`,
        deleted: `Entry deleted.`,
        updated: `Entry updated.`
    },
    goal: {
        alreadyExists: `A goal with that title already exists.`,
        created: `Goal created.`,
        deleted: `Goal deleted.`,
        updated: `Goal updated.`
    },
    permission: {
        alreadyExists: `An account with that e-mail address already exists.`,
        doesNotExist: `This user does not exist.`,
        error: e => `Unable to validate permission: ${e}.`,
        none: `You do not have permission to make this request.`
    },
    schema: {
        auth: {
            email: {
                'string.base': 'Please use a valid email address',
                'string.email': 'Please use a valid email address',
                'any.required': 'Your email address is required'
            },
            firstName: {
                'string.base': 'Your first name must be alphanumeric',
                'string.min': 'Your first name must be at least one character',
                'string.max': 'Your first name cannot exceed 128 characters',
                'any.required': 'Your first name is required'
            },
            password: {
                'string.base': 'Your password must be alphanumeric',
                'string.min': 'Your password must be at least eight characters',
                'string.max': 'Your password cannot exceed 128 characters',
                'any.required': 'Your password is required'
            }
        },
        entry: {
            backgroundColor: {
                'string.base': 'Background color must be a valid hex color, ie: "#FFFFFF"',
                'string.regex': 'Background color must be a valid hex color, ie: "#FFFFFF"'
            }
        }
    },
    tag: {
        alreadyExists: `A tag with that name already exists.`,
        created: `Tag created.`,
        deleted: `Tag deleted.`,
        updated: `Tag updated.`
    },
    token: {
        error: e => `There was an error with your session: ${e}.`,
        expired: `Your session has expired`,
    }
}