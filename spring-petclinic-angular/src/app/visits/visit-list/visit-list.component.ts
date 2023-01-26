/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/**
 * @author Vitaliy Fedoriv
 */

import {Component, Input, OnInit} from '@angular/core';
import {Visit} from '../visit';
import {VisitService} from '../visit.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent implements OnInit {

  max = 5;

  @Input() visits: Visit[];
  responseStatus: number;
  noVisits = false;
  errorMessage: string;

  constructor(private router: Router, private visitService: VisitService, private route: ActivatedRoute,) {
    this.visits = [];
  }

  ngOnInit() {
    //this.show5More();
    const vetId = this.route.snapshot.params.id;
    this.visitService.getVisitsByVetId(vetId).subscribe(
      visits => this.visits.push(...visits),
      error => this.errorMessage = error as any);
  }

  editVisit(visit: Visit) {
    this.router.navigate(['/visits', visit.id, 'edit']);
  }

  deleteVisit(visit: Visit) {
  if(confirm("Are you sure you want to delete this visit?")) {
    this.visitService.deleteVisit(visit.id.toString()).subscribe(
      response => {
        this.responseStatus = response;
        console.log('delete success');
        this.visits.splice(this.visits.indexOf(visit), 1 );
        if (this.visits.length === 0) {
            this.noVisits = true;
          }
      },
      error => this.errorMessage = error as any);
    }
  }

  show5More(){
    this.max = this.max + 5;
  }

  visitsToShow(): Visit[] {
    return this.visits.slice(0,this.max);
  }

}
