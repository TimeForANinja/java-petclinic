package org.springframework.samples.petclinic.repository.springdatajpa;

import org.springframework.context.annotation.Profile;
import org.springframework.samples.petclinic.model.Vet;
import org.springframework.samples.petclinic.model.Visit;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Profile("spring-data-jpa")
public class SpringDataVetRepositoryImpl implements VetRepositoryOverride {
}
