import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, map } from 'rxjs'
import { Book, CreateBookDto, UpdateBookDto, ParamsBookDto } from '../models/book.model'
import { local } from '../../../environments'

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = ''

  constructor(private http: HttpClient) {
    const BASE_URL = local.baseUrl
    this.apiUrl = `${BASE_URL}/api/books`
  }

  getBooks(params?: ParamsBookDto): Observable<{ data: Book[], total: number }> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.limit) httpParams = httpParams.set('limit', params.limit.toString());
      if (params.judul) httpParams = httpParams.set('judul', params.judul);
      if (params.kategori) httpParams = httpParams.set('kategori', params.kategori);
    }

    return this.http.get<any>(this.apiUrl, { params: httpParams }).pipe(
      map(response => {
        // Based on ApiPaginationResponseDto
        return {
          data: response.data,
          total: response.meta.totalData
        };
      })
    );
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  createBook(book: CreateBookDto): Observable<Book> {
    return this.http.post<any>(this.apiUrl, book).pipe(
      map(response => response.data)
    );
  }

  updateBook(id: string, book: UpdateBookDto): Observable<Book> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, book).pipe(
      map(response => response.data)
    );
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
}
