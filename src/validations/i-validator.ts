export interface IValidator {
  fieldName: string;
  validate(): Error | void;
}
