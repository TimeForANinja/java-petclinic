import { Component, OnInit } from '@angular/core';
import {SearchResultsService} from '../search-results.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Owner} from 'app/owners/owner';
import {Pet} from 'app/pets/pet';
import {Vet} from 'app/vets/vet';
import {Visit} from 'app/visits/visit';
import {PetAndOwner, VisitPetAndOwner, VisitPetOwnerVets} from 'app/search-results/search-results';

const SLIDING_WINDOW_WIDTH = 10;
const SLIDING_WINDOW_SHIFT = 10;

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results-list.component.html',
  styleUrls: ['./search-results-list.component.css']
})
export class SearchResultsListComponent implements OnInit {

  errorMessage: string;
  owners: Owner[] = [];
  pets: PetAndOwner[] = [];
  vets: Vet[] = [];
  visits: VisitPetOwnerVets[] = [];

  constructor(private router: Router, private searchResultsService: SearchResultsService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
  const searchTerm = this.route.snapshot.params.searchTerm;
  this.searchResultsService.getOwnerSearch(searchTerm).subscribe(
    (owners) => {
      this.owners = owners;
      this.maxOwners = Math.min(SLIDING_WINDOW_WIDTH, owners.length);
    });

  this.searchResultsService.getPetSearch(searchTerm).subscribe(
    (pets) => {
      this.pets = pets;
      this.maxPets = Math.min(SLIDING_WINDOW_WIDTH, pets.length);
    });

  this.searchResultsService.getVetSearch(searchTerm).subscribe(
    (vets) => {
      this.vets = vets;
      this.maxVets = Math.min(SLIDING_WINDOW_WIDTH, vets.length);
    });

  this.searchResultsService.getVisitSearch(searchTerm).subscribe(
    (visits) => {
      this.visits = visits;
      this.maxVisits = Math.min(SLIDING_WINDOW_WIDTH, visits.length);
    });
  }


  // Owners
  minOwners = 0;
  maxOwners = SLIDING_WINDOW_WIDTH;
  showMoreOwners(){
    this.minOwners = Math.min(this.minOwners + SLIDING_WINDOW_SHIFT, Math.max(this.owners.length - SLIDING_WINDOW_WIDTH, 0));
    this.maxOwners = Math.min(this.maxOwners + SLIDING_WINDOW_SHIFT, this.owners.length);
  }
  ownersToShow(): Owner[] {
    return this.owners.slice(this.minOwners, this.maxOwners);
  }

  // Pets
  minPets = 0;
  maxPets = SLIDING_WINDOW_WIDTH;
  showMorePets(){
    this.minPets = Math.min(this.minPets + SLIDING_WINDOW_SHIFT, Math.max(this.pets.length - SLIDING_WINDOW_WIDTH, 0));
    this.maxPets = Math.min(this.maxPets + SLIDING_WINDOW_SHIFT, this.pets.length);
  }
  petsToShow(): PetAndOwner[] {
    return this.pets.slice(this.minPets, this.maxPets);
  }

  // Vets
  minVets = 0;
  maxVets = SLIDING_WINDOW_WIDTH;
  showMoreVets(){
    this.minVets = Math.min(this.minVets + SLIDING_WINDOW_SHIFT, Math.max(this.vets.length - SLIDING_WINDOW_WIDTH, 0));
    this.maxVets = Math.min(this.maxVets + SLIDING_WINDOW_SHIFT, this.vets.length);
  }
  vetsToShow(): Vet[] {
    return this.vets.slice(this.minVets, this.maxVets);
  }

  // Visits
  minVisits = 0;
  maxVisits = SLIDING_WINDOW_WIDTH;
  showMoreVisits(){
    this.minVisits = Math.min(this.minVisits + SLIDING_WINDOW_SHIFT, Math.max(this.visits.length - SLIDING_WINDOW_WIDTH, 0));
    this.maxVisits = Math.min(this.maxVisits + SLIDING_WINDOW_SHIFT, this.visits.length);
  }
  visitsToShow(): VisitPetOwnerVets[] {
    return this.visits.slice(this.minVisits, this.maxVisits);
  }


  goToEditVisit(visit){
    this.router.navigate(['visits',visit.id,'edit']);
  }

  goToEditVet(vet){
    this.router.navigate(['vets',vet.id,'edit']);
  }

  goToEditPet(pet){
    this.router.navigate(['pets',pet.id,'edit']);
  }
}
