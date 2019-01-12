export class Employee {
  
$key : string;
name : string;
position : string;
office : string;
salary : number;
uid: string;
//For message

message: string;
image:string;

//for ad posting
Category: string;
Description: string;
title : string;
file?:File
url?:String;
fileName?:String
status?:String
keywords?:String
city?:String

constructor(file?:File) {
    this.file = file;
  }
}
