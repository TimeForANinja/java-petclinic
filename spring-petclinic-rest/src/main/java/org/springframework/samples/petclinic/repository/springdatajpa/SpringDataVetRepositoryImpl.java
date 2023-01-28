package org.springframework.samples.petclinic.repository.springdatajpa;

import org.springframework.samples.petclinic.model.Vet;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class SpringDataVetRepositoryImpl implements VetRepositoryOverride {
    @PersistenceContext
    private EntityManager em;

    @Override
    public void delete(Vet vet) {
        Integer vetId = vet.getId();
        this.em.createQuery("DELETE FROM Visit visit WHERE vet_id=" + vet.getId()).executeUpdate();
        this.em.createQuery("DELETE FROM Vet vet WHERE id=" + vet.getId()).executeUpdate();
        if (em.contains(vet)) {
            em.remove(vet);
        }
    }
}
