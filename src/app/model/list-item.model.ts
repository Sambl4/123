import { Author } from './author.model';

export interface ListItem {
  id: number;
  title: string;
  description: string;
  rate: boolean;
  date: string;
  duration: number;
  editMode: boolean;
  authors: Author[];
}
