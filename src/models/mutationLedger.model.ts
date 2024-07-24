export enum TypeEnum {
  Income = 'Income',
  Expense = 'Expense'
}

export interface RequestBody {
  type: TypeEnum;
  user_id: string;
  category_id: string | null;
  amount: number;
}

export interface ResponseBody {
  id: string;
  type: string;
  user_id: string;
  category_id: string | null;
  amount: number;
}
