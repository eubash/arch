export interface Notification {
  message: string | null;
  type: "info" | "success" | "warning" | "error" | "primary" | null;
}