export interface Book {
  id: string;
  judul: string;
  penulis: string;
  penerbit?: string;
  tahunTerbit: number;
  isbn: string;
  stok: number;
  kategori?: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateBookDto {
  judul: string;
  penulis: string;
  penerbit?: string;
  tahunTerbit: number;
  isbn: string;
  stok: number;
  kategori?: string;
}

export interface UpdateBookDto {
  judul?: string;
  penulis?: string;
  penerbit?: string;
  tahunTerbit?: number;
  isbn?: string;
  stok?: number;
  kategori?: string;
}

export interface ParamsBookDto {
  page?: number;
  limit?: number;
  judul?: string;
  kategori?: string;
}
