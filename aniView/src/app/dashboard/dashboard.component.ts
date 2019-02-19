import { AnimalService } from '../core/services/animal.service';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('f') form: any;
  showEditModal = false;
  showDeleteModal = false;
  animalRecords: any = [];

  myform: FormGroup;
  type: FormControl;
  category: FormControl;
  breed: FormControl;
  height: FormControl;
  weight: FormControl;
  food: FormControl;
  speed: FormControl;
  color: FormControl;

  constructor(private animalService: AnimalService) {
  }
  pageNo = 1;
  pageSize = 10;
  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.getList();
  }

  createFormControls() {
    this.type = new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]);
    this.category = new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]);
    this.breed = new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]);
    this.height = new FormControl('', [
      Validators.required,
      Validators.max(1000),
    ]);
    this.weight = new FormControl('', [
      Validators.required,
      Validators.max(1000),
    ]);
    this.food = new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]);
    this.speed = new FormControl('', [
      Validators.required,
      Validators.max(1000),
    ]);
    this.color = new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      type: this.type,
      category: this.category,
      breed: this.breed,
      height: this.height,
      weight: this.weight,
      food: this.food,
      speed: this.speed,
      color: this.color
    });
  }

  prePage() {
    if (this.pageNo > 1) {
      this.pageNo = (this.pageNo == 1) ? this.pageNo : this.pageNo - 1;
      this.getList();
    }
  }
  nextPage() {
    if (this.animalRecords.length == this.pageSize) {
      this.pageNo = this.pageNo + 1;
      this.getList();
    }
  }
  eidtStatus = false;
  showModal() {
    this.showEditModal = true;
  }
  addModal() {
    this.eidtStatus = false;
    this.showEditModal = true;
  }
  animalId = "";
  editModal(val) {
    this.eidtStatus = true;
    this.type.setValue(val.type);
    this.category.setValue(val.category);
    this.breed.setValue(val.breed);
    this.height.setValue(val.height);
    this.weight.setValue(val.weight);
    this.food.setValue(val.food);
    this.speed.setValue(val.speed);
    this.color.setValue(val.color);
    this.showEditModal = true;
    this.animalId = val._id;
  }
  deleteModal(val) {
    this.showDeleteModal = true;
    this.animalId = val._id;
  }
  confirmDelete() {
    this.animalService.deleteAnimal({ _id: this.animalId }).subscribe(data => {
      if (data.result.success) {
        this.showDeleteModal = false;
        this.getList();
        this.hideModal();
        this.alert = {
          hasError: false,
          hasSuccess: true,
          hasMsg: data.result.message
        }
      } else {
        this.alert = {
          hasError: true,
          hasSuccess: false,
          hasMsg: data.result.message
        }
      }
    });
  }

  hideModal() {
    this.showDeleteModal = false;
    this.showEditModal = false;
    this.myform.reset();
  }

  onSubmit(data) {
    if (this.myform.valid) {
      if (this.eidtStatus == true) {
        data._id = this.animalId;
        this.editAnimal(data);
      } else {
        this.addAnimal(data);
      }
    }
  }

  alert = {
    hasError: false,
    hasSuccess: false,
    hasMsg: ''
  }
  getList() {
    this.animalRecords = [];
    this.getAnimals({
      "pageNo": this.pageNo,
      "pageSize": this.pageSize,
      "search": ""
    })
  }
  getAnimals(values) {
    this.animalService.getAnimals(values).subscribe(data => {
      if (data.result.success) {
        this.animalRecords = data.result.data;
        this.alert = {
          hasError: false,
          hasSuccess: false,
          hasMsg: ''
        }
      } else {
        this.alert = {
          hasError: true,
          hasSuccess: false,
          hasMsg: data.result.message
        }
      }
    });
  }
  getAnimalById(values) {
    this.animalService.getAnimalById(values).subscribe(data => {
      if (data.result.success) {
        this.myform.reset();
        this.alert = {
          hasError: false,
          hasSuccess: false,
          hasMsg: ""
        }
      } else {
        this.alert = {
          hasError: true,
          hasSuccess: false,
          hasMsg: data.result.message
        }
      }
    });
  }
  addAnimal(values) {
    this.animalService.addAnimal(values).subscribe(data => {
      if (data.result.success) {
        this.getList();
        this.myform.reset();
        this.hideModal();
        this.alert = {
          hasError: false,
          hasSuccess: true,
          hasMsg: data.result.message
        }
      } else {
        this.alert = {
          hasError: true,
          hasSuccess: false,
          hasMsg: data.result.message
        }
      }
    });
  }
  editAnimal(values) {
    this.animalService.editAnimal(values).subscribe(data => {
      if (data.result.success) {
        this.getList();
        this.myform.reset();
        this.hideModal();
        this.alert = {
          hasError: false,
          hasSuccess: true,
          hasMsg: data.result.message
        }
      } else {
        this.alert = {
          hasError: true,
          hasSuccess: false,
          hasMsg: data.result.message
        }
      }
    });
  }
}
