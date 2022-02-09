

module.exports = async (srv) => {
    const { Employees } = cds.entities('com.employees');

    srv.on("READ", "Employees", async(req, res) => {
        const tx = cds.transaction(req);

        const result = await tx.run(
            
           UPDATE(Employees).set({ NAME: 'Mohan' }).where({ ID: 1 })
           //SELECT.from(Employees).where({ID : 1})
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
