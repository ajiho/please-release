export class CancelledError extends Error {
  constructor(message = "Release cancelled by user") {
    super(message);
    this.name = "CancelledError";
    this.code = "USER_CANCEL";
    this.isCancelled = true;
  }
}
