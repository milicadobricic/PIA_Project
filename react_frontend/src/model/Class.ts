export class Code {
    public department!: string;
    public year!: number;
    public semester!: number;
    public subject!: string;
}

export class Class {
    public id!: string;
    public name!: string;
    public mandatory!: boolean;
    public codes!: Array<Code>;
    public classesPerWeek!: number;
    public credits!: number;
    public requirements!: string;
    public goal!: string;
    public description?: string;
}
