package org.springframework.samples.petclinic.rest.dto;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import org.hibernate.validator.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * Fields of specialty of vets.
 */

@Schema(name = "Specialty", description = "Fields of specialty of vets.")
@JsonTypeName("Specialty")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2023-01-05T13:25:09.341779100+01:00[Europe/Berlin]")
public class SpecialtyDto {

  @JsonProperty("id")
  private Integer id;

  @JsonProperty("name")
  private String name;

  public SpecialtyDto id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * The ID of the specialty.
   * minimum: 0
   * @return id
  */
  @Min(0) 
  @Schema(name = "id", accessMode = Schema.AccessMode.READ_ONLY, example = "1", description = "The ID of the specialty.", required = true)
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public SpecialtyDto name(String name) {
    this.name = name;
    return this;
  }

  /**
   * The name of the specialty.
   * @return name
  */
  @NotNull @Size(min = 1, max = 80) 
  @Schema(name = "name", example = "radiology", description = "The name of the specialty.", required = true)
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SpecialtyDto specialty = (SpecialtyDto) o;
    return Objects.equals(this.id, specialty.id) &&
        Objects.equals(this.name, specialty.name);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SpecialtyDto {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
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

