import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HandleError, HttpErrorHandler} from '../error.service';
import {HttpClient} from '@angular/common/http';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Visit} from 'app/visits/visit';
import {Owner} from 'app/owners/owner';
import {OwnerService} from 'app/owners/owner.service';
import {VisitService} from 'app/visits/visit.service';
import {PetService} from 'app/pets/pet.service';
import {VetService} from 'app/vets/vet.service';
import {Pet} from 'app/pets/pet';
import {Vet} from 'app/vets/vet';
import {PetAndOwner, VisitPetAndOwner,VisitAndPet, VisitPetOwnerVets} from 'app/search-results/search-results';

@Injectable()
export class SearchResultsService {

  private entityUrl = environment.REST_API_URL;

  private readonly handlerError: HandleError;

  constructor(private http: HttpClient,
              private httpErrorHandler: HttpErrorHandler,
              private ownerservice: OwnerService,
              private petservice: PetService,
              private visitservice: VisitService,
              private vetservice: VetService) {
    this.handlerError = httpErrorHandler.createHandleError('OwnerService');
  }

  getOwnerSearch(searchTerm: string): Observable<Owner[]> {
    const ownerSearchUrl = environment.REST_API_URL + `owners/search/${searchTerm}`;
    return this.http.get<Owner[]>(ownerSearchUrl)
      .pipe(
        catchError(this.handlerError('getOwnerSearch', []))
      );
  }

  getPetSearch(searchTerm: string): Observable<PetAndOwner[]> {
      const petSearchUrl = environment.REST_API_URL + `pets/search/${searchTerm}`;
      return this.http.get<Pet[]>(petSearchUrl)
        .pipe(
          mergeMap((pets: Pet[]) => {
          return forkJoin(
            pets.map(pet => {
              return this.ownerservice.getOwnerById(pet.ownerId).pipe(map(owner => ({ pet, owner })))
            })
          );
        })
      );
    }

  getVetSearch(searchTerm: string): Observable<Vet[]> {
      const vetSearchUrl = environment.REST_API_URL + `vets/search/${searchTerm}`;
      return this.http.get<Vet[]>(vetSearchUrl)
        .pipe(
          catchError(this.handlerError('getVetSearch', []))
        );
    }

  getVisitSearch(searchTerm: string): Observable<VisitPetOwnerVets[]> {
    const visitSearchUrl = environment.REST_API_URL + `visits/search/${searchTerm}`;
    return this.http.get<Visit[]>(visitSearchUrl)
      .pipe(
        mergeMap((visits: Visit[]) => {
        return forkJoin(
          visits.map(visit => {
            return this.petservice.getPetById(visit.petId).pipe(map(pet => ({ visit, pet })))
          })
        );
      }),

      mergeMap((visitsAndPets: VisitAndPet[]) => {
        return forkJoin(
          visitsAndPets.map(({visit, pet}) => {
            return this.ownerservice.getOwnerById(pet.ownerId).pipe(map(owner => ({ visit, pet, owner })))
          })
        );
      }),
      mergeMap((visitsPetAndOwner: VisitPetAndOwner[]) => {
        return forkJoin(
          visitsPetAndOwner.map(({visit, pet, owner}) => {
            return this.vetservice.getVetById(visit.vetId).pipe(map(vet => ({ vet, visit, pet, owner })))
          })
        );
      })
    );
  }

}
