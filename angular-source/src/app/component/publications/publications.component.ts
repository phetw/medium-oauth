import { Component } from '@angular/core';
import { PublicationService } from '../../service/publication.service';
import { Observable } from 'rxjs/Observable';
import { Publication } from '../../model/publication';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent {

  public publications: Observable<Publication[]>;

  constructor(public publicationService: PublicationService) {
    this.publications = this.publicationService.getPublications();
  }
}
