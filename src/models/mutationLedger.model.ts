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

export interface UpdateRequestBody {
  type: TypeEnum | null;
  user_id: string | null;
  category_id: string | null;
  amount: number | null;
}

export interface ResponseBody {
  id: string;
  type: string;
  user_id: string;
  category_id: string | null;
  amount: number;
}
