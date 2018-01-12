import { Component } from '@angular/core';
import { PublicationService } from '../../service/publication.service';

import { Publication } from '../../model/publication';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent {

  publications: Publication;

  constructor(public publicationSerice: PublicationService) {
    this.publicationSerice.getPublications().subscribe(publicationList => {
      this.publications = JSON.parse(localStorage.getItem('publicationsList')).data;
    });
  }
}
