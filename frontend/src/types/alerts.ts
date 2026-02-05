export interface Alert {
  id: string;
  type: "DEADLINE" | "DOCUMENT" | "SYSTEM";
  title: string;
  message: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  read: boolean;
  createdAt: string;
}