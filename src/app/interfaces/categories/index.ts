export interface ICategorieList {
    categories: Array<ICategorie>
}

export interface ICategorie {
    name: string
    tasks: Array<ITask>
}

export interface ITask {
    name: string;
    completed: boolean;
}

export const EICategorieList: ICategorieList = {
    categories: []
}