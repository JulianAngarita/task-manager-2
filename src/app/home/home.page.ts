import { Component, OnInit } from '@angular/core';
import { ModalController, RefresherCustomEvent } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { EICategorieList, ICategorie, ICategorieList, ITask } from '../interfaces/categories';
import { ModalInputComponent } from '../components/modal-input/modal-input.component';
import { RemoteConfigService } from '../services/remote-config/remote-config.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  public categories: ICategorieList;
  public editingCategory: ICategorie = {
    name: '',
    tasks: []
  };
  public editing = false;
  public addingTask = false;
  public task = '';
  public categoryFather: ICategorie = {
    name: '',
    tasks: []
  };

  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService,
    private remoteConfig: RemoteConfigService
  ) {
    this.categories = Object.assign({}, EICategorieList);
    this.toggleDarkPalette(this.remoteConfig.showAppbarIcon());
  }

  ngOnInit(): void {
    this.fillCategories();
  }

  toggleDarkPalette(shouldAdd: boolean) {
    if (shouldAdd) {
      document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    }
  }

  public completeTask = (categorie: ICategorie, task: ITask) => {
    let currentCategories = this.categories;
    let newCategories = this.categories.categories.filter((i: ICategorie) => i.name != categorie.name);
    categorie.tasks[categorie.tasks.indexOf(task)].completed = true;
    const newCategory = categorie;
    newCategories.push(newCategory);
    currentCategories.categories = newCategories;
    this.storage.set('categorie', currentCategories);
    this.fillCategories();
  }

  public saveTask = () => {
    let currentCategories = this.categories;
    let categoryWithTask = this.categoryFather;
    categoryWithTask.tasks.push({name: this.task, completed: false});
    const newCategories = this.categories.categories.filter((i: ICategorie) => i.name != this.categoryFather.name);
    currentCategories.categories = newCategories;
    currentCategories.categories.push(categoryWithTask);
    this.storage.set('categorie', currentCategories);
    this.addingTask = false;
    this.task = '';
    this.fillCategories();
  }

  public deleteTask = (categorie: ICategorie, task: ITask) => {
    let currentCategories = this.categories;
    let newCategories = this.categories.categories.filter((i: ICategorie) => i.name != categorie.name);
    const newTasks = categorie.tasks.filter((j) => j.name != task.name);
    categorie.tasks = newTasks;
    let newCategory = categorie;
    newCategories.push(newCategory);
    currentCategories.categories = newCategories;
    this.storage.set('categorie', currentCategories);
    this.fillCategories();
  }

  public closeModal = () => {
    this.editing = false;
    this.addingTask = false;
  }

  public editCategory = (categorie: ICategorie) => {
    this.editingCategory = categorie;
    this.editing = true;
  }

  public saveEditedCategory = () => {
    let currentCategories = this.categories;
    const index = this.categories.categories.indexOf(this.editingCategory);
    currentCategories.categories.splice(index, 1);
    console.log(this.editingCategory);
    currentCategories.categories.push({
      name: this.editingCategory.name,
      tasks: this.editingCategory.tasks
    });
    this.storage.set('categorie', currentCategories);
    this.editing = false;
  }

  public deleteCategorie = async (categorie: ICategorie) => {
    let currentCategories = this.categories;
    const newCategories = this.categories.categories.filter((i: ICategorie) => i.name != categorie.name);
    currentCategories.categories = newCategories;
    this.storage.set('categorie', currentCategories);
    this.fillCategories();
  }

  public fillCategories = async () => {
    setTimeout(async () => {
      this.categories = await this.storage.get('categorie');
    }, 100);
  }

  public openModal = async () => {
    const modal = await this.modalCtrl.create({
      component: ModalInputComponent,
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();

    if ( role === 'confirm') {
      this.addCategorie(data).finally(() => {
        this.fillCategories();
      });
    }
  }

  public addTask = (categorie: ICategorie) => {
    this.addingTask = true;
    this.categoryFather = categorie;
  } 

  public addCategorie = async (categorie: string) => {
    let currentCategories = await this.storage.get('categorie');
    currentCategories.categories.push({name: categorie, tasks: []});
    this.storage.set('categorie', currentCategories);
  }
}
