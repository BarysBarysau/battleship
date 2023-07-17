export type Users = {
  type: 'reg';
  data: {
    name: string;
    password: string;
  };
  id: 0;
};

export interface Index {
  [key: string]: string;
}
