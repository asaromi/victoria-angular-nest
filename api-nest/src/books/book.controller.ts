import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	ParseIntPipe,
	ParseUUIDPipe,
	Post,
	Put,
	Query,
} from '@nestjs/common'
import { BookService } from './book.service'
import { RequestBookDto, UpdateBookDto } from './dto/request.book.dto'
import { ParamsBookDto } from './dto/params.book.dto'
import { ApiPaginationResponseDto, ApiResponseDto } from '../common/dto/api-response.dto'

@Controller('/api/books')
export class BookController {
	constructor(private readonly bookService: BookService) {
	}

	@Get()
	async findAll(@Query() query: ParamsBookDto) {
		const { data, total  } = await this.bookService.getPaginateBooks(query)
		return new ApiPaginationResponseDto(data, total, query?.limit, query?.page, HttpStatus.OK, 'Books successfully retrieved')
	}

	@Get(':id')
	async findOne(@Param('id', ParseUUIDPipe) id: string) {
		const res = await this.bookService.getBookById(id)
		return new ApiResponseDto(res, HttpStatus.OK, 'Book with id ' + id + ' successfully retrieved')
	}

	@Post('')
	async create(@Body() reqBody: RequestBookDto) {
		const res = await this.bookService.createBook(reqBody)
		return new ApiResponseDto(res, HttpStatus.CREATED, 'Book successfully created')
	}

	@Put(':id')
	async update(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() reqBody: UpdateBookDto,
	) {
		const res = await this.bookService.updateBook(id, reqBody)
		return new ApiResponseDto(res, HttpStatus.OK, 'Book with id ' + id + ' successfully updated')
	}

	@Delete(':id')
	async delete(@Param('id', ParseUUIDPipe) id: string) {
		await this.bookService.deleteBook(id)
		return new ApiResponseDto(undefined, 200, 'Book with id ' + id + ' successfully deleted')
	}

	@Post(':id/borrow')
	async borrowBook(@Param('id', ParseUUIDPipe) id: string, @Body('qty', ParseIntPipe) qty: number) {
		const res = await this.bookService.borrowBook(id, { qty })
		return new ApiResponseDto(res, HttpStatus.OK, 'Book with id ' + id + ' successfully borrowed')
	}
}