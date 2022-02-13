const fs = require('fs');

const init = async (app) => {
    const rootPath = __dirname;
    const moduleNames = await fs.promises.readdir(rootPath);
    for (const moduleName of moduleNames) {
        const stat = fs.lstatSync(`${rootPath}/${moduleName}`);
        if (stat.isDirectory()) {
            const module = require(`./${moduleName}`);
            if (module.init) {
                await module.init(app);
                console.log(`Module ${moduleName} loaded`);
            }
        }
    }
    return app;
}

module.exports = { init };
