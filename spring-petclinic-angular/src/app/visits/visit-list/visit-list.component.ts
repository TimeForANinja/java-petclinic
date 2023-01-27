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

import {Component, OnInit} from '@angular/core';
import {Visit, VisitAndPet} from '../visit';
import {VisitService} from '../visit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Owner} from '../../owners/owner';

const SLIDING_WINDOW_WIDTH = 10;
const SLIDING_WINDOW_SHIFT = 5;

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})

export class VisitListComponent implements OnInit {

  sliceMin = 0;
  sliceMax = SLIDING_WINDOW_WIDTH;

  expandedVisits: VisitAndPet[];
  responseStatus: number;
  noVisits = false;
  errorMessage: string;

  constructor(private router: Router, private visitService: VisitService, private route: ActivatedRoute) {
    this.expandedVisits = [];
  }

  ngOnInit() {
    const vetId = this.route.snapshot.params.id;
    this.visitService.getVisitsAndExpand(vetId).subscribe(
      visitAndPet => {
        this.expandedVisits.push(...visitAndPet)
        this.sliceMax = Math.min(SLIDING_WINDOW_WIDTH, visitAndPet.length)
      },
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
          const delIdx = this.expandedVisits.findIndex(vp => vp.visit.id === visit.id)
          this.expandedVisits.splice(delIdx, 1);
          if (this.expandedVisits.length === 0) {
            this.noVisits = true;
          }
        },
        error => this.errorMessage = error as any
      );
    }
  }

  move5(forward: boolean){
    if (forward) {
      this.sliceMin = Math.min(this.sliceMin + SLIDING_WINDOW_SHIFT, Math.max(this.expandedVisits.length - SLIDING_WINDOW_WIDTH, 0));
      this.sliceMax = Math.min(this.sliceMax + SLIDING_WINDOW_SHIFT, this.expandedVisits.length);
    } else {
      this.sliceMin = Math.max(this.sliceMin - SLIDING_WINDOW_SHIFT, 0);
      this.sliceMax = Math.max(this.sliceMax - SLIDING_WINDOW_SHIFT, SLIDING_WINDOW_WIDTH);
    }
  }

  visitsToShow(): VisitAndPet[] {
    return this.expandedVisits.slice(this.sliceMin, this.sliceMax);
  }


}
