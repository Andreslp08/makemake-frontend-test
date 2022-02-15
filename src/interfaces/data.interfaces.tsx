export  interface Course{
    id:string;
    name:string;
}

export  interface Student{
    id:string;
    name:string;
}

export  interface Institution{
    name:string;
    phone:string;
    email:string;
    color:string;
    assignedPackage:string;
    courses:Course[];
    students:Student[];
    teachers:number;
    assignedBooks:number;
}

