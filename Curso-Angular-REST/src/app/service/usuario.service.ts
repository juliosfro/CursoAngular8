import { ErrorDetails } from './../model/errorDetails';
import { UserReport } from './../model/userReport';
import { User } from '../model/user';
import { AppConstants } from './../app-constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  errorDetail = new ErrorDetails();

  constructor(private http: HttpClient) { }
  /*
    readAllUsers(): Observable<any> {
      return this.http.get<any>(AppConstants.baseUrl.toString());
    }
  */

  /*
    readAllUsersPage(pagina: Number): Observable<any> {
      return this.http.get<any>(AppConstants.baseUrl + 'page/' + pagina + '/sort/' + 'desc');
    }
  */

  readAllUsersProfessions(): Observable<any> {
    return this.http.get<any>(`${AppConstants.baseUrlPath}profissao/`);
  }

  readAllUsersPageSort(pagina: number, sort: boolean, key: string, size: Number): Observable<any> {
    const ordenate = sort ? 'asc' : 'desc';
    return this.http.get<any>(`${AppConstants.baseUrl}page/${pagina}/sort/${ordenate}/criterion/${key}/size/${size}`);
  }

  readUserByNamePageSort(name: String, page: number, sort: boolean, key: string, size: Number): Observable<any> {
    if (name !== undefined && page !== undefined) {
      const ordenate = sort ? 'asc' : 'desc';
      return this.http.get<any>(`${AppConstants.baseUrl}search/nome/${name.toLowerCase()}/pagina/${page}/sort/${ordenate}/criterion/${key}/size/${size}`);
    }
  }

  readUserById(id: Number): Observable<any> {
    return this.http.get(`${AppConstants.baseUrl}${id}`);
  }

  deleteUserById(id: Number): Observable<any> {
    return this.http.delete(`${AppConstants.baseUrl}${id}`, { observe: 'response' });
  }

  /*
    readUserByNamePage(name: String, page: number): Observable<any> {
      if (name !== undefined && page !== undefined) {
        return this.http.get<any>(AppConstants.baseUrl.toString() + "search/nome/" + name.toLowerCase() + "/pagina/" + page + '/sort/' + 'desc' + "?size=" + 5);
      } else {
        return this.http.get<any>(AppConstants.baseUrl.toString() + "usuarioPorNome/" + name + "/page/" + page);
      }
    }
  */
  createUser(user: User): Observable<any> {
    return this.http.post<any>(`${AppConstants.baseUrl}`, user, { observe: 'response' });
  }

  updateUser(user: User): Observable<any> {
    //user.dataNascimento = "13/8/1992";
    //alert(user.dataNascimento);
    return this.http.put<any>(`${AppConstants.baseUrl}`, user, { observe: 'response' });
  }

  deleteTelephoneById(id: Number): Observable<any> {
    return this.http.delete(`${AppConstants.baseUrl}removeTelephone/${id}`, { responseType: 'text' });
  }

  isUserAutenticated(): boolean {
    if (localStorage.getItem("token") !== null && localStorage.getItem("token").toString().trim() !== null) {
      return true;
    } else {
      return false;
    }
  }

  downloadPdfRelatorio(): Observable<any> {
    return this.http.get(AppConstants.baseUrl + 'relatorio', { responseType: 'text' });
  }

  downloadPdfRelatorioParam(userReport: UserReport): Observable<any> {
    return this.http.post(AppConstants.baseUrl + 'relatorio/', userReport, { responseType: 'text' });
  }

  carregarGrafico(): Observable<any> {
    return this.http.get(AppConstants.baseUrl.toString() + 'grafico');
  }
}