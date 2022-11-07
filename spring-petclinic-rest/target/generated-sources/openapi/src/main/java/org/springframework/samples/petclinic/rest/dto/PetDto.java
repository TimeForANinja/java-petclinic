package org.springframework.samples.petclinic.rest.dto;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.samples.petclinic.rest.dto.PetAllOfDto;
import org.springframework.samples.petclinic.rest.dto.PetFieldsDto;
import org.springframework.samples.petclinic.rest.dto.PetTypeDto;
import org.springframework.samples.petclinic.rest.dto.VisitDto;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import org.hibernate.validator.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * A pet.
 */

@Schema(name = "Pet", description = "A pet.")
@JsonTypeName("Pet")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2022-11-07T17:47:41.952807+01:00[Europe/Berlin]")
public class PetDto {

  @JsonProperty("name")
  private String name;

  @JsonProperty("birthDate")
  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private LocalDate birthDate;

  @JsonProperty("type")
  private PetTypeDto type;

  @JsonProperty("id")
  private Integer id;

  @JsonProperty("ownerId")
  private Integer ownerId;

  @JsonProperty("visits")
  @Valid
  private List<VisitDto> visits = new ArrayList<>();

  public PetDto name(String name) {
    this.name = name;
    return this;
  }

  /**
   * The name of the pet.
   * @return name
  */
  @NotNull @Size(max = 30) 
  @Schema(name = "name", example = "Leo", description = "The name of the pet.", required = true)
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public PetDto birthDate(LocalDate birthDate) {
    this.birthDate = birthDate;
    return this;
  }

  /**
   * The date of birth of the pet.
   * @return birthDate
  */
  @NotNull @Valid 
  @Schema(name = "birthDate", example = "Tue Sep 07 02:00:00 CEST 2010", description = "The date of birth of the pet.", required = true)
  public LocalDate getBirthDate() {
    return birthDate;
  }

  public void setBirthDate(LocalDate birthDate) {
    this.birthDate = birthDate;
  }

  public PetDto type(PetTypeDto type) {
    this.type = type;
    return this;
  }

  /**
   * Get type
   * @return type
  */
  @NotNull @Valid 
  @Schema(name = "type", required = true)
  public PetTypeDto getType() {
    return type;
  }

  public void setType(PetTypeDto type) {
    this.type = type;
  }

  public PetDto id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * The ID of the pet.
   * minimum: 0
   * @return id
  */
  @Min(0) 
  @Schema(name = "id", accessMode = Schema.AccessMode.READ_ONLY, example = "1", description = "The ID of the pet.", required = true)
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public PetDto ownerId(Integer ownerId) {
    this.ownerId = ownerId;
    return this;
  }

  /**
   * The ID of the pet's owner.
   * minimum: 0
   * @return ownerId
  */
  @Min(0) 
  @Schema(name = "ownerId", accessMode = Schema.AccessMode.READ_ONLY, example = "1", description = "The ID of the pet's owner.", required = false)
  public Integer getOwnerId() {
    return ownerId;
  }

  public void setOwnerId(Integer ownerId) {
    this.ownerId = ownerId;
  }

  public PetDto visits(List<VisitDto> visits) {
    this.visits = visits;
    return this;
  }

  public PetDto addVisitsItem(VisitDto visitsItem) {
    if (this.visits == null) {
      this.visits = new ArrayList<>();
    }
    this.visits.add(visitsItem);
    return this;
  }

  /**
   * Vet visit bookings for this pet.
   * @return visits
  */
  @Valid 
  @Schema(name = "visits", accessMode = Schema.AccessMode.READ_ONLY, description = "Vet visit bookings for this pet.", required = true)
  public List<VisitDto> getVisits() {
    return visits;
  }

  public void setVisits(List<VisitDto> visits) {
    this.visits = visits;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    PetDto pet = (PetDto) o;
    return Objects.equals(this.name, pet.name) &&
        Objects.equals(this.birthDate, pet.birthDate) &&
        Objects.equals(this.type, pet.type) &&
        Objects.equals(this.id, pet.id) &&
        Objects.equals(this.ownerId, pet.ownerId) &&
        Objects.equals(this.visits, pet.visits);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, birthDate, type, id, ownerId, visits);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class PetDto {\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    birthDate: ").append(toIndentedString(birthDate)).append("\n");
    sb.append("    type: ").append(toIndentedString(type)).append("\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    ownerId: ").append(toIndentedString(ownerId)).append("\n");
    sb.append("    visits: ").append(toIndentedString(visits)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

