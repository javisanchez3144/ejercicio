const container = require("./frameworks/container");
const application = container.resolve("app");

application
    .start()
    .then(() => {
        console.log("Aplicación API REST instanciada, iniciada y conectada correctamente...")
    })
    .catch(err => {
        console.log(err)
        process.exit();
    });