import {TaskCreateDto} from "../../dto/task-create-dto";
import {TaskUpdateDto} from "../../dto/task-update-dto";
import {Category} from "../../entities/category";
import {Priority} from "../../entities/priority";

export class EditTaskDlgData {
  dlgTitle: string;
  dto: TaskCreateDto | TaskUpdateDto;
  categories: Category[];
  priorities: Priority[];
}
