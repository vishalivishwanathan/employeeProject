const cds = require('@sap/cds');

const { a, b, httperrorcode, ID1, obj } = require('./constants'); // This line is to import the constants defined in ./constants file
const TextBundle = require('@sap/textbundle').TextBundle; // This line is to import Textbundle library from dependencies that we added in package.json
const bundle = new TextBundle('./_i18n/i18n'); // this line is used to import the i18n definitions we defined in i18n file
// import cf axios
const SapCfAxios = require('sap-cf-axios').default;
const { Employees } = cds.entities('com.employees');


module.exports = async (srv) => {
    // Instantiation of axios
    const sapcfaxios = SapCfAxios("YOUR_DEST_NAME");

    // This callback function is called when a GET request is made on "Employees" table via the service endpoint created
    // The event handler used here is "on"
    srv.on("READ", "Employees", async (req, res) => {
        console.log(bundle.getText("Text1")); //Prints "Hello World!!" in console
        console.log(obj.obj1); // Prints "10" in console
        console.log(a); //Prints "1000" in console

        //We can run looping statements(for,while,etc),conditional statements like : if-else, switch cases, etc
        //We can implement any logic here, validations , etc
        //For more syntaxes- refer capire document or Javascript syntaxes in W3Schools etc 


        //Below we will implement custom logic to show only Employees with ID as 1 when the event handler is invoked
        // Here we can perform any SQL Query based on the requirement

        const tx = cds.transaction(req);
        const result1 = await tx.run(
            //UPDATE(Employees).set({ Name: 'Two' }).where({ ID: 2 })
            //INSERT.into(Employees).entries({ ID: 4, Name: 'idk', Age: '30' })
            SELECT.from(Employees).where({ ID: 1 })
            //In the above code, if any arguments are passed from UI, we can refer it from req.data object
            //the req.data object will have only fields that are available in the original table
            //Example:
            // SELECT.from(Employees).where({ ID: req.data.ID })

        )
        // Below code shows how to call a parameterised view
        // This parameterised view returns only Employees whose name= string passed in the parameter

        const result2 = await cds.tx(req).run(
            `SELECT * from EMPLOYEESPROJECT_DB_PARAMVIEWEXAMPLE('${req.data.Name}')`)
            .catch((error) => req.error({ code: httperrorcode, message: bundle.getText("errorMsg") }));
           

        return result1;
    });
    // function call event
    srv.on('functionCall', async (req, res) => {
        var val = parseInt(req.data.param);
        const tx = cds.transaction(req);

        const result = await tx.run(
            SELECT.from(Employees).where({ ID: val })
        );
        return JSON.stringify(result);
    });

    // Action call event
    // srv.on('actionCall', async (req, res) => {
    //     const tx = cds.transaction(req);
    //     console.log(bundle.getText("Text1"));
    //     const result = await tx.run(
    //         SELECT.from(Employees)
    //     );
    //     return JSON.stringify(result);
    // });
}
