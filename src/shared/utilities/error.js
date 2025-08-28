export class AuthenticationError extends Error {
  constructor() {
    super("Debes estar autenticado para realizar esta acción.");
    this.name = "AuthenticationError";
  }
}