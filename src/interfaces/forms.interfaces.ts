export interface FormsBase {
  title: string;
  description: string;
  expire_date: Date;
}

export interface Forms extends FormsBase {
  token: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  isDeleted: boolean;
}
