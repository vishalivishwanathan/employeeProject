using com.employees as datamodel from '../db/data-model';
using {northwind as external} from './external/northwind';

service EmployeeService {

    // defining Entity
    entity Employees as projection on datamodel.Employees;
    // Defining Functions
    function functionCall(param : String(10)) returns String;
    // Defining Actions
    action actionCall(param : String(10)) returns String;

    //Defining entity / types
    entity item {
        key ID   : Integer;
            Name : String;
    }

    //Defining external service
    entity Customers as
        select
            key CustomerID,
                CompanyName,
                ContactName
        from external.Customers;
}
