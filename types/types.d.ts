interface User {
  _id:string
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber: string;
  countryId: string;
  avatarUrl ?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IPinfoDataType {
    ip: string,
    hostname:string,
    city: string,
    region:string,
    country:string,
    loc:string,
    org:string,
    timezone:string,
  }

interface OTPResponse {
    isSuccess:boolean
    message:string
}

interface RegisterResponse {
    isSuccess:boolean
    message:string
    payload?:string
}


interface UserLocation {
  id: string;
  lat: number;
  long: number;
  ip: string;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

 interface Device {
  id: string;
  deviceId: string;
  fingurePrint: string;
  manufacturer: string;
  brand: string;
  isEmulator: boolean;
  installOdavoltVersion: string;
  updatedOdavoltVersion: string;
  isIOS: boolean;
  isAndroid: boolean;
  carrier: string;
  isTablet: boolean;
  ip: string;
  timeZone: string;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

interface Site {
  _id:string
  id:string
  name:string
  logoUrl:string
  status:string
  daysLeft:string
  progress:string
  notificationCount:int
}

interface User {
  _id:string
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber: string;
  countryId: string;
  avatarUrl ?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AddUserReq {
    legalFirstName:string
    legalLastName:string
    email:string
    userId:string

}

