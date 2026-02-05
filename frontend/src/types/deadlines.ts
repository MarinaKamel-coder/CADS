export type DeadlineStatus = "PENDING" | "COMPLETED" | "INACTIVE"; // Ajoute INACTIVE ici

export interface Deadline {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: DeadlineStatus; // Utilise le type mis à jour
  type: "FEDERAL" | "PROVINCIAL" | "MUNICIPAL";
  clientId: string;
  client?: {
    firstName: string;
    lastName: string;
    status: string;
  };
}