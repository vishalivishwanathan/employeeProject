namespace com.employees;

entity Employees {
    key ID   : Integer;
        Name : String;
        Age  : Integer;
}

entity Department {
    key ID   : Integer;
        Name : String;
}

//This below view is an example view created to show how to call a  parameterised View from Node.
//This view takes a parameter  myParam and returns only records that match the Name which is being passed as parameter
view paramViewExample(myParam : String(8)) as
    select
        key ID,
            Name,
            Age
    from Employees
    where
        Name = : myParam;
