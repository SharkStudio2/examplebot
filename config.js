module.exports = {
    settings: {
        web: false, //kepp it false if not using replit
    },
    bot: {
        token: process.env.token || '', // if your using replit u must use the env
        prefix: '?',
        api: 'https://sharkoapi.sharksstudios.repl.co/api/simpleapi',
        api2: 'https://sharkoapi.sharksstudios.repl.co/api/howto'
    }
}