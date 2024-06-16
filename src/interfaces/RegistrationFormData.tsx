export interface RegistrationFormData {
  UserDetails: UserDetails;
  CompanyDetails: CompanyDetails;
}

interface UserDetails {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  role?: string;
}

interface CompanyDetails {
  website?: string;
  companyName?: string;
  registrationNumber?: string;
  taxNumber?: string;
  country?: string;
  city?: string;
  streetName?: string;
  zip?: string;
}
