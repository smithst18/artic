export interface NestedObject {
  [key: string]: string | number
}

export interface TableRow {
  id: number
  [key: string]: string | number | NestedObject
}
