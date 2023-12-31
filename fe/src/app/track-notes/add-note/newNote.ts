export class NewNote {
  constructor(public title = '', public text = '', public color = 'white') {}
}

export interface Note {
  id?: string;
  title: string;
  text: string;
  color: string;
}

export interface userSignInResponse {
  access_token: string;
  username: string;
}
