
const { a, b, httperrorcode, ID1 } = require('./constants');
const TextBundle = require('@sap/textbundle').TextBundle;
const bundle = new TextBundle('./_i18n/i18n');
const cds = require('@sap/cds');
const { Employees } = cds.entities('com.employees');

module.exports = async (srv) => {

    srv.on("READ", "Employees", async (req, res) => {

        const tx = cds.transaction(req);
        console.log(bundle.getText("Text1"));
        const result = await tx.run(

            // UPDATE(Employees).set({ Name: 'Mohan' }).where({ ID: 1 })
            //SELECT.from(Employees).where({ID : ID1})
            INSERT.into(Employees).entries({ ID: 4, Name: 'idk', Age: '30' })
        )
        return result;
    }),
        // function call event
        srv.on('functionCall', async (req, res) => {
            const tx = cds.transaction(req)
            var vProcedure = 'CALL "test"()'
            var val = tx.run(vProcedure);
            return val;
        });

    // Action call event
    srv.on('actionCall', async (req, res) => {
        // const tx = cds.transaction(req)
        // var vProcedure = 'CALL "test"()'
        // var val = tx.run(vProcedure);		
        return;
    });
}
