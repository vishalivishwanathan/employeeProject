const cds = require('@sap/cds');

// import cf axios
//const SapCfAxios = require('sap-cf-axios').default;
const { Employees } = cds.entities('com.employees');


module.exports = async (srv) => {

    srv.on("READ", "Employees", async (req, res) => {

        try {
            const tx = cds.transaction(req);

            // const result1 = await tx.run(
            //     //UPDATE(Employees).set({ Name: 'Vishali' }).where({ ID: 4 })
            //     INSERT.into(Employees).entries({ ID: 8, Name: 'Eight', Age: '30' })   

            // ) .catch((error) => req.error({ code: 417, message: error.message }))


            // const result2 = await tx.run(
            //     SELECT.from(Employees)               
            // )
            // return result2;

            // const result = await tx.run(
            //     SELECT.from(Employees).where({ ID: 1 })
            // );
            // result[0].Skill="SAP";

            // return result;
        }
        catch (error) {
            req.error({ code: 417, message: error.message })
        }

    });

    // function call event
    srv.on('functionCall', async (req, res) => {
        var val = parseInt(req.data.param);
        const tx = cds.transaction(req);

        const result = await tx.run(
            SELECT.from(Employees).where({ ID: val })
        );

        result[0].Skill = "SAP";

        return result;
    });


    // function call event
    srv.on('nativeSQL', async (req, res) => {
        // const result2 = await tx.run(
        //     SELECT.from(Employees)               
        // )

        const result = await cds.tx(req).run(`SELECT * from COM_EMPLOYEES_EMPLOYEES WHERE ID=4`)
            .catch((error) =>
                req.error({ code: 417, message: error.message }));

        return result;
    });





    // Action call event
    // srv.on('actionCall', async (req, res) => {
    //     const tx = cds.transaction(req);
    //     console.log(bundle.getText("Text1"));
    //     const result = await tx.run(
    //         SELECT.from(Employees)
    //     );
    // const result2 = await cds.tx(req).run(
    //     `SELECT * from EMPLOYEESPROJECT_DB_PARAMVIEWEXAMPLE('${req.data.Name}')`)
    //     .catch((error) => req.error({ code: httperrorcode, message: bundle.getText("errorMsg") }));

    //     return JSON.stringify(result);
    // });
}
