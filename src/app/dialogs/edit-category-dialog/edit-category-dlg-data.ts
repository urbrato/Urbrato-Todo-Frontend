import {CategoryUpdateDto} from "../../dto/category-update-dto";

export class EditCategoryDlgData {
  category: CategoryUpdateDto;
  hasNullIcon: boolean;
  newIcon: File;

  constructor(category: CategoryUpdateDto,
              hasNullIcon: boolean,
              newIcon: File
  ) {
    this.category = category;
    this.hasNullIcon = hasNullIcon;
    this.newIcon = newIcon;
  }
}
