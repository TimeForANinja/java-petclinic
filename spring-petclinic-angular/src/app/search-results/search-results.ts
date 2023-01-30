import {Pet} from '../pets/pet';
import {Owner} from '../owners/owner';
import {Visit} from '../visits/visit';
import {Vet} from '../vets/vet';

export type PetAndOwner = {
  pet: Pet,
  owner: Owner
}

export type VisitPetAndOwner = {
  visit: Visit,
  pet: Pet,
  owner: Owner
}

export type VisitAndPet = {
  visit: Visit,
  pet: Pet
}

export type VisitPetOwnerVets = {
  visit: Visit,
  pet: Pet,
  owner: Owner,
  vet: Vet
}
