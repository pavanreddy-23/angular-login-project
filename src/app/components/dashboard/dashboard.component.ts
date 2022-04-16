import { Component, OnInit } from '@angular/core';

import { AlbumsService } from '../../services/albums.service';
import { APIData } from '../../models/api-data.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private albumService: AlbumsService) { }

    albumId = 1;
    records: APIData[] = [];
    isLoading = false;

  ngOnInit(): void {
    this.fetchAlbumsFromApi();

    window.addEventListener('scroll', () => {
      let contentHeight = document.getElementsByTagName('body')[0].offsetHeight;
      let yoffset = window.pageYOffset;
      let y = yoffset + window.innerHeight;
      if (y >= contentHeight) {
        this.addMoreRecords();
      }
    });
  }

  fetchAlbumsFromApi(){
    this.isLoading = true;
    this.albumService.getAlbums(this.albumId).subscribe(data => {
      this.records = this.records.concat(data);
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
      alert('Something went wrong');
    });
  }

  onDelete(recordId: number) {
    if(confirm('Are you sure you want to DELETE ? ')){
      this.records.splice(this.records.findIndex(ele => ele.id == recordId), 1);
    }
  }

  addMoreRecords() {
    if(this.isLoading){
      return;
    }

    this.albumId = this.albumId + 1;
    if(this.albumId > 10) {
      return;
    }
    this.fetchAlbumsFromApi();
  }

}
