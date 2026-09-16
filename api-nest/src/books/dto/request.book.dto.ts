export class RequestBookDto {
	judul: string;
	penulis: string;
	tahunTerbit: number;
	isbn: string;
	stok: number;
	kategori?: string;
	penerbit?: string;
}

export class UpdateBookDto {
	judul?: string;
	penulis?: string;
	tahunTerbit?: number;
	isbn?: string;
	stok?: number;
	kategori?: string;
	penerbit?: string;
}
