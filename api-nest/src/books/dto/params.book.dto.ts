export class PaginationBookDto {
	page?: number;
	limit?: number;
}

export class ParamsBookDto extends PaginationBookDto {
	judul?: string;
	kategori?: string;
}

