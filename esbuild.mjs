import LocalWebServer from 'local-web-server';

let devMode = false;
for(const arg of process.argv.slice(2)) {
    if(arg == '--dev')
        devMode = true;
}

if(devMode) {
    console.log('Development mode enabled; files will be watched and a test server started');
    console.warn('Note that .d.ts files are not generated in this mode and output will not be minified');
    LocalWebServer.create({ directory: 'examples', https: true }).then(lws => {
        lws.on('verbose', (key, value) => {
            if(key === 'server.listening') {
                const urls = [];
                for(const ip of value) {
                    if('url' in ip)
                        urls.push(ip.url);
                }

                console.log(`Server listening on ${urls.join(', ')}`);
            }
            else if(key === 'server.error')
                console.log(`Server error: ${value}`);
            else if(key === 'server.closed')
                console.log('Server socket closed');
        })
    });
}

import('esbuild').then(esbuild => esbuild.build({
    bundle: true,
    minify: !devMode,
    sourcemap: true,
    watch: devMode,
    keepNames: devMode,
    target: 'es6',
    format: 'esm',
    logLevel: 'info',
    entryPoints: [ './src/index.ts' ],
    outfile: './lib/index.esm.js',
}).catch(() => process.exit(1)));