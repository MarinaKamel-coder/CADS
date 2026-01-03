export interface ClientForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nasNumber: string;
  address: string;
  status: "ACTIVE" | "INACTIVE";
}
