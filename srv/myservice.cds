using com.employees as datamodel from '../db/data-model';

service EmployeeService{ 

    // defining Entity
    entity Employees as select from datamodel.Employees;
    // Defining Functions
    function functionCall(param : String(10)) returns String;
     function nativeSQL() returns String;
    // Defining Actions
    action actionCall(param : String(10)) returns String;

    //Defining entity / types
    entity item {
        key ID   : Integer;
            Name : String;
    }
    

  
}
