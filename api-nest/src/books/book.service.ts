import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../common/prisma'
import { RequestBookDto, UpdateBookDto } from './dto/request.book.dto'
import { ParamsBookDto } from './dto/params.book.dto'

@Injectable()
export class BookService {
	constructor(
		private prisma: PrismaService,
	) {
	}

	async getPaginateBooks(params: ParamsBookDto) {
		const page = params.page ? Number(params.page) : 1
		const limit = params.limit ? Number(params.limit) : 10
		const skip = (page - 1) * limit

		const where: any = {}
		if (params.judul) {
			where.judul = {
				contains: params.judul,
				mode: 'insensitive',
			}
		}
		if (params.kategori) {
			where.kategori = {
				contains: params.kategori,
				mode: 'insensitive',
			}
		}

		const [data, total] = await Promise.all([
			this.prisma.book.findMany({
				where,
				skip: skip,
				take: limit,
				orderBy: {
					createdAt: 'desc',
				},
			}),
			this.prisma.book.count({ where }),
		])

		return { data, total }
	}

	async createBook(reqBody: RequestBookDto) {
		this.validateBook(reqBody)
		await this.checkBookIsbn(reqBody.isbn)

		return await this.prisma.book.create({ data: reqBody })
	}

	async getBookById(id: string) {
		const data = await this.prisma.book.findUnique({
			where: { id },
		})

		if (!data) {
			throw new HttpException('Book not found', HttpStatus.NOT_FOUND)
		}

		return data
	}

	async updateBook(id: string, reqBody: UpdateBookDto) {
		this.validateBook(reqBody, id)
		const promises = [this.checkBookExists(id)]

		if (reqBody.isbn) {
			promises.push(this.checkBookIsbn(reqBody.isbn, id))
		}

		await Promise.all(promises)

		return await this.prisma.book.update({ where: { id }, data: reqBody })
	}

	async deleteBook(id: string) {
		await this.checkBookExists(id)

		await this.prisma.book.delete({
			where: { id },
		})
	}

	async borrowBook(id: string, { qty }: { qty: number }) {
		if (!qty || qty <= 0) {
			throw new HttpException('Quantity must be greater than 0', HttpStatus.BAD_REQUEST)
		}

		await this.checkBookExists(id, { stok: { gte: qty } })

		return await this.prisma.book.update({ where: { id }, data: { stok: { decrement: qty } } })
	}

	private async checkBookExists(id: string, additionalClause = {}) {
		const existBook = await this.prisma.book.count({ where: { id, ...additionalClause } })

		if (Object.keys(additionalClause).length > 0 && existBook < 1) {
			throw new HttpException(`Book for id: ${id} was not found`, HttpStatus.NOT_FOUND)
		} else if (existBook < 1) {
			throw new HttpException('Book not found', HttpStatus.NOT_FOUND)
		}
	}

	private async checkBookIsbn(isbn: string, id?: string) {
		const additionalClause = !!id ? { id: { not: id } } : {}

		const existsIsbn = await this.prisma.book.count({
			where: { isbn, ...additionalClause },
		})

		if (!!existsIsbn) {
			throw new HttpException('ISBN already exists', HttpStatus.CONFLICT)
		}
	}

	private validateBook(book: RequestBookDto | UpdateBookDto, id?: string) {
		const errors: string[] = []

		if (!id && (
			!book?.judul ||
			!book?.penulis ||
			!book?.tahunTerbit ||
			!book?.isbn ||
			(!book?.stok && book?.stok !== 0)
		)) {
			errors.push('Judul, Penulis, Tahun Terbit, ISBN, and Stok are required')
		}

		if (!!book?.stok && isNaN(book.stok)) {
			errors.push('Stok must be a number')
		} else if (!!book?.stok && book.stok < 0) {
			errors.push('Stok must be positive')
		}

		if (!!book?.judul && book.judul.length > 150) {
			errors.push('Judul must be less than 150 characters')
		}

		if (!!book?.tahunTerbit && isNaN(book.tahunTerbit)) {
			errors.push('Tahun terbit must be a number')
		} else if (!!book?.tahunTerbit && book.tahunTerbit > new Date().getFullYear()) {
			errors.push('Tahun terbit cannot be in the future')
		}

		if (errors.length > 0) {
			throw new HttpException(errors, HttpStatus.BAD_REQUEST)
		}
	}
}