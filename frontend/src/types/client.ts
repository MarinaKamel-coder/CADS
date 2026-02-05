export interface ClientForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nasNumber: string;
  address: string;
  status: "ACTIVE" | "INACTIVE";
}
export interface Client extends ClientForm {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  // Optionnel : ajouter les relations si nécessaire
  documents?: any[]; 
  deadlines?: any[];
}