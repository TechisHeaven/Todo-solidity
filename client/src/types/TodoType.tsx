export interface TodoInterface {
  index: number;
  description: string;
  isCompleted: boolean;
  timestamp: number;
}

export interface Action {
  type: string;
  payload?: any;
}
