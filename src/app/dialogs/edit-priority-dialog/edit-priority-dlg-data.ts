import {PriorityCreateDto} from "../../dto/priority-create-dto";
import {PriorityUpdateDto} from "../../dto/priority-update-dto";

export class EditPriorityDlgData {
  dlgTitle: string;
  exists: boolean;
  dto: PriorityCreateDto | PriorityUpdateDto;
  hasNullIcon: boolean;
  newIcon: File;
}
