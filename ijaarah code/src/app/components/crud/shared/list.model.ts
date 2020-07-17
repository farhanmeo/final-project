export class Employee {

  //only model which is being used in various components
  // as per required

  $key: string;
  name: string;
  position: string;
  office: string;
  salary: number;
  uid: string;
  //For message
  price: number;
  message: string;
  image: string;

  //for ad posting
  Category: string;
  Description: string;
  title: string;
  file?: File
  url?: String;
  fileName?: String
  status?: String
  isFeatured?: string;
  isReserved?: string;
  keywords?: String
  city?: String;

  pickData?: string;
  pickTime?: string;
  returnData?: string;
  returnTime?: string;

  constructor(file?: File) {
    this.file = file;
  }
}
